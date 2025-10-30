const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { UserSession } = require('../models');
const passwordUtils = require('../utils/password');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '30d'; // 30 days

const sessionService = {
  // Generate JWT token
  generateToken: (user) => {
    const payload = {
      userId: user.id,
      email: user.email,
    };
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
  },

  // Create a new session
  createSession: async (user, req) => {
    try {
      // Generate token
      const token = sessionService.generateToken(user);

      // Hash token for storage
      const tokenHash = passwordUtils.hashToken(token);

      // Calculate expiration date
      const decoded = jwt.decode(token);
      const expiresAt = new Date(decoded.exp * 1000);

      // Get user agent and IP from request
      const userAgent = req?.get?.('user-agent') || req?.headers?.['user-agent'] || null;
      const ipAddress = req?.ip || 
                       req?.connection?.remoteAddress || 
                       req?.socket?.remoteAddress ||
                       (req?.headers && (req.headers['x-forwarded-for']?.split(',')[0] || req.headers['x-real-ip'])) ||
                       null;

      // Create session in database
      const session = await UserSession.create({
        user_id: user.id,
        token_hash: tokenHash,
        expires_at: expiresAt,
        is_active: true,
        user_agent: userAgent,
        ip_address: ipAddress,
      });

      return {
        token,
        sessionId: session.id,
        expiresAt,
      };
    } catch (error) {
      console.error('❌ sessionService.createSession error:', error);
      throw error;
    }
  },

  // Find session by token hash
  findSessionByToken: async (token) => {
    const tokenHash = passwordUtils.hashToken(token);
    const { User } = require('../models');
    const session = await UserSession.findOne({
      where: {
        token_hash: tokenHash,
        is_active: true,
      },
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    });

    if (!session) {
      return null;
    }

    // Check if session is expired
    if (new Date() > session.expires_at) {
      // Deactivate expired session
      await session.update({ is_active: false });
      return null;
    }

    return session;
  },

  // Verify token
  verifyToken: (token) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return null;
    }
  },

  // Deactivate session
  deactivateSession: async (token) => {
    const tokenHash = passwordUtils.hashToken(token);
    await UserSession.update(
      { is_active: false },
      {
        where: {
          token_hash: tokenHash,
        },
      }
    );
  },

  // Deactivate all sessions for a user
  deactivateAllUserSessions: async (userId) => {
    await UserSession.update(
      { is_active: false },
      {
        where: {
          user_id: userId,
        },
      }
    );
  },
};

module.exports = sessionService;

