const express = require("express");
const router = express.Router();

// Importing the functions we defined in the "trips.js" controller file
const tripsController = require("../controllers/trips");
// Importing the functions we defined in the "trips.js" controller file
const authController = require("../controllers/authentication");

router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

router
    .route('/trips')
    .get(tripsController.tripsList)
    // Telling Express to route the POST request to the /api/trips endpoint to the
    // tripsAddTrip function in the trips controller.
    .post(tripsController.tripsAddTrip);

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindCode)
    .put(tripsController.tripsUpdateTrip);

module.exports = router;