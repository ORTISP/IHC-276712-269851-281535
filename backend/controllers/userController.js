const userService = require('../businessLogic/userService');

const userController = {
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const { page = 1, limit = 10, search } = req.query;

      const result = await userService.getAllUsers({
        page: parseInt(page),
        limit: parseInt(limit),
        search,
      });

      res.json({
        success: true,
        message: 'Users retrieved successfully',
        data: result,
      });
    } catch (error) {
      console.error('Get users error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error while fetching users',
      });
    }
  },

  // Get user by ID
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'User ID is required',
        });
      }

      const user = await userService.findUserById(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
        });
      }

      res.json({
        success: true,
        message: 'User retrieved successfully',
        data: {
          user: userService.sanitizeUser(user),
        },
      });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error while fetching user',
      });
    }
  },

  // Create new user
  createUser: async (req, res) => {
    try {
      const { name, email, password, dateOfBirth, gender } = req.body;

      const result = await userService.createUser({
        name,
        email,
        password,
        dateOfBirth,
        gender,
      });

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: result,
      });
    } catch (error) {
      console.error('Create user error:', error);

      // Handle validation errors
      if (error.message.includes('Validation failed')) {
        return res.status(400).json({
          success: false,
          error: error.message,
        });
      }

      // Handle duplicate email errors
      if (error.message.includes('already exists')) {
        return res.status(409).json({
          success: false,
          error: error.message,
        });
      }

      // Handle password strength errors
      if (error.message.includes('too weak')) {
        return res.status(400).json({
          success: false,
          error: error.message,
        });
      }

      res.status(500).json({
        success: false,
        error: 'Internal server error while creating user',
      });
    }
  },

  // Update user
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'User ID is required',
        });
      }

      const updatedUser = await userService.updateUser(id, updateData);

      res.json({
        success: true,
        message: 'User updated successfully',
        data: {
          user: updatedUser,
        },
      });
    } catch (error) {
      console.error('Update user error:', error);

      // Handle validation errors
      if (error.message.includes('Validation failed')) {
        return res.status(400).json({
          success: false,
          error: error.message,
        });
      }

      // Handle user not found errors
      if (error.message.includes('not found')) {
        return res.status(404).json({
          success: false,
          error: error.message,
        });
      }

      // Handle duplicate email errors
      if (error.message.includes('already exists')) {
        return res.status(409).json({
          success: false,
          error: error.message,
        });
      }

      res.status(500).json({
        success: false,
        error: 'Internal server error while updating user',
      });
    }
  },

  // Delete user
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'User ID is required',
        });
      }

      await userService.deleteUser(id);

      res.json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      console.error('Delete user error:', error);

      // Handle user not found errors
      if (error.message.includes('not found')) {
        return res.status(404).json({
          success: false,
          error: error.message,
        });
      }

      res.status(500).json({
        success: false,
        error: 'Internal server error while deleting user',
      });
    }
  },
};

module.exports = userController;
