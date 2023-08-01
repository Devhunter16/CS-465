const express = require("express");
const router = express.Router();

// Importing the functions we defined in the "trips.js" controller file
const tripsController = require("../controllers/trips");

router
    .route('/trips')
    .get(tripsController.tripsList)

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindCode);

module.exports = router;