const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Meal = require('./Meal');

const MealRecipe = sequelize.define(
  'MealRecipe',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    meal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Meal,
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    recipe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'meal_recipes',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [{ fields: ['meal_id'] }, { fields: ['recipe_id'] }],
  }
);

Meal.hasMany(MealRecipe, { foreignKey: 'meal_id', as: 'mealRecipes' });
MealRecipe.belongsTo(Meal, { foreignKey: 'meal_id', as: 'meal' });

module.exports = MealRecipe;
