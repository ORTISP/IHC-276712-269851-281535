const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// GET /api/menus - Get all menus
router.get('/', menuController.getAllMenus);

// GET /api/menus/:id - Get menu by ID
router.get('/:id', menuController.getMenuById);

// POST /api/menus - Create new menu
router.post('/', menuController.createMenu);

// PUT /api/menus/:id - Update menu
router.put('/:id', menuController.updateMenu);

// DELETE /api/menus/:id - Delete menu
router.delete('/:id', menuController.deleteMenu);

// GET /api/menus/:menuId/days - Get days for a specific menu
router.get('/:menuId/days', menuController.getDaysForMenu);

module.exports = router;
