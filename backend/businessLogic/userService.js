const bcrypt = require('bcryptjs');
const { User } = require('../models');
const validation = require('./validation');

const userService = {
  // Create a new user
  createUser: async (userData) => {
    try {
      // Validate input data
      const validationResult = validation.validateUserRegistration(userData);
      if (!validationResult.isValid) {
        throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
      }

      // Check if user already exists
      const existingUser = await userService.findUserByEmail(userData.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Check password strength
      const passwordStrength = require('../utils/password').checkPasswordStrength(userData.password);
      if (passwordStrength.strength === 'weak') {
        throw new Error(`Password is too weak: ${passwordStrength.feedback.join(', ')}`);
      }

      // Hash password
      const saltRounds = 12;
      const passwordSalt = await bcrypt.genSalt(saltRounds);
      const passwordHash = await bcrypt.hash(userData.password, passwordSalt);

      // Create user
      const user = await User.create({
        name: validationResult.sanitizedData.name,
        email: validationResult.sanitizedData.email.toLowerCase().trim(),
        password_hash: passwordHash,
        password_salt: passwordSalt,
        date_of_birth: validationResult.sanitizedData.dateOfBirth,
        gender: validationResult.sanitizedData.gender
      });

      return {
        user: userService.sanitizeUser(user),
        passwordStrength: passwordStrength.strength
      };
    } catch (error) {
      throw error;
    }
  },

  // Find user by email
  findUserByEmail: async (email) => {
    try {
      const user = await User.findOne({
        where: {
          email: email.toLowerCase().trim()
        }
      });
      return user;
    } catch (error) {
      throw error;
    }
  },

  // Find user by ID
  findUserById: async (id) => {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (error) {
      throw error;
    }
  },

  // Get all users with pagination and search
  getAllUsers: async (options = {}) => {
    try {
      const { page = 1, limit = 10, search } = options;
      const offset = (page - 1) * limit;
      
      let whereClause = {};
      
      // Add search functionality
      if (search) {
        const { Op } = require('sequelize');
        whereClause = {
          [Op.or]: [
            { name: { [Op.iLike]: `%${search}%` } },
            { email: { [Op.iLike]: `%${search}%` } }
          ]
        };
      }
      
      const { count, rows: users } = await User.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['created_at', 'DESC']]
      });
      
      return {
        users: users.map(user => userService.sanitizeUser(user)),
        pagination: {
          current_page: parseInt(page),
          total_pages: Math.ceil(count / limit),
          total_items: count,
          items_per_page: parseInt(limit)
        }
      };
    } catch (error) {
      throw error;
    }
  },

  // Update user
  updateUser: async (id, updateData) => {
    try {
      // Validate update data
      const validationResult = validation.validateUserUpdate(updateData);
      if (!validationResult.isValid) {
        throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
      }

      // Find user
      const user = await userService.findUserById(id);
      if (!user) {
        throw new Error('User not found');
      }

      // Check if email is being updated and if it already exists
      if (updateData.email && updateData.email !== user.email) {
        const existingUser = await userService.findUserByEmail(updateData.email);
        if (existingUser) {
          throw new Error('User with this email already exists');
        }
      }

      // Update user
      const updatedUser = await user.update(validationResult.sanitizedData);
      
      return userService.sanitizeUser(updatedUser);
    } catch (error) {
      throw error;
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      const user = await userService.findUserById(id);
      if (!user) {
        throw new Error('User not found');
      }

      await user.destroy();
      return true;
    } catch (error) {
      throw error;
    }
  },

  // Validate password
  validatePassword: async (user, password) => {
    try {
      return await bcrypt.compare(password, user.password_hash);
    } catch (error) {
      throw error;
    }
  },

  // Update password
  updatePassword: async (user, newPassword) => {
    try {
      // Check password strength
      const passwordStrength = require('../utils/password').checkPasswordStrength(newPassword);
      if (passwordStrength.strength === 'weak') {
        throw new Error(`Password is too weak: ${passwordStrength.feedback.join(', ')}`);
      }

      // Hash new password
      const saltRounds = 12;
      const passwordSalt = await bcrypt.genSalt(saltRounds);
      const passwordHash = await bcrypt.hash(newPassword, passwordSalt);

      // Update user
      await user.update({
        password_hash: passwordHash,
        password_salt: passwordSalt
      });

      return passwordStrength.strength;
    } catch (error) {
      throw error;
    }
  },

  // Sanitize user data (remove sensitive information)
  sanitizeUser: (user) => {
    if (!user) return null;
    
    const userData = user.toJSON ? user.toJSON() : user;
    const sanitized = { ...userData };
    
    // Remove sensitive data
    delete sanitized.password_hash;
    delete sanitized.password_salt;
    
    // Add calculated fields
    sanitized.age = userService.calculateAge(userData.date_of_birth);
    
    return sanitized;
  },

  // Calculate age from date of birth
  calculateAge: (dateOfBirth) => {
    if (!dateOfBirth) return null;
    
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  },

  // Activate user
  activateUser: async (id) => {
    try {
      const user = await userService.findUserById(id);
      if (!user) {
        throw new Error('User not found');
      }

      await user.update({ is_active: true });
      return userService.sanitizeUser(user);
    } catch (error) {
      throw error;
    }
  },

  // Deactivate user
  deactivateUser: async (id) => {
    try {
      const user = await userService.findUserById(id);
      if (!user) {
        throw new Error('User not found');
      }

      await user.update({ is_active: false });
      return userService.sanitizeUser(user);
    } catch (error) {
      throw error;
    }
  },

  // Verify user
  verifyUser: async (id) => {
    try {
      const user = await userService.findUserById(id);
      if (!user) {
        throw new Error('User not found');
      }

      await user.update({ is_verified: true });
      return userService.sanitizeUser(user);
    } catch (error) {
      throw error;
    }
  }
};

module.exports = userService;
