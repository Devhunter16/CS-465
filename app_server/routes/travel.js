const express = require('express');
const router = express.Router();
const controller = require('../controllers/travel');

/* GET travel page route. */
router.get('/', controller.travel);

module.exports = router;