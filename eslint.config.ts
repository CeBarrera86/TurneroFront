import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import boundaries from 'eslint-plugin-boundaries';
import { defineConfig, globalIgnores } from 'eslint/config';

const reactHooksConfig = reactHooks.configs['recommended-latest'] as any;
const reactRefreshConfig = reactRefresh.configs.vite as any;
const tseslintPlugin = tseslint as any;
const boundariesPlugin = boundaries as any;

export default defineConfig([
  globalIgnores(['dist']),
  js.configs.recommended as any,
  reactHooksConfig,
  reactRefreshConfig,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': tseslintPlugin,
      boundaries: boundariesPlugin,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/**' },
        { type: 'app', pattern: 'src/main.tsx' },
        { type: 'features-pages', pattern: 'src/features/*/pages/**', capture: ['feature'] },
        { type: 'features-components', pattern: 'src/features/*/components/**', capture: ['feature'] },
        { type: 'features-hooks', pattern: 'src/features/*/hooks/**', capture: ['feature'] },
        { type: 'features-controllers', pattern: 'src/features/*/controllers/**', capture: ['feature'] },
        { type: 'features', pattern: 'src/features/**' },
        { type: 'shared', pattern: 'src/shared/**' },
        { type: 'data-services', pattern: 'src/data/services/**' },
        { type: 'data', pattern: 'src/data/**' },
        { type: 'domain', pattern: 'src/domain/**' },
        { type: 'assets', pattern: 'src/assets/**' },
      ],
      'boundaries/ignore': ['src/vite-env.d.ts'],
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'boundaries/no-unknown': 'error',
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: 'app',
              allow: [
                'app',
                'features-pages',
                'features-components',
                'features-hooks',
                'features',
                'shared',
                'data',
                'domain',
                'assets',
              ],
            },
            {
              from: 'features-pages',
              allow: [
                ['features-pages', { feature: '${from.feature}' }],
                ['features-components', { feature: '${from.feature}' }],
                ['features-controllers', { feature: '${from.feature}' }],
                'shared',
                'domain',
                'assets',
              ],
              disallow: ['data-services'],
              message: 'Pages no deben importar services directamente; usar controllers.',
            },
            {
              from: 'features-components',
              allow: [
                ['features-components', { feature: '${from.feature}' }],
                ['features-hooks', { feature: '${from.feature}' }],
                ['features-controllers', { feature: '${from.feature}' }],
                'shared',
                'domain',
                'assets',
              ],
              disallow: ['data-services'],
              message: 'Components no deben importar services directamente; usar controllers.',
            },
            {
              from: 'features-hooks',
              allow: [
                ['features-hooks', { feature: '${from.feature}' }],
                ['features-controllers', { feature: '${from.feature}' }],
                'data',
                'domain',
                'shared',
                'assets',
              ],
              disallow: ['data-services'],
              message: 'Hooks no deben importar services directamente; usar controllers.',
            },
            {
              from: 'features-hooks',
              disallow: [['features-controllers', { feature: '!${from.feature}' }]],
              message: 'Hooks no deben importar controllers de otros features.',
            },
            {
              from: 'features-controllers',
              allow: [
                ['features-controllers', { feature: '${from.feature}' }],
                'data-services',
                'data',
                'domain',
                'shared',
                'assets',
              ],
              disallow: [
                ['features-controllers', { feature: '!${from.feature}' }],
                'features-pages',
                'features-components',
                'features-hooks',
              ],
              message: 'Controllers no deben importar otros features ni UI/hooks; solo data/domain/shared/assets.',
            },
            {
              from: 'data-services',
              allow: ['domain', 'shared'],
            },
            {
              from: 'features',
              allow: ['features', 'features-components', 'features-hooks', 'features-controllers', 'shared', 'domain', 'assets'],
            },
            {
              from: 'shared',
              allow: ['shared', 'domain', 'assets'],
            },
            {
              from: 'data',
              allow: ['data', 'data-services', 'domain', 'shared'],
            },
            {
              from: 'domain',
              allow: ['domain'],
            },
            {
              from: 'assets',
              allow: ['assets'],
            },
          ],
        },
      ],
    },
  },
]);
