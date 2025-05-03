const { StatusCodes } = require('http-status-codes');
const authService = require('../services/auth.service');
const logger = require('../utils/logger');

const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'User registered successfully',
      data: user,
    });
  } catch (error) {
    logger.error(`Register controller error: ${error.message}`);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Login successful',
      data: { user, token },
    });
  } catch (error) {
    logger.error(`Login controller error: ${error.message}`);
    next(error);
  }
};

module.exports = {
  register,
  login,
};