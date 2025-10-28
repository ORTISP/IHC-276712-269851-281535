const { Meal, MealRecipe } = require('../models');
const validation = require('./validation/menuValidation');
const dayService = require('./dayService');

const mealService = {
  // Obtener comidas de un día
  getMealsForDay: async (menuId, day_number) => {
    const day = await dayService.findExistingDay(menuId, day_number);
    if (!day) return [];
    return await Meal.findAll({
      where: { menu_day_id: day.id },
      include: [{ model: MealRecipe, as: 'mealRecipes' }],
      order: [['created_at', 'ASC']],
    });
  },

  /**
   * Asociar receta a un día y tipo de comida.
   * Crea automáticamente el día y el meal si no existen.
   */
  addRecipeToMeal: async (menuId, data) => {
    const { day_number, type, recipe_id } = data;

    if (!day_number || !type || !recipe_id)
      throw new Error('day_number, type y recipe_id son requeridos');

    // Validar entrada
    const validationResult = validation.validateMealRecipeCreation({
      type,
      recipe_id,
    });
    if (!validationResult.isValid)
      throw new Error(
        `Validation failed: ${validationResult.errors.join(', ')}`
      );

    // Buscar o crear día
    const menuDay = await dayService.findOrCreateDay(
      menuId,
      parseInt(day_number)
    );

    // Buscar o crear la comida (meal)
    let meal = await Meal.findOne({
      where: { menu_day_id: menuDay.id, type },
    });

    if (!meal) {
      meal = await Meal.create({
        menu_day_id: menuDay.id,
        type,
      });
    }

    // Verificar si la receta ya está asociada
    const existing = await MealRecipe.findOne({
      where: { meal_id: meal.id, recipe_id },
    });
    if (existing) throw new Error('La receta ya está asociada a esta comida');

    // Crear la relación
    await MealRecipe.create({
      meal_id: meal.id,
      recipe_id,
    });

    return await Meal.findByPk(meal.id, {
      include: [{ model: MealRecipe, as: 'mealRecipes' }],
    });
  },

  /**
   * Eliminar una receta de una comida.
   * Si no quedan recetas asociadas, eliminar la comida.
   * Si no quedan comidas en ese día, eliminar el día también.
   */
  removeRecipeFromMeal: async (menuId, data) => {
    const { day_number, type, recipe_id } = data;

    if (!day_number || !type || !recipe_id)
      throw new Error('day_number, type y recipe_id son requeridos');

    // Buscar el día correspondiente
    const menuDay = await dayService.findExistingDay(
      menuId,
      parseInt(day_number)
    );
    if (!menuDay) throw new Error('El día especificado no existe');

    // Buscar la comida (meal)
    const meal = await Meal.findOne({
      where: { menu_day_id: menuDay.id, type },
    });
    if (!meal) throw new Error('La comida especificada no existe');

    // Buscar la relación MealRecipe
    const mealRecipe = await MealRecipe.findOne({
      where: { meal_id: meal.id, recipe_id },
    });
    if (!mealRecipe)
      throw new Error('La receta no está asociada a esta comida');

    // Eliminar la relación
    await mealRecipe.destroy();

    // Verificar si quedan recetas asociadas al meal
    const remainingRecipes = await MealRecipe.count({
      where: { meal_id: meal.id },
    });

    if (remainingRecipes === 0) {
      const dayId = meal.menu_day_id;

      // Eliminar la comida
      await meal.destroy();

      // ✅ Verificar si el día quedó vacío (sin meals)
      await dayService.deleteDayIfEmpty(dayId);
    }

    return true;
  },
};

module.exports = mealService;
