import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'PPoż Ferrero',
        short_name: 'PPoż Ferrero',
        description: 'Aplikacja do zarządzania gaśnicami w Ferrero',
        start_url: '/',
        display: 'standalone',
        icons: [
          {
            src: 'icon.png',
            sizes: '1024x1024',
            type: 'png',
          },
        ],
      },
      includeAssets: ['icon.png', 'favicon.ico'],
      filename: 'sw.ts',
      strategies: 'injectManifest',
      srcDir: 'src',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: '/',
})
