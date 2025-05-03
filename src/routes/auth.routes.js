const express = require('express');
const router = express.Router();
const { validateRegister, validateLogin } = require('../utils/validators');
const authController = require('../controllers/auth.controller');

router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);

module.exports = router;