import { defineConfig } from 'cypress'

export default defineConfig({
  screenshotOnRunFailure: false,
  video: false,
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4173'
  },
  viewportWidth: 400,
  viewportHeight: 654
})
