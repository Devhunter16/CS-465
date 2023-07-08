const express = require('express');
const router = express.Router();
const controller = require('../controllers/meals');

/* GET meals page route. */
router.get('/', controller.meals);

module.exports = router;