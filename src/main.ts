import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import BasePage from '@/pages/BasePage.vue'
import HomePage from '@/pages/HomePage.vue'
import NewExpensePage from '@/pages/NewTransactionPage.vue'

import './styles/base.scss'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: BasePage,
      children: [
        {
          path: '',
          component: HomePage
        },
        {
          path: 'new',
          component: NewExpensePage
        }
      ]
    }
  ]
})

createApp(App)
  .use(router)
  .mount('#app')
