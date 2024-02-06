import { defineConfig } from 'vitest/config';

import { DEFAULT_CONFIG } from './vite.config';

// https://vitest.dev/config/
export default defineConfig({
  ...DEFAULT_CONFIG,
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: ['.vitest/setup.ts'],
  },
});
