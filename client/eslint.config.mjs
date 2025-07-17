import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'plugin:@typescript-eslint/recommended',
      'eslint-config-prettier',
      'prettier',
    ],
    plugins: ['import'],
    rules: {
      // General rules
      'no-console': 'warn',
      eqeqeq: 'error',

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',

      // React rules
      'react/no-unknown-property': 'warn',
      'react/jsx-uses-vars': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          shorthandFirst: true,
          reservedFirst: true,
        },
      ],

      'import/no-duplicates': 'warn',
    },
  }),
];

export default eslintConfig;
