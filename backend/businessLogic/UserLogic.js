const validation = {
  // Email validation
  isValidEmail: (email) => {
    if (!email || typeof email !== 'string') {
      return {
        isValid: false,
        error: 'Email is required and must be a string',
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, error: 'Please provide a valid email address' };
    }

    return { isValid: true };
  },

  // Password validation
  isValidPassword: (password) => {
    if (!password || typeof password !== 'string') {
      return {
        isValid: false,
        error: 'Password is required and must be a string',
      };
    }

    if (password.length < 6) {
      return {
        isValid: false,
        error: 'Password must be at least 6 characters long',
      };
    }

    if (password.length > 128) {
      return {
        isValid: false,
        error: 'Password must be less than 128 characters',
      };
    }

    // Check for at least one letter and one number
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (!hasLetter) {
      return {
        isValid: false,
        error: 'Password must contain at least one letter',
      };
    }

    if (!hasNumber) {
      return {
        isValid: false,
        error: 'Password must contain at least one number',
      };
    }

    return { isValid: true };
  },

  // Name validation
  isValidName: (name) => {
    if (!name || typeof name !== 'string') {
      return { isValid: false, error: 'Name is required and must be a string' };
    }

    const trimmedName = name.trim();

    if (trimmedName.length < 2) {
      return {
        isValid: false,
        error: 'Name must be at least 2 characters long',
      };
    }

    if (trimmedName.length > 50) {
      return { isValid: false, error: 'Name must be less than 50 characters' };
    }

    // Check for valid characters (letters, spaces, hyphens, apostrophes)
    const nameRegex = /^[a-zA-Z\s\-']+$/;
    if (!nameRegex.test(trimmedName)) {
      return {
        isValid: false,
        error:
          'Name can only contain letters, spaces, hyphens, and apostrophes',
      };
    }

    return { isValid: true, sanitized: trimmedName };
  },

  // Date of birth validation
  isValidDateOfBirth: (dateOfBirth) => {
    if (!dateOfBirth || typeof dateOfBirth !== 'string') {
      return {
        isValid: false,
        error: 'Date of birth is required and must be a string',
      };
    }

    const date = new Date(dateOfBirth);
    const today = new Date();

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return {
        isValid: false,
        error: 'Please provide a valid date of birth (YYYY-MM-DD format)',
      };
    }

    // Check if date is in the future
    if (date > today) {
      return { isValid: false, error: 'Date of birth cannot be in the future' };
    }

    // Check if person is at least 13 years old (basic age requirement)
    const ageInYears = (today - date) / (1000 * 60 * 60 * 24 * 365.25);
    if (ageInYears < 13) {
      return {
        isValid: false,
        error: 'You must be at least 13 years old to register',
      };
    }

    // Check if person is not too old (reasonable limit)
    if (ageInYears > 120) {
      return { isValid: false, error: 'Please provide a valid date of birth' };
    }

    return { isValid: true, sanitized: dateOfBirth };
  },

  // Gender validation
  isValidGender: (gender) => {
    if (!gender || typeof gender !== 'string') {
      return {
        isValid: false,
        error: 'Gender is required and must be a string',
      };
    }

    const validGenders = ['male', 'female', 'other', 'prefer-not-to-say'];
    const normalizedGender = gender.toLowerCase().trim();

    if (!validGenders.includes(normalizedGender)) {
      return {
        isValid: false,
        error: 'Gender must be one of: male, female, other, prefer-not-to-say',
      };
    }

    return { isValid: true, sanitized: normalizedGender };
  },

  // Validate user registration data
  validateUserRegistration: (userData) => {
    const errors = [];
    const sanitizedData = {};

    // Validate email (required)
    const emailValidation = validation.isValidEmail(userData.email);
    if (!emailValidation.isValid) {
      errors.push(emailValidation.error);
    } else {
      sanitizedData.email = userData.email.toLowerCase().trim();
    }

    // Validate password (required)
    const passwordValidation = validation.isValidPassword(userData.password);
    if (!passwordValidation.isValid) {
      errors.push(passwordValidation.error);
    } else {
      // Store password in sanitizedData for userService to use
      sanitizedData.password = userData.password;
    }

    // Validate name (optional)
    if (userData.name) {
      const nameValidation = validation.isValidName(userData.name);
      if (!nameValidation.isValid) {
        errors.push(nameValidation.error);
      } else {
        sanitizedData.name = nameValidation.sanitized;
      }
    }

    // Validate date of birth (optional)
    if (userData.dateOfBirth) {
      const dobValidation = validation.isValidDateOfBirth(userData.dateOfBirth);
      if (!dobValidation.isValid) {
        errors.push(dobValidation.error);
      } else {
        sanitizedData.dateOfBirth = dobValidation.sanitized;
      }
    }

    // Validate gender (optional)
    if (userData.gender) {
      const genderValidation = validation.isValidGender(userData.gender);
      if (!genderValidation.isValid) {
        errors.push(genderValidation.error);
      } else {
        sanitizedData.gender = genderValidation.sanitized;
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedData,
    };
  },

  // Validate user login data
  validateUserLogin: (loginData) => {
    const errors = [];
    const sanitizedData = {};

    // Validate email
    const emailValidation = validation.isValidEmail(loginData.email);
    if (!emailValidation.isValid) {
      errors.push(emailValidation.error);
    } else {
      sanitizedData.email = loginData.email.toLowerCase().trim();
    }

    // Validate password (basic check for login)
    if (!loginData.password || typeof loginData.password !== 'string') {
      errors.push('Password is required');
    } else if (loginData.password.length === 0) {
      errors.push('Password cannot be empty');
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedData,
    };
  },

  // Validate user update data (partial validation)
  validateUserUpdate: (updateData) => {
    const errors = [];
    const sanitizedData = {};

    // Validate name if provided
    if (updateData.name !== undefined) {
      const nameValidation = validation.isValidName(updateData.name);
      if (!nameValidation.isValid) {
        errors.push(nameValidation.error);
      } else {
        sanitizedData.name = nameValidation.sanitized;
      }
    }

    // Validate email if provided
    if (updateData.email !== undefined) {
      const emailValidation = validation.isValidEmail(updateData.email);
      if (!emailValidation.isValid) {
        errors.push(emailValidation.error);
      } else {
        sanitizedData.email = emailValidation.email.toLowerCase().trim();
      }
    }

    // Validate date of birth if provided
    if (updateData.dateOfBirth !== undefined) {
      const dobValidation = validation.isValidDateOfBirth(
        updateData.dateOfBirth
      );
      if (!dobValidation.isValid) {
        errors.push(dobValidation.error);
      } else {
        sanitizedData.dateOfBirth = dobValidation.sanitized;
      }
    }

    // Validate gender if provided
    if (updateData.gender !== undefined) {
      const genderValidation = validation.isValidGender(updateData.gender);
      if (!genderValidation.isValid) {
        errors.push(genderValidation.error);
      } else {
        sanitizedData.gender = genderValidation.sanitized;
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedData,
    };
  },
};

module.exports = validation;
