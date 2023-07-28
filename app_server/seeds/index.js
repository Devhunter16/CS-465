// We'll run this file on it's own seperately from "app.js"
// any time we want to seed our database with some entries

// Requiring the built-in Node.js file system so we can retrieve the JSON data in trips.json
const fileSystem = require('fs');
const mongoose = require('mongoose');

// Importing our travlr.js file
const trip = require('../../app_api/database/travlr');

// Storing our parsed JSON data in the "trips" variable so that trips is an object
const tripsData = JSON.parse(fileSystem.readFileSync('./data/trips.json', 'utf8'));
const tripsArray = Object.values(tripsData);

// Defining our MongoDB connection string (dbURI)
const dbURI = 'mongodb://127.0.0.1/travlr';

const connect = () => {
    // Return a promise when connecting to the database
    return new Promise((resolve, reject) => {
        mongoose.connect(dbURI, {
            useNewUrlParser: true,
        });

        const db = mongoose.connection;
        db.on('connected', () => {
            console.log(`Mongoose connected to ${dbURI}`);
            resolve(); // Resolve the promise when connected
        });

        db.on('error', (error) => {
            console.log('Mongoose connection error:', error);
            reject(error); // Reject the promise on error
        });

        db.on('disconnected', () => {
            console.log('Mongoose disconnected');
        });
    });
};

const seedDB = async () => {
    try {
        await trip.deleteMany({});
        await trip.create(tripsArray);

        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding the database:", error);
    }
};

// Connect to the database and seed it
connect()
    .then(() => seedDB())
    .then(() => mongoose.connection.close())
    .catch((err) => console.error("Error:", err));