const { Menu, MenuDay, Meal, MealRecipe } = require('../models');
const validation = require('./validation/menuValidation');

const menuService = {
  createMenu: async (menuData) => {
    const validationResult = validation.validateMenuCreation(menuData);
    if (!validationResult.isValid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    const { sanitized } = validationResult;
    const menu = await Menu.create({
      name: sanitized.name,
      type: sanitized.type,
      is_public: sanitized.is_public,
      user_id: sanitized.user_id,
    });

    return await menuService.getMenuById(menu.id);
  },

  getMenuById: async (id) => {
    const menu = await Menu.findByPk(id, {
      include: [
        {
          model: MenuDay,
          as: 'days',
          include: [
            {
              model: Meal,
              as: 'meals',
              include: [{ model: MealRecipe, as: 'mealRecipes' }],
              order: [['created_at', 'ASC']],
            },
          ],
          order: [['day_number', 'ASC']],
        },
      ],
      order: [['created_at', 'ASC']],
    });

    return menu || null;
  },

  getAllMenus: async ({ page = 1, limit = 10, search, is_public } = {}) => {
    const { Op } = require('sequelize');
    const offset = (page - 1) * limit;

    const where = {};
    if (search) where.name = { [Op.iLike]: `%${search}%` };
    if (typeof is_public === 'boolean') where.is_public = is_public;

    const { count, rows } = await Menu.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']],
    });

    return {
      menus: rows,
      pagination: {
        current_page: parseInt(page),
        total_pages: Math.ceil(count / limit),
        total_items: count,
        items_per_page: parseInt(limit),
      },
    };
  },

  updateMenu: async (id, updateData) => {
    const menu = await Menu.findByPk(id);
    if (!menu) throw new Error('Menu not found');

    await menu.update({
      name: updateData.name ?? menu.name,
      type: updateData.type ?? menu.type,
      is_public: updateData.is_public ?? menu.is_public,
    });

    return await menuService.getMenuById(menu.id);
  },

  deleteMenu: async (id) => {
    const menu = await Menu.findByPk(id);
    if (!menu) throw new Error('Menu not found');
    await menu.destroy();
    return true;
  },
};

module.exports = menuService;
