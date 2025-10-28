const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');

// GET /api/days/:dayId/meals - Obtener comidas de un día
router.get('/days/:dayId/meals', mealController.getMealsForDay);

// POST /api/menus/:menuId/meals - Agregar comida (crea el día si no existe)
router.post('/menus/:menuId/meals', mealController.addMealToDay)

// PUT /api/meals/:mealId - Actualizar comida
router.put('/meals/:mealId', mealController.updateMeal);

// DELETE /api/meals/:mealId - Eliminar comida
router.delete('/meals/:mealId', mealController.deleteMeal);

// POST /api/meals/:mealId/recipes - Agregar receta
router.post('/meals/:mealId/recipes', mealController.addRecipeToMeal);

// DELETE /api/meals/:mealId/recipes/:recipeId - Eliminar receta
router.delete('/meals/:mealId/recipes/:recipeId', mealController.removeRecipeFromMeal);

module.exports = router;
