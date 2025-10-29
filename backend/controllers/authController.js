const validation = require('../businessLogic/UserLogic');
const passwordUtils = require('../utils/password');
const userService = require('../services/userService');

const authController = {
  // User login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validate login data using validation layer
      const validationResult = validation.validateUserLogin({
        email,
        password,
      });

      if (!validationResult.isValid) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validationResult.errors,
        });
      }

      // TODO: Add actual authentication logic here
      // - Validate user credentials against database
      // - Check if user exists and password is correct
      // - Use passwordUtils.verifyPassword(password, storedHash, storedSalt)
      // - Generate JWT token
      // - Return user data and token

      // Placeholder response
      const user = {
        id: 'user-id-placeholder',
        email: validationResult.sanitizedData.email,
        name: 'User Name',
        createdAt: new Date().toISOString(),
      };

      const token = 'jwt-token-placeholder';

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user,
          token,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error during login',
      });
    }
  },

  // User registration
  register: async (req, res) => {
    try {
      const { email, password, name, dateOfBirth, gender } = req.body;

      // Validate registration data using validation layer
      // Only email and password are required
      const validationResult = validation.validateUserRegistration({
        email,
        password,
        name, // Optional
        dateOfBirth, // Optional
        gender, // Optional
      });

      if (!validationResult.isValid) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validationResult.errors,
        });
      }

      // Check password strength
      const passwordStrength = passwordUtils.checkPasswordStrength(password);

      if (passwordStrength.strength === 'weak') {
        return res.status(400).json({
          success: false,
          error: 'Password is too weak',
          details: passwordStrength.feedback,
        });
      }

      // Create user using userService
      const result = await userService.createUser({
        name: validationResult.sanitizedData.name,
        email: validationResult.sanitizedData.email,
        password: validationResult.sanitizedData.password,
        dateOfBirth: validationResult.sanitizedData.dateOfBirth,
        gender: validationResult.sanitizedData.gender,
      });

      // TODO: Generate JWT token
      const token = 'jwt-token-placeholder';

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: result.user,
          token,
          passwordStrength: result.passwordStrength,
        },
      });
    } catch (error) {
      console.error('❌ Registration error:', error);
      
      // Handle specific error cases
      if (error.message.includes('already exists')) {
        return res.status(409).json({
          success: false,
          error: error.message || 'User with this email already exists',
        });
      }
      
      if (error.message.includes('Validation failed') || error.message.includes('Password is too weak')) {
        return res.status(400).json({
          success: false,
          error: error.message,
        });
      }
      
      // Default to 500 for unexpected errors
      res.status(500).json({
        success: false,
        error: 'Internal server error during registration',
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      });
    }
  },

  // Simple test endpoint
  test: async (req, res) => {
    try {
      const { User } = require('../models');
      const userCount = await User.count();
      res.json({ success: true, userCount, message: 'Test endpoint working' });
    } catch (error) {
      console.error('Test error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // User logout
  logout: async (req, res) => {
    try {
      // TODO: Add actual logout logic here
      // - Invalidate JWT token
      // - Clear any server-side sessions

      res.json({
        success: true,
        message: 'Logout successful',
      });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error during logout',
      });
    }
  },

  // Get current user profile
  getProfile: async (req, res) => {
    try {
      // TODO: Add actual profile logic here
      // - Verify JWT token
      // - Get user data from database

      const user = {
        id: 'user-id',
        email: 'user@example.com',
        name: 'User Name',
        createdAt: new Date().toISOString(),
      };

      res.json({
        success: true,
        data: {
          user,
        },
      });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error while fetching profile',
      });
    }
  },
};

module.exports = authController;
