const express = require('express');
const router = express.Router();
const ctrlMain = require('../contollers/main');

/* GET home page route. */
router.get('/', ctrlMain.index);

module.exports = router;