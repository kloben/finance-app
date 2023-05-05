/// <reference types="vitest" />

import { fileURLToPath, URL } from 'node:url'
import checker from 'vite-plugin-checker'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    checker({
      vueTsc: true
    })
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler',
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: 'c8',
      reporter: ['text', 'html'],
      all: true
    }
  }
})
