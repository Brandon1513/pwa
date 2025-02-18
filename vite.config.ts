import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'To-Do List',
        short_name: 'ToDo',
        start_url: './',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: './icons/icon192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './icons/icon512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        screenshots: [
          {
            src: './screenshots/captura1.png',
            sizes: '1280x720',
            type: 'image/png',
          },
        ],
      },
      devOptions: {
        enabled: true, // Habilita PWA en modo desarrollo
      },
    }),
  ],
});
