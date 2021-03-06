const express = require('express');
const UserController = require('../controllers/UserController');
const userTrailerRouter = require('./userTrailerRouter');

const router = express.Router();

router.use('/:user_id/trailers', userTrailerRouter);

router.get('/', UserController.index);
router.get('/:user_id', UserController.show);
router.patch('/:user_id', UserController.update);
router.delete('/:user_id', UserController.delete);

module.exports = router;
