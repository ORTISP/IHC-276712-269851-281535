const { Menu, MenuDay, Meal, MealRecipe } = require('../models');
const validation = require('./validation/menuValidation');

// Tipos de comidas en orden por defecto
const defaultMealOrder = ['breakfast', 'lunch', 'snack', 'dinner'];

/**
 * menuService: operaciones para menus, dias, comidas y relaciones con recetas
 */
const menuService = {
  // Crear un menú (y si create_days=true, crear días y comidas automáticas)
  createMenu: async (menuData) => {
    try {
      const validationResult = validation.validateMenuCreation(menuData);
      if (!validationResult.isValid) {
        throw new Error(
          `Validation failed: ${validationResult.errors.join(', ')}`
        );
      }
      const { sanitized } = validationResult;

      // Crear Menu
      const menu = await Menu.create({
        name: sanitized.name,
        type: sanitized.type,
        is_public: sanitized.is_public,
      });

      // Si se solicita, crear días y comidas automáticamente
      if (sanitized.create_days) {
        const maxDays = validation.getMaxDaysForType(sanitized.type);
        const menuDayRecords = [];
        for (let d = 1; d <= maxDays; d++) {
          const createdDay = await MenuDay.create({
            menu_id: menu.id,
            day_number: d,
          });
          menuDayRecords.push(createdDay);

          // crear las 4 comidas por día
          for (const mealType of defaultMealOrder) {
            await Meal.create({
              menu_day_id: createdDay.id,
              type: mealType,
            });
          }
        }
      }

      // devolver menú con días y comidas
      return await menuService.getMenuById(menu.id);
    } catch (error) {
      throw error;
    }
  },

  // Obtener menu por id (incluye días, comidas y mealRecipes)
  getMenuById: async (id) => {
    try {
      const menu = await Menu.findByPk(id, {
        include: [
          {
            model: MenuDay,
            as: 'days',
            include: [
              {
                model: Meal,
                as: 'meals',
                include: [
                  {
                    model: MealRecipe,
                    as: 'mealRecipes',
                  },
                ],
                order: [['created_at', 'ASC']],
              },
            ],
            order: [['day_number', 'ASC']],
          },
        ],
        order: [['created_at', 'ASC']],
      });

      if (!menu) return null;
      return menu;
    } catch (error) {
      throw error;
    }
  },

  // Listar menus con paginación y filtros (search por name, filter por is_public)
  getAllMenus: async (options = {}) => {
    try {
      const { page = 1, limit = 10, search, is_public } = options;
      const offset = (page - 1) * limit;
      const { Op } = require('sequelize');

      const where = {};
      if (search) {
        where.name = { [Op.iLike]: `%${search}%` };
      }
      if (typeof is_public === 'boolean') {
        where.is_public = is_public;
      }

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
    } catch (error) {
      throw error;
    }
  },

  // Actualizar menú (solo name, type y is_public). Si cambia type, se puede regenerar días si requested
  updateMenu: async (id, updateData) => {
    try {
      const menu = await Menu.findByPk(id);
      if (!menu) throw new Error('Menu not found');

      // validate minimal fields
      const tmp = {
        name: updateData.name !== undefined ? updateData.name : menu.name,
        type: updateData.type !== undefined ? updateData.type : menu.type,
        is_public:
          updateData.is_public !== undefined
            ? updateData.is_public
            : menu.is_public,
        create_days: updateData.create_days, // optional flag
      };
      const validationResult = validation.validateMenuCreation(tmp);
      if (!validationResult.isValid) {
        throw new Error(
          `Validation failed: ${validationResult.errors.join(', ')}`
        );
      }
      const { sanitized } = validationResult;

      // Si cambia el tipo de menú (daily/weekly/monthly) y el usuario pide regenerar:
      const typeChanged = sanitized.type !== menu.type;
      if (typeChanged && updateData.regenerate_days) {
        // eliminar días antiguos (cascade elimina meals y meal_recipes)
        await MenuDay.destroy({ where: { menu_id: menu.id } });

        // actualizar tipo y crear nuevos días
        await menu.update({
          name: sanitized.name,
          type: sanitized.type,
          is_public: sanitized.is_public,
        });

        const maxDays = validation.getMaxDaysForType(sanitized.type);
        for (let d = 1; d <= maxDays; d++) {
          const createdDay = await MenuDay.create({
            menu_id: menu.id,
            day_number: d,
          });
          for (const mealType of defaultMealOrder) {
            await Meal.create({
              menu_day_id: createdDay.id,
              type: mealType,
            });
          }
        }
      } else {
        // solo actualizar campos permitidos
        await menu.update({
          name: sanitized.name,
          type: sanitized.type,
          is_public: sanitized.is_public,
        });
      }

      return await menuService.getMenuById(menu.id);
    } catch (error) {
      throw error;
    }
  },

  // Eliminar menú (cascade con días, comidas, meal_recipes)
  deleteMenu: async (id) => {
    try {
      const menu = await Menu.findByPk(id);
      if (!menu) throw new Error('Menu not found');
      await menu.destroy();
      return true;
    } catch (error) {
      throw error;
    }
  },

  // DÍAS: agregar día a menú (validando rango según tipo)
  addDayToMenu: async (menuId, dayData) => {
    try {
      const menu = await Menu.findByPk(menuId);
      if (!menu) throw new Error('Menu not found');

      const validationResult = validation.validateDayCreation(
        menu.type,
        dayData
      );
      if (!validationResult.isValid) {
        throw new Error(
          `Validation failed: ${validationResult.errors.join(', ')}`
        );
      }
      const { sanitized } = validationResult;

      // evitar duplicar day_number
      const existing = await MenuDay.findOne({
        where: { menu_id: menu.id, day_number: sanitized.day_number },
      });
      if (existing)
        throw new Error(
          `Day number ${sanitized.day_number} already exists for this menu`
        );

      const day = await MenuDay.create({
        menu_id: menu.id,
        day_number: sanitized.day_number,
      });

      // crear comidas por defecto
      for (const mealType of defaultMealOrder) {
        await Meal.create({
          menu_day_id: day.id,
          type: mealType,
        });
      }

      return await MenuDay.findByPk(day.id, {
        include: [
          {
            model: Meal,
            as: 'meals',
            include: [{ model: MealRecipe, as: 'mealRecipes' }],
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  },

  getDaysForMenu: async (menuId) => {
    try {
      const days = await MenuDay.findAll({
        where: { menu_id: menuId },
        include: [
          {
            model: Meal,
            as: 'meals',
            include: [{ model: MealRecipe, as: 'mealRecipes' }],
          },
        ],
        order: [['day_number', 'ASC']],
      });
      return days;
    } catch (error) {
      throw error;
    }
  },

  updateMenuDay: async (dayId, data) => {
    try {
      const day = await MenuDay.findByPk(dayId);
      if (!day) throw new Error('MenuDay not found');

      // validar day_number según menu.type
      const menu = await Menu.findByPk(day.menu_id);
      if (!menu) throw new Error('Parent menu not found');

      const validationResult = validation.validateDayCreation(menu.type, data);
      if (!validationResult.isValid) {
        throw new Error(
          `Validation failed: ${validationResult.errors.join(', ')}`
        );
      }
      const { sanitized } = validationResult;

      // verificar duplicado
      const existing = await MenuDay.findOne({
        where: {
          menu_id: menu.id,
          day_number: sanitized.day_number,
          id: { [require('sequelize').Op.ne]: day.id },
        },
      });
      if (existing)
        throw new Error('Another day with the same day_number exists');

      await day.update({ day_number: sanitized.day_number });
      return await MenuDay.findByPk(day.id, {
        include: [
          {
            model: Meal,
            as: 'meals',
            include: [{ model: MealRecipe, as: 'mealRecipes' }],
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  },

  deleteMenuDay: async (dayId) => {
    try {
      const day = await MenuDay.findByPk(dayId);
      if (!day) throw new Error('MenuDay not found');
      await day.destroy();
      return true;
    } catch (error) {
      throw error;
    }
  },

  // COMIDAS (Meals)
  addMealToDay: async (dayId, mealData) => {
    try {
      const day = await MenuDay.findByPk(dayId);
      if (!day) throw new Error('MenuDay not found');

      const validationResult = validation.validateMealCreation(mealData);
      if (!validationResult.isValid) {
        throw new Error(
          `Validation failed: ${validationResult.errors.join(', ')}`
        );
      }
      const { sanitized } = validationResult;

      // evitar duplicar tipo de comida dentro del mismo día
      const existing = await Meal.findOne({
        where: { menu_day_id: day.id, type: sanitized.type },
      });
      if (existing)
        throw new Error(
          `Meal of type ${sanitized.type} already exists for this day`
        );

      const meal = await Meal.create({
        menu_day_id: day.id,
        type: sanitized.type,
      });

      return await Meal.findByPk(meal.id, {
        include: [{ model: MealRecipe, as: 'mealRecipes' }],
      });
    } catch (error) {
      throw error;
    }
  },

  getMealsForDay: async (dayId) => {
    try {
      const meals = await Meal.findAll({
        where: { menu_day_id: dayId },
        include: [{ model: MealRecipe, as: 'mealRecipes' }],
        order: [['created_at', 'ASC']],
      });
      return meals;
    } catch (error) {
      throw error;
    }
  },

  updateMeal: async (mealId, data) => {
    try {
      const meal = await Meal.findByPk(mealId);
      if (!meal) throw new Error('Meal not found');

      // Si se cambia el tipo, validar
      if (data.type && data.type !== meal.type) {
        const validationResult = validation.validateMealCreation({
          type: data.type,
        });
        if (!validationResult.isValid)
          throw new Error(
            `Validation failed: ${validationResult.errors.join(', ')}`
          );
        // evitar duplicar tipo en el mismo día
        const existing = await Meal.findOne({
          where: {
            menu_day_id: meal.menu_day_id,
            type: data.type,
            id: { [require('sequelize').Op.ne]: meal.id },
          },
        });
        if (existing)
          throw new Error(
            'Another meal with this type already exists for the same day'
          );
      }

      await meal.update(data);
      return await Meal.findByPk(meal.id, {
        include: [{ model: MealRecipe, as: 'mealRecipes' }],
      });
    } catch (error) {
      throw error;
    }
  },

  deleteMeal: async (mealId) => {
    try {
      const meal = await Meal.findByPk(mealId);
      if (!meal) throw new Error('Meal not found');
      await meal.destroy();
      return true;
    } catch (error) {
      throw error;
    }
  },

  // RECETAS en comidas (MealRecipe)
  addRecipeToMeal: async (mealId, recipeId) => {
    try {
      const validationResult = validation.validateMealRecipeCreation({
        meal_id: mealId,
        recipe_id: recipeId,
      });
      if (!validationResult.isValid) {
        throw new Error(
          `Validation failed: ${validationResult.errors.join(', ')}`
        );
      }
      const { sanitized } = validationResult;

      // verificar existencia del meal
      const meal = await Meal.findByPk(sanitized.meal_id);
      if (!meal) throw new Error('Meal not found');

      // evitar duplicados exactos meal + recipe
      const existing = await MealRecipe.findOne({
        where: { meal_id: sanitized.meal_id, recipe_id: sanitized.recipe_id },
      });
      if (existing)
        throw new Error('This recipe is already attached to the meal');

      const mealRecipe = await MealRecipe.create({
        meal_id: sanitized.meal_id,
        recipe_id: sanitized.recipe_id,
      });

      return mealRecipe;
    } catch (error) {
      throw error;
    }
  },

  removeRecipeFromMeal: async (mealId, recipeId) => {
    try {
      const validationResult = validation.validateMealRecipeCreation({
        meal_id: mealId,
        recipe_id: recipeId,
      });
      if (!validationResult.isValid) {
        throw new Error(
          `Validation failed: ${validationResult.errors.join(', ')}`
        );
      }
      const { sanitized } = validationResult;

      const mealRecipe = await MealRecipe.findOne({
        where: { meal_id: sanitized.meal_id, recipe_id: sanitized.recipe_id },
      });
      if (!mealRecipe) throw new Error('MealRecipe not found');

      await mealRecipe.destroy();
      return true;
    } catch (error) {
      throw error;
    }
  },

  getRecipesForMeal: async (mealId) => {
    try {
      const recipes = await MealRecipe.findAll({ where: { meal_id: mealId } });
      return recipes;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = menuService;
