const menuService = require('../businessLogic/menuService');

const menuController = {
  // Obtener todos los menús
  getAllMenus: async (req, res) => {
    try {
      const { page = 1, limit = 10, search } = req.query;

      const result = await menuService.getAllMenus({
        page: parseInt(page),
        limit: parseInt(limit),
        search,
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

  // Obtener un menú por ID
  getMenuById: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Se requiere el ID del menú',
        });
      }

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
      console.error('Error al obtener el menú:', error);
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor al obtener el menú',
      });
    }
  },

  // Crear un nuevo menú
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

  // Actualizar un menú
  updateMenu: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Se requiere el ID del menú',
        });
      }

      const updatedMenu = await menuService.updateMenu(id, updateData);

      res.json({
        success: true,
        message: 'Menú actualizado correctamente',
        data: updatedMenu,
      });
    } catch (error) {
      console.error('Error al actualizar menú:', error);

      if (error.message.includes('Validation failed')) {
        return res.status(400).json({
          success: false,
          error: error.message,
        });
      }

      if (error.message.includes('not found')) {
        return res.status(404).json({
          success: false,
          error: error.message,
        });
      }

      res.status(500).json({
        success: false,
        error: 'Error interno del servidor al actualizar el menú',
      });
    }
  },

  // Eliminar un menú
  deleteMenu: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Se requiere el ID del menú',
        });
      }

      await menuService.deleteMenu(id);

      res.json({
        success: true,
        message: 'Menú eliminado correctamente',
      });
    } catch (error) {
      console.error('Error al eliminar menú:', error);

      if (error.message.includes('not found')) {
        return res.status(404).json({
          success: false,
          error: error.message,
        });
      }

      res.status(500).json({
        success: false,
        error: 'Error interno del servidor al eliminar el menú',
      });
    }
  },

  // Obtener los días de un menú
  getDaysForMenu: async (req, res) => {
    try {
      const { menuId } = req.params;

      const days = await menuService.getDaysForMenu(menuId);

      res.json({
        success: true,
        message: 'Días obtenidos correctamente',
        data: days,
      });
    } catch (error) {
      console.error('Error al obtener días del menú:', error);
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor al obtener días del menú',
      });
    }
  },

  // Obtener comidas de un día
  getMealsForDay: async (req, res) => {
    try {
      const { dayId } = req.params;

      const meals = await menuService.getMealsForDay(dayId);

      res.json({
        success: true,
        message: 'Comidas obtenidas correctamente',
        data: meals,
      });
    } catch (error) {
      console.error('Error al obtener comidas del día:', error);
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor al obtener comidas del día',
      });
    }
  },

  // Obtener recetas de una comida
  getRecipesForMeal: async (req, res) => {
    try {
      const { mealId } = req.params;

      const recipes = await menuService.getRecipesForMeal(mealId);

      res.json({
        success: true,
        message: 'Recetas obtenidas correctamente',
        data: recipes,
      });
    } catch (error) {
      console.error('Error al obtener recetas de la comida:', error);
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor al obtener recetas de la comida',
      });
    }
  },
};

module.exports = menuController;
