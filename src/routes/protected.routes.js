const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const protectedController = require('../controllers/protected.controller');

router.get('/protected', auth, protectedController.protectedRoute);

module.exports = router;