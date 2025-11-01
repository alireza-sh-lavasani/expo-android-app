// eslint.config.js
// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  // Base Expo config (includes React, TypeScript, etc.)
  ...expoConfig,

  // Prettier integration
  eslintPluginPrettierRecommended,

  // Custom overrides and ignores
  {
    ignores: ['dist/*'],
    rules: {
      // Your custom rules
      'prettier/prettier': 'warn',
      'react-native/no-inline-styles': 'off',
      'react-native/no-color-literals': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]);