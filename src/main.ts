import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/routes'
import { createPinia } from 'pinia'
import { makeRandomPayment } from '@/services/dev.service'

import './styles/base.scss'

createApp(App)
  .use(router)
  .use(createPinia())
  .mount('#app')

// @ts-ignore
window.randomPayment = makeRandomPayment
