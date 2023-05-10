import { createRouter, createWebHistory, type RouteLocationNormalized, START_LOCATION } from 'vue-router'
import BasePage from '@/views/BasePage.vue'
import HomePage from '@/views/HomePage.vue'
import WelcomePage from '@/views/WelcomePage.vue'
import FuturePage from '@/views/FuturePage.vue'
import { useGlobalStore } from '@/stores/global.store'
import DetailPage from '@/views/DetailPage.vue'

async function isInitialized (from: RouteLocationNormalized): Promise<boolean> {
  const store = useGlobalStore()
  if (from === START_LOCATION) {
    await store.init()
  }
  return store.savings !== null
}

export const appRouter = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/welcome',
      name: 'welcome',
      component: WelcomePage,
      beforeEnter: async (_, from) => await isInitialized(from) ? { path: '/' } : true
    },
    {
      path: '/',
      component: BasePage,
      beforeEnter: async (_, from) => await isInitialized(from) ? true : { name: 'welcome' },
      children: [
        {
          path: 'future',
          component: FuturePage
        },
        {
          path: 'status',
          component: DetailPage
        },
        {
          path: '',
          component: HomePage
        }
      ]
    }
  ]
})
