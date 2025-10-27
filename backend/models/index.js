const { sequelize } = require('../config/database');
const User = require('./User');
const UserSession = require('./UserSession');
const Menu = require('./Menu');
const MenuDay = require('./MenuDay');
const Meal = require('./Meal');
const MealRecipe = require('./MealRecipe');

// Relaciones de usuario
User.hasMany(UserSession, {
  foreignKey: 'user_id',
  as: 'sessions',
  onDelete: 'CASCADE',
});
UserSession.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
  onDelete: 'CASCADE',
});

// Relaciones de menú
Menu.hasMany(MenuDay, {
  as: 'days',
  foreignKey: 'menu_id',
  onDelete: 'CASCADE',
});
Menu.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'creator',
});

MenuDay.belongsTo(Menu, {
  foreignKey: 'menu_id',
  as: 'menu',
});
MenuDay.hasMany(Meal, {
  as: 'meals',
  foreignKey: 'menu_day_id',
  onDelete: 'CASCADE',
});

Meal.belongsTo(MenuDay, {
  foreignKey: 'menu_day_id',
  as: 'day',
});
Meal.hasMany(MealRecipe, {
  as: 'mealRecipes',
  foreignKey: 'meal_id',
  onDelete: 'CASCADE',
});

MealRecipe.belongsTo(Meal, {
  foreignKey: 'meal_id',
  as: 'meal',
});

// Inicialización
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    await sequelize.sync({ alter: false });
    console.log('✅ Database models synchronized successfully.');

    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    return false;
  }
};

// Cerrar conexión
const closeDatabase = async () => {
  try {
    await sequelize.close();
    console.log('✅ Database connection closed.');
  } catch (error) {
    console.error('❌ Error closing database connection:', error);
  }
};

// Exportar todo
module.exports = {
  sequelize,
  User,
  UserSession,
  Menu,
  MenuDay,
  Meal,
  MealRecipe,
  initializeDatabase,
  closeDatabase,
};
