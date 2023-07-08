const express = require('express');
const router = express.Router();
const controller = require('../controllers/about');

/* GET about page route. */
router.get('/', controller.about);

module.exports = router;