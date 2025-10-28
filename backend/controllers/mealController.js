const mealService = require('../businessLogic/mealService');

const mealController = {
  // Obtener comidas de un día específico
  getMealsForDay: async (req, res) => {
    try {
      const { menuId, dayNumber } = req.params;
      const meals = await mealService.getMealsForDay(menuId, dayNumber);

      res.json({
        success: true,
        message: 'Comidas obtenidas correctamente',
        data: meals,
      });
    } catch (error) {
      console.error('Error al obtener comidas:', error);
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor al obtener comidas',
      });
    }
  },

  // Agregar una receta (crea el día y el meal automáticamente si no existen)
  addRecipeToMeal: async (req, res) => {
    try {
      const { menuId } = req.params;
      const { day_number, type, recipe_id } = req.body;

      const result = await mealService.addRecipeToMeal(menuId, {
        day_number,
        type,
        recipe_id,
      });

      res.status(201).json({
        success: true,
        message: 'Receta agregada correctamente y comida creada si no existía',
        data: result,
      });
    } catch (error) {
      console.error('Error al agregar receta:', error);
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  },

  // Eliminar una receta (si no quedan, elimina meal y posiblemente el día)
  removeRecipeFromMeal: async (req, res) => {
    try {
      const { menuId } = req.params;
      const { day_number, type, recipe_id } = req.body;

      if (!day_number || !type || !recipe_id) {
        return res.status(400).json({
          success: false,
          error: 'day_number, type y recipe_id son requeridos',
        });
      }

      await mealService.removeRecipeFromMeal(menuId, {
        day_number,
        type,
        recipe_id,
      });

      res.json({
        success: true,
        message:
          'Receta eliminada correctamente (comida y día eliminados si quedaron vacíos)',
      });
    } catch (error) {
      console.error('Error al eliminar receta:', error);
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  },
};

module.exports = mealController;
