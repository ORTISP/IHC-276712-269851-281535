const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true, // Can be null, will be filled in later
      defaultValue: null,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'password_hash',
    },
    password_salt: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'password_salt',
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true, // Can be null, will be filled in later
      defaultValue: null,
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'other', 'prefer-not-to-say'),
      allowNull: true, // Can be null, will be filled in later
      defaultValue: null,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_verified',
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'is_active',
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        fields: ['email'],
      },
      {
        fields: ['created_at'],
      },
    ],
  }
);

module.exports = User;
