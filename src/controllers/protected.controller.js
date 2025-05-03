const { StatusCodes } = require('http-status-codes');
const userService = require('../services/user.service');
const logger = require('../utils/logger');

const protectedRoute = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.userId);
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Access authorized',
      data: { user },
    });
  } catch (error) {
    logger.error(`Protected route error: ${error.message}`);
    next(error);
  }
};

module.exports = {
  protectedRoute,
};