const menuService = require('../businessLogic/menuService');

const menuController = {
  // Obtener todos los menús
  getAllMenus: async (req, res) => {
    try {
      const { page = 1, limit = 10, search, is_public } = req.query;

      const result = await menuService.getAllMenus({
        page: parseInt(page),
        limit: parseInt(limit),
        search,
        is_public: is_public === 'true' ? true : is_public === 'false' ? false : undefined,
      });

      res.json({
        success: true,
        message: 'Menús obtenidos correctamente',
        data: result,
      });
    } catch (error) {
      console.error('Error al obtener menús:', error);
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor al obtener menús',
      });
    }
  },

  // Obtener menú por ID
  getMenuById: async (req, res) => {
    try {
      const { id } = req.params;

      const menu = await menuService.getMenuById(id);
      if (!menu) {
        return res.status(404).json({
          success: false,
          error: 'Menú no encontrado',
        });
      }

      res.json({
        success: true,
        message: 'Menú obtenido correctamente',
        data: menu,
      });
    } catch (error) {
      console.error('Error al obtener menú:', error);
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor al obtener menú',
      });
    }
  },

  // Crear menú
  createMenu: async (req, res) => {
    try {
      const { name, type, is_public, user_id } = req.body;

      const result = await menuService.createMenu({
        name,
        type,
        is_public,
        user_id,
      });

      res.status(201).json({
        success: true,
        message: 'Menú creado correctamente',
        data: result,
      });
    } catch (error) {
      console.error('Error al crear menú:', error);

      if (error.message.includes('Validation failed')) {
        return res.status(400).json({
          success: false,
          error: error.message,
        });
      }

      res.status(500).json({
        success: false,
        error: 'Error interno del servidor al crear el menú',
      });
    }
  },

  // Actualizar menú
  updateMenu: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updated = await menuService.updateMenu(id, updateData);

      res.json({
        success: true,
        message: 'Menú actualizado correctamente',
        data: updated,
      });
    } catch (error) {
      console.error('Error al actualizar menú:', error);

      if (error.message.includes('not found')) {
        return res.status(404).json({
          success: false,
          error: error.message,
        });
      }

      res.status(500).json({
        success: false,
        error: 'Error interno del servidor al actualizar menú',
      });
    }
  },

  // Eliminar menú
  deleteMenu: async (req, res) => {
    try {
      const { id } = req.params;
      await menuService.deleteMenu(id);
      res.json({
        success: true,
        message: 'Menú eliminado correctamente',
      });
    } catch (error) {
      console.error('Error al eliminar menú:', error);
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor al eliminar menú',
      });
    }
  },
};

module.exports = menuController;
