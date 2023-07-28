const mongoose = require('mongoose');
// Creating Model with our tripSchema so we can use it here
const Model = mongoose.model('trips'); 

// Async function that gets trips from the db
const tripsList = async (req, res) => {
    Model
        .find({}) // Finding all trips
        .exec((err, trips) => {
            if (!trips) { // If we do not find anything
                return res
                    .status(404) // Return "not found" 404 status 
                    .json({ "message": "trips not found" });
            } else if (err) {
                return res 
                    .status(404)
                    .json(err);
            } else { // If we found what we needed, send client HTTP 200 success status
                return res
                    .status(200)
                    .json(trips);
            }
        });
};

// Async function that gets a trip from the db based on it's code
const tripsFindByCode = async (req, res) => {
    Model
        .find({ 'code': req.params.tripCode }) // Finding trip based on it's code
        .exec((err, trip) => {
            if (!trip) { // If we do not find anything
                return res
                    .status(404) // Return "not found" 404 status 
                    .json({ "message": "trip not found" });
            } else if (err) {
                return res 
                    .status(404)
                    .json(err);
            } else { // If we found what we needed, send client HTTP 200 success status
                return res
                    .status(200)
                    .json(trip);
            }
        });
};

// Exporting our functions
module.exports = {
    tripsList,
    tripsFindByCOde
};