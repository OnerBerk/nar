const pluginTs = require('@typescript-eslint/eslint-plugin');
const parserTs = require('@typescript-eslint/parser');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  {
    files: ['**/*.ts'],
    ignores: ['**/dist/**', '**/dev-dist/**', '**/node_modules/**'],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        project: ['./apps/*/tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      '@typescript-eslint': pluginTs,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];
