const express = require("express");
const router = express.Router();

// Importing the functions we defined in the "trips.js" controller file
const tripsController = require("../controllers/trips");

// When a GET request comes in, we pass it to the trips controller and use the tripsList
// function we defined in the "trips.js" controller file
router
    .route('/trips')
    .get(tripsController.tripsList)

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindCode);

module.exports = router;