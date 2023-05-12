import { createApp } from 'vue'
import App from './App.vue'
import { appRouter } from '@/routes'
import { createPinia } from 'pinia'
import { makeRandomPayment } from '@/services/dev.service'
import {
  Chart,
  PieController,
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'

import './styles/base.scss'

createApp(App)
  .use(appRouter)
  .use(createPinia())
  .mount('#app')

Chart.register(PieController, ArcElement, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

// @ts-ignore
window.randomPayment = makeRandomPayment
