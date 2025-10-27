const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Menu = require('./Menu');

const MenuDay = sequelize.define(
  'MenuDay',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    menu_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Menu,
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    day_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'menu_days',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [{ fields: ['menu_id'] }, { fields: ['day_number'] }],
  }
);

module.exports = MenuDay;
