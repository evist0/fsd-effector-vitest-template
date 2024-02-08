import { configDefaults, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';

// https://vitest.dev/config/
export default mergeConfig(viteConfig, {
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: ['.vitest/setup.ts'],
    typecheck: {
      enabled: true,
    },
    coverage: {
      provider: 'istanbul',
      exclude: [...configDefaults.coverage.exclude, '*.config.cjs'],
    },
  },
});
