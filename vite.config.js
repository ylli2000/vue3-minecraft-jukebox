import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
//import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    //NOTE: Enable this to check package sizes.
    //This plugin is not working in dev mode
    //only works in build mode, [pnpm build & pnpm preview]
    //visualizer({ open: true }),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        id: '/',
        start_url: '/',
        name: 'Minecraft Jukebox',
        short_name: 'Minecraft Jukebox',
        description: 'A Music Player',
        theme_color: '#fefce8',
        icons: [
          {
            src: 'assets/img/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'assets/img/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        screenshots: [
          {
            src: 'assets/img/pwa-richer-ui-wide.png',
            sizes: '1241x801',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Music Player Screenshot'
          },
          {
            src: 'assets/img/pwa-richer-ui-narrow.png',
            sizes: '388x845',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Music Player Screenshot'
          }
        ]
      },
      //TODO: workbox configuration is not caching images as expected
      workbox: {
        globPatterns: ['**/*.{js,css,html,gif,png,jpg,svg,}']
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
