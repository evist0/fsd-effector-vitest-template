const disables = {
  'react/react-in-jsx-scope': 0,
  'jest/no-deprecated-functions': 0,
  'jest/require-hook': 'off',
  'jest/require-top-level-describe': 'off',
  'jest/prefer-expect-assertions': 'off',
};

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  processor: '@feature-sliced/messages/fs',
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {},
      typescript: {},
    },
    clsxOptions: {
      myclsx: 'cn',
    },
  },
  reportUnusedDisableDirectives: true,
  plugins: [
    'import',
    'react',
    '@typescript-eslint',
    'simple-import-sort',
    'jest',
    '@stylistic/migrate',
    '@stylistic/ts',
    '@stylistic/jsx',
    '@feature-sliced/eslint-plugin-messages',
    'effector',
  ],
  extends: [
    '@feature-sliced/eslint-config/rules/public-api',
    '@feature-sliced/eslint-config/rules/layers-slices',
    'plugin:import/recommended',
    'plugin:clsx/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jest/all',
    'plugin:effector/recommended',
    'plugin:effector/scope',
    'plugin:effector/react',
    'plugin:effector/future',
    'plugin:effector/patronum',
    'plugin:storybook/recommended',
  ],
  rules: {
    ...disables,
    // General
    'no-restricted-syntax': [
      'error',
      {
        selector: ':matches(ExportAllDeclaration)',
        message: 'Export only modules you need.',
      },
    ],
    'no-restricted-imports': ['error', 'vitest'],
    'no-warning-comments': ['error', { terms: ['todo', 'fixme'], location: 'anywhere' }],
    'max-params': ['error', 4],
    'no-console': 'error',
    // TS
    '@stylistic/ts/semi': ['error', 'always'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'all',
        ignoreRestSiblings: false,
        argsIgnorePattern: '^_',
      },
    ],
    '@stylistic/ts/member-delimiter-style': 'error',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        fixStyle: 'inline-type-imports',
        disallowTypeAnnotations: false,
      },
    ],
    '@typescript-eslint/consistent-type-exports': [
      'error',
      {
        fixMixedExportsWithInlineTypeSpecifier: true,
      },
    ],
    // Import
    'import/no-extraneous-dependencies': [
      'error',
      {
        peerDependencies: false,
        devDependencies: false,
        optionalDependencies: false,
        bundledDependencies: false,
      },
    ],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^react', '^\\w', '^@'],
          ['^~/app'],
          ['^~/pages'],
          ['^~/widgets'],
          ['^~/features'],
          ['^~/entities'],
          ['^~/shared'],
          ['^\\.\\./'],
          ['^\\./'],
          ['^.+\\.types$', '^.+\\.css$'],
        ],
      },
    ],
    // Tests
    'jest/consistent-test-it': ['error', { fn: 'it' }],
    // Effector
    'effector/no-watch': 'error',
    // Stylistic migration
    '@stylistic/migrate/migrate-js': 'error',
    '@stylistic/migrate/migrate-ts': 'error',
  },
  overrides: [
    // Configs
    {
      files: [
        '.eslintrc.cjs',
        '.prettierrc.cjs',
        'postcss.config.cjs',
        'tailwind.config.cjs',
        'vite.config.ts',
        'vitest.config.ts',
      ],
      parserOptions: {
        project: 'tsconfig.node.json',
      },
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
          },
        ],
      },
    },
    // Tests
    {
      files: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
          },
        ],
        'effector/no-useless-methods': 'off',
      },
    },
    // Stories
    {
      files: ['**/__stories__/*.stories.@(js|jsx|mjs|ts|tsx)'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
          },
        ],
        'effector/no-useless-methods': 'off',
      },
    },
  ],
};
