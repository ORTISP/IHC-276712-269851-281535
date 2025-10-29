const express = require('express');
const router = express.Router();

// Health check route
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API info route
router.get('/', (req, res) => {
  res.json({
    message: 'Backend API is running!',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      users: '/api/users',
      auth: '/api/auth',
    },
  });
});

module.exports = router;
