import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './styles/base.scss'
import BasePage from '@/pages/BasePage.vue'
import HomePage from '@/pages/HomePage.vue'
import NewExpensePage from '@/pages/NewExpensePage.vue'

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

createApp({})
  .use(router)
  .mount('#app')
