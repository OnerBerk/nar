import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {VitePWA} from 'vite-plugin-pwa';
import * as path from 'node:path';

export default defineConfig(({command}) => ({
  plugins: [
    ...(command === 'build'
      ? [
          VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            workbox: {
              globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
            },
          }),
        ]
      : []),
    react(),
  ],
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));
