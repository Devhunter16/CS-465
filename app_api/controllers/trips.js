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

const tripsAddTrip = async (req, res) => {
  Model
    .create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    },
    (err, trip) => {
      if (err) {
        return res
          .status(400)
          .json(err);
      } else {
        return res
          .status(201)
          .json(trip);
      }
    });
}

const tripsUpdateTrip = async (req, res) => {
  Model
    .findOneAndUpdate({ 'code': req.params.tripCode }, {
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    }, {new: true })
    .then(trip => {
      if (!trip) {
        return res
          .status(404)
          .send({
            message: "Trip not found with code " + req.params.tripCode
          });
      }
      res.send(trip);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res
          .status(404)
          .send({
            message: "Trip not found with code " + req.params.tripCode
          });
        }
        return res
          .status(500) // server error
          .json(err);
    });
  }
     

// Exporting our functions
module.exports = {
    tripsList,
    tripsFindCode,
    tripsAddTrip,
    tripsUpdateTrip
};