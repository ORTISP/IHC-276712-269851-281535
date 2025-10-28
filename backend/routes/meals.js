const express = require('express');
const router = express.Router({ mergeParams: true });
const mealController = require('../controllers/mealController');

// GET /api/menus/:menuId/days/:dayNumber/meals - Obtener comidas de un día
router.get('/days/:dayNumber/meals', mealController.getMealsForDay);

// POST /api/menus/:menuId/meals/add-recipe - Agregar receta
router.post('/meals/add-recipe', mealController.addRecipeToMeal);

// DELETE /api/menus/:menuId/meals/delete-recipe - Eliminar receta
router.delete('/meals/delete-recipe', mealController.removeRecipeFromMeal);

module.exports = router;
