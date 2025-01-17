// eslint-disable-next-line no-undef
module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true, // Added node environment
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'airbnb',
      'airbnb/hooks',
      "plugin:prettier/recommended"
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: [
      'react',
      '@typescript-eslint',
    ],
    rules: {
      'react/react-in-jsx-scope': 'off',
      "prettier/prettier": "error"
      // Add custom rules here
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  };
