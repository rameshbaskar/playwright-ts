import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  js.configs.recommended,
	'prettier',
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        Buffer: 'readonly',
        global: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      prettier,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...prettier.configs.recommended.rules,

      // TypeScript specific rules
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',

      // General rules
      'no-console': 'off',
      'prefer-const': 'error',
      'no-var': 'error',

      // Prettier integration
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['tests/**/*.{js,ts}', '**/*.spec.{js,ts}', '**/*.test.{js,ts}'],
    plugins: {
      playwright,
    },
    rules: {
      ...playwright.configs.recommended.rules,

      // Allow console in tests for debugging
      'no-console': 'off',

      // Playwright specific rules
      'playwright/expect-expect': 'off',
      'playwright/missing-playwright-await': 'error',
      'playwright/no-networkidle': 'error',
      'playwright/no-skipped-test': 'off',
      'playwright/valid-expect': 'off',
    },
  },
  {
    files: ['scripts/**/*.{js,ts}'],
    rules: {
      // Allow console in scripts
      'no-console': 'off',
    },
  },
  {
    ignores: ['node_modules/', 'dist/', 'build/', '*.config.js', '.husky/', 'playwright-report/', 'test-results/'],
  },
  prettierConfig,
];
