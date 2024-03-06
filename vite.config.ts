import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      plugins: [['effector-swc-plugin', {}]],
    }),
  ],
  server: {
    hmr: false,
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      'test-utils': path.resolve(__dirname, './.vitest/test-utils'),
      // https://github.com/mswjs/msw-storybook-addon/issues/131
      'msw/native': path.resolve(__dirname, './node_modules/msw/lib/native/index.mjs'),
    },
  },
});
