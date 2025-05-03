const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const protectedRoutes = require('./protected.routes');

router.use('/auth', authRoutes);
router.use('', protectedRoutes);

module.exports = router;