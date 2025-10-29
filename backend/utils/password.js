const crypto = require('crypto');

const passwordUtils = {
  // Generate a random salt
  generateSalt: () => {
    return crypto.randomBytes(32).toString('hex');
  },

  // Hash a password with a given salt
  hashPassword: (password, salt) => {
    return crypto
      .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
      .toString('hex');
  },

  // Hash a password with a new random salt
  hashPasswordWithSalt: (password) => {
    const salt = passwordUtils.generateSalt();
    const hash = passwordUtils.hashPassword(password, salt);
    return {
      hash,
      salt,
    };
  },

  // Verify a password against a hash and salt
  verifyPassword: (password, hash, salt) => {
    const passwordHash = passwordUtils.hashPassword(password, salt);
    return passwordHash === hash;
  },

  // Check password strength
  checkPasswordStrength: (password) => {
    let score = 0;
    const feedback = [];

    if (password.length >= 8) score += 1;
    else feedback.push('Use at least 8 characters');

    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Include lowercase letters');

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Include uppercase letters');

    if (/\d/.test(password)) score += 1;
    else feedback.push('Include numbers');

    if (/[!@#$%^&*()_+=[\]{}|;:,.<>?]/.test(password)) score += 1;
    else feedback.push('Include special characters');

    let strength;
    if (score <= 2) strength = 'weak';
    else if (score <= 3) strength = 'fair';
    else if (score <= 4) strength = 'good';
    else strength = 'strong';

    return {
      score,
      strength,
      feedback,
    };
  },

  // Generate a password reset token
  generatePasswordResetToken: () => {
    return crypto.randomBytes(32).toString('hex');
  },

  // Generate a verification token
  generateVerificationToken: () => {
    return crypto.randomBytes(32).toString('hex');
  },

  // Hash a token for storage
  hashToken: (token) => {
    return crypto.createHash('sha256').update(token).digest('hex');
  },

  // Verify a token against its hash
  verifyToken: (token, hash) => {
    const tokenHash = passwordUtils.hashToken(token);
    return tokenHash === hash;
  },
};

module.exports = passwordUtils;
