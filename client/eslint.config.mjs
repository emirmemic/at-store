import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';

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
      'react/jsx-uses-vars': 'warn',
      'react/react-in-jsx-scope': 'off',

      // Import Sorting
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-duplicates': 'warn',

      // This rule enforces the use of `next-intl`'s routing implementation (`@/i18n/routing`) instead of `next/link` and `next/navigation`. `next-intl` provides built-in locale handling, ensuring that navigation is always language-aware. Using `next/link` or `next/navigation` directly may result in incorrect locale-based navigation.
      'no-restricted-imports': [
        'warn',
        {
          name: 'next/link',
          message: 'Please import from `@/i18n/routing` instead.',
        },
        {
          name: 'next/navigation',
          importNames: [
            'redirect',
            'permanentRedirect',
            'useRouter',
            'usePathname',
          ],
          message: 'Please import from `@/i18n/routing` instead.',
        },
      ],
    },
  }),
];

export default eslintConfig;
