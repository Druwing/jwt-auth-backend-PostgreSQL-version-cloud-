const { Sequelize } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(process.env.POSTGRES_URL_LOCAL, {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false
    } : false
  }
});

// Testar conexão
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL conectado');
  } catch (error) {
    console.error('❌ Erro na conexão PostgreSQL:', error);
  }
})();

module.exports = sequelize;