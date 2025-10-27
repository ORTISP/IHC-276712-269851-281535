// Validaciones manuales y sanitización para Menus, MenuDay, Meal y MealRecipe
const allowedMenuTypes = ['daily', 'weekly', 'monthly'];
const allowedMealTypes = ['breakfast', 'lunch', 'snack', 'dinner'];

const getMaxDaysForType = (type) => {
  if (type === 'daily') return 1;
  if (type === 'weekly') return 7;
  if (type === 'monthly') return 30;
  return null;
};

const sanitizeString = (v) => (typeof v === 'string' ? v.trim() : v);

module.exports = {
  validateMenuCreation: (data) => {
    const errors = [];
    const sanitized = {};

    if (!data || typeof data !== 'object') {
      errors.push('menu data is required');
      return { isValid: false, errors, sanitized: null };
    }

    // name
    if (!data.name) {
      errors.push('name is required');
    } else {
      sanitized.name = sanitizeString(data.name);
      if (sanitized.name.length < 1) errors.push('name cannot be empty');
    }

    // type
    if (!data.type) {
      errors.push('type is required');
    } else if (!allowedMenuTypes.includes(data.type)) {
      errors.push(`type must be one of: ${allowedMenuTypes.join(', ')}`);
    } else {
      sanitized.type = data.type;
    }

    // is_public
    sanitized.is_public = Boolean(data.is_public);

    // user_id
    if (data.user_id === undefined || data.user_id === null) {
      errors.push('user_id is required');
    } else {
      sanitized.user_id = Number(data.user_id);
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitized,
    };
  },

  validateDayCreation: (menuType, dayData) => {
    const errors = [];
    const sanitized = {};

    const max = getMaxDaysForType(menuType);
    if (!max) {
      errors.push('invalid menu type for day validation');
      return { isValid: false, errors, sanitized: null };
    }

    if (dayData === undefined || dayData === null) {
      errors.push('day data is required');
      return { isValid: false, errors, sanitized: null };
    }

    const dayNumber = Number(dayData.day_number);
    if (!Number.isInteger(dayNumber) || dayNumber < 1 || dayNumber > max) {
      errors.push(`day_number must be an integer between 1 and ${max}`);
    } else {
      sanitized.day_number = dayNumber;
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitized,
    };
  },

  validateMealCreation: (mealData) => {
    const errors = [];
    const sanitized = {};

    if (!mealData || typeof mealData !== 'object') {
      errors.push('meal data is required');
      return { isValid: false, errors, sanitized: null };
    }

    if (!mealData.type) {
      errors.push('meal type is required');
    } else if (!allowedMealTypes.includes(mealData.type)) {
      errors.push(`meal type must be one of: ${allowedMealTypes.join(', ')}`);
    } else {
      sanitized.type = mealData.type;
    }

    // optional fields could be sanitized here
    return {
      isValid: errors.length === 0,
      errors,
      sanitized,
    };
  },

  validateMealRecipeCreation: (data) => {
    const errors = [];
    const sanitized = {};

    if (!data || typeof data !== 'object') {
      errors.push('data is required');
      return { isValid: false, errors, sanitized: null };
    }

    if (!data.meal_id || !Number.isInteger(Number(data.meal_id))) {
      errors.push('meal_id is required and must be an integer');
    } else {
      sanitized.meal_id = Number(data.meal_id);
    }

    if (!data.recipe_id || !Number.isInteger(Number(data.recipe_id))) {
      errors.push('recipe_id is required and must be an integer');
    } else {
      sanitized.recipe_id = Number(data.recipe_id);
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitized,
    };
  },

  // utilitarios exportados
  allowedMenuTypes,
  allowedMealTypes,
  getMaxDaysForType,
};
