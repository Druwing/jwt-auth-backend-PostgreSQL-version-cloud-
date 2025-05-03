const { StatusCodes } = require('http-status-codes');
const logger = require('../utils/logger');

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof Error)) {
    const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Internal Server Error';
    error = new Error(message);
    error.statusCode = statusCode;
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const { statusCode = StatusCodes.INTERNAL_SERVER_ERROR, message } = err;

  logger.error(`Error ${statusCode}: ${message}`);

  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? err.stack : {},
  });
};

module.exports = {
  errorConverter,
  errorHandler,
};