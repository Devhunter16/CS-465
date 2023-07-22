// Importing mongoose, an ODM (object data modeling) library for MongoDB and Node.js
const mongoose = require('mongoose');

// Defining our trip schema class. This defines the structure of the documents that will
// be stored in the "trips" collection in our DB. We have a "code" and "name" here so 
// that we can find and retrieve trips faster and more efficiently from MongoDB.
const tripSchema = new mongoose.Schema({
    code: { type: String, required: true, index: true },
    name: { type: String, required: true, index: true },
    length: { type: String, required: true },
    start: { type: Date, required: true },
    resort: { type: String, required: true },
    perPerson: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true }
});

// Our collection in MongDB will be named 'trips', as we defined in the first argument. 
// The second argument, "tripSchema" is the schema that defines the structure for 
// documents in the trips collection.
module.exports = mongoose.model('trips', tripSchema);