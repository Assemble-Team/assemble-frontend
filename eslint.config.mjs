import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import boundaries from 'eslint-plugin-boundaries';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-config-prettier';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // FSD 규칙
  {
    plugins: {
      boundaries,
      import: importPlugin,
    },
    settings: {
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/*' },
        { type: 'widgets', pattern: 'src/widgets/*' },
        { type: 'features', pattern: 'src/features/*' },
        { type: 'entities', pattern: 'src/entities/*' },
        { type: 'shared', pattern: 'src/shared/*' },
      ],
    },
    rules: {
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: 'shared', allow: ['shared'] },
            { from: 'entities', allow: ['shared', 'entities'] },
            { from: 'features', allow: ['shared', 'entities', 'features'] },
            {
              from: 'widgets',
              allow: ['shared', 'entities', 'features', 'widgets'],
            },
            {
              from: 'app',
              allow: ['shared', 'entities', 'features', 'widgets'],
            },
          ],
        },
      ],
    },
  },

  // Prettier와 ESLint 충돌 제거
  prettier,

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
