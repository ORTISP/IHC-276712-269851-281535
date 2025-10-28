const { Menu, MenuDay } = require('../models');
const { MENU_TYPE_DAYS } = require('../utils/constants');

const dayService = {
  findOrCreateDay: async (menuId, dayNumber) => {
    const menu = await Menu.findByPk(menuId);
    if (!menu) throw new Error('Menu not found');

    const maxDays = MENU_TYPE_DAYS[menu.type];
    if (dayNumber > maxDays)
      throw new Error('Day number exceeds allowed range');

    let menuDay = await MenuDay.findOne({
      where: { menu_id: menuId, day_number: dayNumber },
    });

    if (!menuDay) {
      menuDay = await MenuDay.create({
        menu_id: menuId,
        day_number: dayNumber,
      });
    }

    return menuDay;
  },

  findExistingDay: async (menuId, dayNumber) => {
    return await MenuDay.findOne({
      where: { menu_id: menuId, day_number: dayNumber },
    });
  },

  deleteDayIfEmpty: async (dayId) => {
    const day = await MenuDay.findByPk(dayId);
    if (!day) return false; // si el día no existe, no hacemos nada

    const remainingMeals = await Meal.count({ where: { menu_day_id: day.id } });

    if (remainingMeals === 0) {
      await day.destroy();
      return true; // se eliminó
    }

    return false; // aún tiene comidas, no se elimina
  },
};

module.exports = dayService;
