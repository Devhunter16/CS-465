const mongoose = require('mongoose');
// Creating Model with our tripSchema so we can use it here
const Model = mongoose.model('trips'); 

// Async function that gets trips from the db
const tripsList = async (req, res) => {
    try {
      // Finding all trips then executing the code below
      const trips = await Model.find({}).exec(); 
      // If we do not find anything
      if (!trips || trips.length === 0) { 
        // Return "not found" 404 status
        return res.status(404).json({ "message": "trips not found" }); 
      } else { 
        // If we found what we needed, send client HTTP 200 success status
        return res.status(200).json(trips);
      }
    } catch (err) {
      // This is an API, so even the error messages need to be formatted as JSON
      return res.status(500).json(err);
    }
  };

// Async function that gets a trip from the db based on it's code
const tripsFindCode = async (req, res) => {
    try {
      const trip = await Model.find({ 'code': req.params.tripCode }).exec();
      if (!trip || trip.length === 0) {
        return res.status(404).json({ "message": "trip not found" });
      } else {
        return res.status(200).json(trip);
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  };

// Exporting our functions
module.exports = {
    tripsList,
    tripsFindCode
};