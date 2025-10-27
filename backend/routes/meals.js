const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// GET /api/menus/meals/:mealId/recipes - Get recipes for a specific meal
router.get('/:id/recipes', menuController.getRecipesForMeal);

module.exports = router;
