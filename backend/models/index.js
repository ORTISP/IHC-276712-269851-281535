const { sequelize } = require('../config/database');
const User = require('./User');
const UserSession = require('./UserSession');

// Define associations/relationships
User.hasMany(UserSession, {
  foreignKey: 'user_id',
  as: 'sessions',
  onDelete: 'CASCADE'
});

UserSession.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
  onDelete: 'CASCADE'
});

// Initialize database and sync models
const initializeDatabase = async () => {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // Sync models (create tables if they don't exist)
    await sequelize.sync({ alter: false }); // Use { force: true } to drop and recreate tables
    console.log('✅ Database models synchronized successfully.');

    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    return false;
  }
};

// Close database connection
const closeDatabase = async () => {
  try {
    await sequelize.close();
    console.log('✅ Database connection closed.');
  } catch (error) {
    console.error('❌ Error closing database connection:', error);
  }
};

module.exports = {
  sequelize,
  User,
  UserSession,
  initializeDatabase,
  closeDatabase
};
