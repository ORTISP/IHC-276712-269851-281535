const { Meal, MealRecipe } = require('../models');
const validation = require('./validation/menuValidation');
const { Op } = require('sequelize');
const dayService = require('./dayService');

const mealService = {
  // Obtener comidas de un día
  getMealsForDay: async (dayId) => {
    const meals = await Meal.findAll({
      where: { menu_day_id: dayId },
      include: [{ model: MealRecipe, as: 'mealRecipes' }],
      order: [['created_at', 'ASC']],
    });
    return meals;
  },

  // Agregar comida (usa dayService para crear el día si no existe)
  addMealToMenuDay: async (menuId, mealData) => {
    const { day_number } = mealData;
    if (!day_number) throw new Error('day_number is required');

    const validationResult = validation.validateMealCreation(mealData);
    if (!validationResult.isValid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    const { sanitized } = validationResult;

    // Buscar o crear día
    const menuDay = await dayService.findOrCreateDay(menuId, parseInt(day_number));

    // Evitar duplicar tipo de comida
    const existingMeal = await Meal.findOne({
      where: { menu_day_id: menuDay.id, type: sanitized.type },
    });
    if (existingMeal) {
      throw new Error(`Meal of type '${sanitized.type}' already exists for this day`);
    }

    // Crear la comida
    const meal = await Meal.create({
      menu_day_id: menuDay.id,
      type: sanitized.type,
    });

    // Retornar con sus recetas (vacías inicialmente)
    return await Meal.findByPk(meal.id, { include: [{ model: MealRecipe, as: 'mealRecipes' }] });
  },

  // Actualizar comida
  updateMeal: async (mealId, data) => {
    const meal = await Meal.findByPk(mealId);
    if (!meal) throw new Error('Meal not found');

    if (data.type && data.type !== meal.type) {
      const validationResult = validation.validateMealCreation({ type: data.type });
      if (!validationResult.isValid) {
        throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
      }

      const existing = await Meal.findOne({
        where: { menu_day_id: meal.menu_day_id, type: data.type, id: { [Op.ne]: meal.id } },
      });
      if (existing) throw new Error('Another meal with this type already exists');
    }

    await meal.update(data);
    return await Meal.findByPk(meal.id, { include: [{ model: MealRecipe, as: 'mealRecipes' }] });
  },

  // Eliminar comida
  deleteMeal: async (mealId) => {
    const meal = await Meal.findByPk(mealId);
    if (!meal) throw new Error('Meal not found');
    await meal.destroy();
    return true;
  },

  // Asociar receta
  addRecipeToMeal: async (mealId, recipeId) => {
    const validationResult = validation.validateMealRecipeCreation({
      meal_id: mealId,
      recipe_id: recipeId,
    });
    if (!validationResult.isValid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    const { sanitized } = validationResult;
    const meal = await Meal.findByPk(sanitized.meal_id);
    if (!meal) throw new Error('Meal not found');

    const existing = await MealRecipe.findOne({
      where: { meal_id: sanitized.meal_id, recipe_id: sanitized.recipe_id },
    });
    if (existing) throw new Error('This recipe is already attached to the meal');

    return await MealRecipe.create({
      meal_id: sanitized.meal_id,
      recipe_id: sanitized.recipe_id,
    });
  },

  // Eliminar receta
  removeRecipeFromMeal: async (mealId, recipeId) => {
    const mealRecipe = await MealRecipe.findOne({
      where: { meal_id: mealId, recipe_id: recipeId },
    });
    if (!mealRecipe) throw new Error('MealRecipe not found');
    await mealRecipe.destroy();
    return true;
  },
};

module.exports = mealService;
