module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard-with-typescript',
    '@vue/eslint-config-typescript'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    'vue'
  ],
  rules: {
    'vue/component-tags-order': ['error', {
      order: [['script', 'template'], 'style']
    }]
  }
}
