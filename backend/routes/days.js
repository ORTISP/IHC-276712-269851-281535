const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// GET /api/menus/days/:dayId/meals - Get meals for a specific day
router.get('/:id/meals', menuController.getMealsForDay);

module.exports = router;
