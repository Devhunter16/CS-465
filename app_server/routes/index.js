const express = require('express');
const router = express.Router();
const controller = require('../controllers/main');

/* GET index page route. */
router.get('/', controller.index);

module.exports = router;