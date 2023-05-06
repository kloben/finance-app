import { createRouter, createWebHistory, type RouteLocationNormalized, START_LOCATION } from 'vue-router'
import BasePage from '@/pages/BasePage.vue'
import HomePage from '@/pages/HomePage.vue'
import NewPaymentPage from '@/pages/NewPaymentPage.vue'
import InitPage from '@/pages/InitPage.vue'
import PredictionsPage from '@/pages/PredictionsPage.vue'
import { useGlobalStore } from '@/stores/global.store'

async function isInitialized (from: RouteLocationNormalized): Promise<boolean> {
  const store = useGlobalStore()
  if (from === START_LOCATION) {
    await store.init()
  }
  return store.savings !== null
}

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/init',
      component: InitPage,
      beforeEnter: async (_, from) => await isInitialized(from) ? { path: '/' } : true
    },
    {
      path: '/',
      component: BasePage,
      beforeEnter: async (_, from) => await isInitialized(from) ? true : { path: '/init' },
      children: [
        {
          path: 'new',
          component: NewPaymentPage
        },
        {
          path: 'predict',
          component: PredictionsPage
        },
        {
          path: '',
          component: HomePage
        }
      ]
    }
  ]
})
