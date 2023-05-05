import { createRouter, createWebHistory } from 'vue-router'
import BasePage from '@/pages/BasePage.vue'
import HomePage from '@/pages/HomePage.vue'
import NewExpensePage from '@/pages/NewTransactionPage.vue'
import InitPage from '@/pages/InitPage.vue'
import { useHomeStore } from '@/stores/home.store'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/init',
      component: InitPage,
      beforeEnter: () => useHomeStore().hasMonths ? { path: '/' } : true
    },
    {
      path: '/',
      component: BasePage,
      beforeEnter: () => useHomeStore().hasMonths ? true : { path: '/init' },
      children: [
        {
          path: 'new',
          component: NewExpensePage
        },
        {
          path: '',
          component: HomePage
        }
      ]
    }
  ]
})
