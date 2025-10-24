const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const MenuDay = require('./MenuDay');

const Meal = sequelize.define(
  'Meal',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    menu_day_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: MenuDay,
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    type: {
      type: DataTypes.ENUM('breakfast', 'lunch', 'snack', 'dinner'),
      allowNull: false,
    },
  },
  {
    tableName: 'meals',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [{ fields: ['menu_day_id'] }, { fields: ['type'] }],
  }
);

MenuDay.hasMany(Meal, { foreignKey: 'menu_day_id', as: 'meals' });
Meal.belongsTo(MenuDay, { foreignKey: 'menu_day_id', as: 'day' });

module.exports = Meal;
