import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/routes'
import { createPinia } from 'pinia'
import { makeRandomPayment } from '@/services/dev.service'
import { Chart, PieController, ArcElement, Tooltip, Colors } from 'chart.js'

import './styles/base.scss'

createApp(App)
  .use(router)
  .use(createPinia())
  .mount('#app')

Chart.register(PieController, ArcElement, Tooltip, Colors)

// @ts-ignore
window.randomPayment = makeRandomPayment
