const mealService = require('../businessLogic/mealService');

const mealController = {
  getMealsForDay: async (req, res) => {
    try {
      const { dayId } = req.params;
      const meals = await mealService.getMealsForDay(dayId);
      res.json({ success: true, message: 'Comidas obtenidas correctamente', data: meals });
    } catch (error) {
      console.error('Error al obtener comidas:', error);
      res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
  },

  addMealToDay: async (req, res) => {
    try {
      const { menuId, dayNumber } = req.params;
      const result = await mealService.addMealToMenuDay(menuId, parseInt(dayNumber), req.body);
      res.status(201).json({ success: true, message: 'Comida agregada correctamente', data: result });
    } catch (error) {
      console.error('Error al agregar comida:', error);
      res.status(400).json({ success: false, error: error.message });
    }
  },

  updateMeal: async (req, res) => {
    try {
      const { mealId } = req.params;
      const updated = await mealService.updateMeal(mealId, req.body);
      res.json({ success: true, message: 'Comida actualizada correctamente', data: updated });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  deleteMeal: async (req, res) => {
    try {
      const { mealId } = req.params;
      await mealService.deleteMeal(mealId);
      res.json({ success: true, message: 'Comida eliminada correctamente' });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  addRecipeToMeal: async (req, res) => {
    try {
      const { mealId } = req.params;
      const { recipe_id } = req.body;
      const result = await mealService.addRecipeToMeal(mealId, recipe_id);
      res.status(201).json({ success: true, message: 'Receta agregada correctamente', data: result });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  removeRecipeFromMeal: async (req, res) => {
    try {
      const { mealId, recipeId } = req.params;
      await mealService.removeRecipeFromMeal(mealId, recipeId);
      res.json({ success: true, message: 'Receta eliminada correctamente' });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },
};

module.exports = mealController;
