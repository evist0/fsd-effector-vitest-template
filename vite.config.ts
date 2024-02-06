import path from 'path';
import { defineConfig, type UserConfig } from 'vite';

import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export const DEFAULT_CONFIG: UserConfig = {
  plugins: [
    react({
      plugins: [
        [
          'effector-swc-plugin',
          {
            factories: ['@withease/factories'],
          },
        ],
      ],
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
};

export default defineConfig(DEFAULT_CONFIG);
