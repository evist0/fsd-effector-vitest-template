const disables = {
  'react/react-in-jsx-scope': 0,
};

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
      typescript: {},
    },
    'import/ignore': ['node_modules'],
  },
  plugins: ['import', 'react', '@typescript-eslint', 'simple-import-sort', 'vitest'],
  extends: [
    'plugin:import/recommended',
    'plugin:clsx/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:vitest/recommended',
  ],
  rules: {
    ...disables,
    // General
    'no-warning-comments': ['error', { terms: ['todo', 'fixme'], location: 'anywhere' }],
    'max-params': ['error', 4],
    'no-console': 'error',
    // TS
    semi: 'off',
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'all',
        ignoreRestSiblings: false,
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/member-delimiter-style': 'error',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        disallowTypeAnnotations: false,
        fixStyle: 'inline-type-imports',
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
          ['^react', '^\\w'],
          ['^~'],
          ['^\\.\\./'],
          ['^\\./'],
          ['^.+\\.types$', '^.+\\.css$'],
        ],
      },
    ],
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
      parserOptions: {},
      extends: [],
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
      },
    },
  ],
};
