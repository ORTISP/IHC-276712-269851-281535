module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    indent: 'off', // Let Prettier handle indentation
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-console': 'off', // Allow console.log in backend
    'no-useless-catch': 'off', // Allow try/catch blocks that rethrow errors
    'no-useless-escape': 'warn', // Warn but don't error on escape characters
  },
};
