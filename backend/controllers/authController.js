const validation = require('../businessLogic/UserLogic');
const passwordUtils = require('../utils/password');

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
      const validationResult = validation.validateUserRegistration({
        email,
        password,
        name,
        dateOfBirth: dateOfBirth || '1990-01-01', // Default if not provided
        gender: gender || 'prefer-not-to-say', // Default if not provided
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

      // TODO: Add actual registration logic here
      // - Check if user already exists
      // - Hash password using passwordUtils.hashPasswordWithSalt(password)
      // - Save user to database
      // - Generate JWT token
      // - Return user data and token

      // Placeholder response
      const user = {
        id: 'new-user-id-placeholder',
        email: validationResult.sanitizedData.email,
        name: validationResult.sanitizedData.name,
        dateOfBirth: validationResult.sanitizedData.dateOfBirth,
        gender: validationResult.sanitizedData.gender,
        createdAt: new Date().toISOString(),
      };

      // Create user session
      const sessionService = require('../services/sessionService');
      const { User } = require('../models');
      const userWithId = await User.findByPk(result.user.id);
      const session = await sessionService.createSession(userWithId, req);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: result.user,
          token: session.token,
          sessionId: session.sessionId,
          expiresAt: session.expiresAt,
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

      if (
        error.message.includes('Validation failed') ||
        error.message.includes('Password is too weak')
      ) {
        return res.status(400).json({
          success: false,
          error: error.message,
        });
      }

      // Default to 500 for unexpected errors
      res.status(500).json({
        success: false,
        error: 'Internal server error during registration',
      });
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
