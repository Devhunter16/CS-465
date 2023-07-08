const express = require('express');
const router = express.Router();
const controller = require('../controllers/rooms');

/* GET rooms page route. */
router.get('/', controller.rooms);

module.exports = router;