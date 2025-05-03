const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const config = require('../config');
const logger = require('../utils/logger');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw {
        statusCode: StatusCodes.UNAUTHORIZED,
        message: 'Authentication required',
      };
    }

    const decoded = jwt.verify(token, config.jwt.secret);
    req.userId = decoded.id;
    next();
  } catch (error) {
    logger.error(`Authentication error: ${error.message}`);

    if (error.name === 'TokenExpiredError') {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: 'Token expired',
        error: 'Please authenticate again',
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: 'Invalid token',
        error: 'Please authenticate with a valid token',
      });
    }

    res.status(error.statusCode || StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: error.message || 'Authentication failed',
      error: error.message || 'Please authenticate',
    });
  }
};

module.exports = auth;