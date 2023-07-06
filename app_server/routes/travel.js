const express = require('express');
const router = express.Router();
const controller = require('../contollers/travel');

/* GET travel page route. */
router.get('/', controller.travel);

module.exports = router;