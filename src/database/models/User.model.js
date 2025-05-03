// src/models/user.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../connection'); 
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
    validate: {
      len: [8] // Mínimo de 8 caracteres
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at'
  }
}, {
  tableName: 'users',
  timestamps: true,
  defaultScope: {
    attributes: {
      exclude: ['password'] // Não retornar senha por padrão
    }
  },
  scopes: {
    withPassword: {
      attributes: {} // Incluir senha quando necessário
    }
  }
});

// Método para verificar se email já está em uso
User.isEmailTaken = async function (email, excludeUserId) {
  const where = { email };
  if (excludeUserId) {
    where.id = { [sequelize.Op.ne]: excludeUserId };
  }
  
  const user = await this.findOne({ where });
  return !!user;
};


User.findById = async function (id) {
  return await this.findByPk(id);
};

// Hook para hash da senha antes de salvar
User.beforeSave(async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});

module.exports = User;