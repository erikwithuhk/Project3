const express = require('express');
const TrailerController = require('../controllers/TrailerController');

const router = express.Router();

router.get('/', TrailerController.searchTrailers);

module.exports = router;
