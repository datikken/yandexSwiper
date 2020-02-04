  
const path = require('path');
const express = require('express');

const mainController = require('../controllers/mainController');

const router = express.Router();

router.get('/', mainController.getIndex);

module.exports = router;