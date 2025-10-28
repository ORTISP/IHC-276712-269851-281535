const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// GET /api/menus - Obtener todos los menús
router.get('/', menuController.getAllMenus);

// GET /api/menus/:id - Obtener un menú por ID
router.get('/:id', menuController.getMenuById);

// POST /api/menus - Crear un nuevo menú
router.post('/', menuController.createMenu);

// PUT /api/menus/:id - Actualizar un menú
router.put('/:id', menuController.updateMenu);

// DELETE /api/menus/:id - Eliminar un menú
router.delete('/:id', menuController.deleteMenu);

module.exports = router;
