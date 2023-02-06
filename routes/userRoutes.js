const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/signUp').post(userController.signUp);

router.route('/signIn').post(userController.signIn);

module.exports = router;
