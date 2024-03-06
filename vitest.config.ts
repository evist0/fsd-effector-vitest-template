import { configDefaults, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';

const coverageReporter = process.env.GITHUB_ACTIONS
  ? ['json', 'json-summary']
  : configDefaults.coverage.reporter;

// https://vitest.dev/config/
export default mergeConfig(viteConfig, {
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: ['.vitest/setup.ts'],
    coverage: {
      provider: 'v8',
      reportOnFailure: true,
      reporter: coverageReporter,
      exclude: [...configDefaults.coverage.exclude, '*.config.cjs'],
    },
  },
});
