const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const config = require('../config');
const logger = require('../utils/logger');
const bcrypt = require('bcryptjs');
const User = require('../database/models/User.model');
const sequelize = require('../database/connection');

// Função para verificar e criar a tabela se não existir
const ensureUserTableExists = async () => {
  try {
    await User.sync({ force: false }); // Cria a tabela se não existir (sem dropar se existir)
    logger.info('Tabela de usuários verificada/criada com sucesso');
  } catch (error) {
    logger.error('Erro ao verificar/criar tabela de usuários:', error);
    throw {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Erro ao inicializar banco de dados',
    };
  }
};

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwt.secret, {
    expiresIn: config.jwt.expire,
  });
};

const register = async (userData) => {
  try {
    // Verifica se a tabela existe antes de operar
    await ensureUserTableExists();

    if (await User.isEmailTaken(userData.email)) {
      throw {
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Email already taken',
      };
    }

    const user = await User.create(userData);
    logger.info(`User registered: ${user.email}`);
    return user;
  } catch (error) {
    logger.error(`Registration error: ${error.message}`);
    throw error;
  }
};

const login = async (email, password) => {
  try {
    await ensureUserTableExists();

    // Inclua a senha na consulta usando o scope 'withPassword'
    const user = await User.scope('withPassword').findOne({ 
      where: { email } 
    });

    if (!user) {
      throw {
        statusCode: StatusCodes.UNAUTHORIZED,
        message: 'Incorrect email or password',
      };
    }

    // Verifique a senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw {
        statusCode: StatusCodes.UNAUTHORIZED,
        message: 'Incorrect email or password',
      };
    }

    // Remova a senha antes de retornar
    const userWithoutPassword = user.get({ plain: true });
    delete userWithoutPassword.password;

    const token = generateToken(user.id);
    logger.info(`User logged in: ${user.email}`);
    return { user: userWithoutPassword, token };
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    throw error;
  }
};

module.exports = {
  register,
  login,
  ensureUserTableExists // Exportando para poder chamar explicitamente se necessário
};