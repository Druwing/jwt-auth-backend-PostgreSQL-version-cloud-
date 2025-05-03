const { StatusCodes } = require('http-status-codes');
const logger = require('../utils/logger');
const User = require('../database/models/User.model');

const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw {
        statusCode: StatusCodes.NOT_FOUND,
        message: 'User not found',
      };
    }
    return user;
  } catch (error) {
    logger.error(`Get user error: ${error.message}`);
    throw error;
  }
};

module.exports = {
  getUserById,
};