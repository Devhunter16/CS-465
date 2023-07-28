// Importing mongoose, an ODM (object data modeling) library for MongoDB and Node.js
const mongoose = require('mongoose');
// If the environment variable DB_HOST is not set, use default value 127.0.0.1 (localhost)
const host = process.env.DB_HOST || '127.0.0.1'
const dbURI = `mongodb://${host}/travlr`;

// This avoids deprecation warnings
// mongoose.set('useUnifiedTopology', true);

// This function establishes a connection to the database after a short delay which allows
// other parts of the app to initialize prior to connecting to the database
const connect = () => {
    setTimeout(() => mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useCreateIndex: true
    }), 1000);
};

// Some events that tell us if we've connected, disconnected, or if there is an error.
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', (error) => {
    console.log('Mongoose connection error:', error);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Closes the Mongoose connection
const gracefulShutdown = (msg, callback) => {               
    mongoose.connection.close( () => {                        
        console.log(`Mongoose disconnected through ${msg}`);    
        callback();                                             
    });                                                       
};    
                                                      
// For nodemon restarts                                     
process.once('SIGUSR2', () => {                             
    gracefulShutdown('nodemon restart', () => {               
        process.kill(process.pid, 'SIGUSR2');                   
    });                                                       
});   

// For app termination                                      
process.on('SIGINT', () => {                                
    gracefulShutdown('app termination', () => {               
        process.exit(0);                                        
    });                                                       
});

// For Heroku app termination                               
process.on('SIGTERM', () => {                               
    gracefulShutdown('Heroku app shutdown', () => {           
        process.exit(0);                                        
    });                                                       
});  

// Calling connect()
connect();