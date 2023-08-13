const mongoose = require('mongoose');
const Trip = mongoose.model('trips');
const User = mongoose.model('users');

// Get user
const getUser = async (req) => {
  if (req.payload && req.payload.email) {
    try {
      const user = await User.findOne({ email: req.payload.email }).exec();
      return user;
    } catch (err) {
      console.error(err);
      return null;
    }
  } else {
    return null;
  }
};

// Get all trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).exec();
    if (!trips) {
      return res.status(404).json({ "message": "trip not found" });
    }
    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// Get a single trip using its trip code
const tripsFindByCode = async (req, res) => {
  try {
    const trip = await Trip.find({ 'code': req.params.tripCode }).exec();
    if (!trip) {
      return res.status(404).json({ 'message': 'trip not found' });
    }
    return res.status(200).json(trip);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// Post a trip
const tripsAddTrip = async (req, res) => {
  const user = await getUser(req);
  if (!user) {
    return res.status(404).json({ "message": "User not found" });
  }

  try {
    const trip = await Trip.create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    });
    return res.status(201).json(trip);
  } catch (err) {
    return res.status(400).json(err);
  }
};

// Update a trip
const tripsUpdateTrip = async (req, res) => {
  const user = await getUser(req);
  if (!user) {
    return res.status(404).json({ "message": "User not found" });
  }

  try {
    const trip = await Trip.findOneAndUpdate({ 'code': req.params.tripCode }, {
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    }, { new: true }).exec();

    if (!trip) {
      return res.status(404).json({ "message": "Trip not found" });
    }

    return res.status(200).json(trip);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ "message": "Trip not found" });
    }
    return res.status(500).json(err);
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip
};