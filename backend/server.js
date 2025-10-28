const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const indexRoutes = require('./routes/index');
// const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menus');
const mealRoutes = require('./routes/meals');
const dayRoutes = require('./routes/days');

// Import database
const { initializeDatabase } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', indexRoutes);
// app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api', mealRoutes);
app.use('/api', dayRoutes);

// Initialize database and start server
const startServer = async () => {
  try {
    // Initialize database
    const dbInitialized = await initializeDatabase();

    if (!dbInitialized) {
      console.error('❌ Failed to initialize database. Exiting...');
      process.exit(1);
    }

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log('📊 Database connected successfully');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  const { closeDatabase } = require('./models');
  await closeDatabase();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received. Shutting down gracefully...');
  const { closeDatabase } = require('./models');
  await closeDatabase();
  process.exit(0);
});

startServer();

module.exports = app;
