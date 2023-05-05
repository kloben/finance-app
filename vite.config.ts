import { fileURLToPath, URL } from 'node:url'
import checker from 'vite-plugin-checker'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    !process.env.VITEST
      ? checker({ vueTsc: true })
      : undefined
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler',
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
