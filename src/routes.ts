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

export enum AppRoute {
  welcome = 'welcome ',
  home = 'home',
  status = 'status',
  future = 'future',
  settings = 'settings'
}

export const appRouter = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/welcome',
      name: AppRoute.welcome,
      component: WelcomePage,
      beforeEnter: async (_, from) => await isInitialized(from) ? { name: AppRoute.home } : true
    },
    {
      path: '/',
      component: BasePage,
      beforeEnter: async (_, from) => await isInitialized(from) ? true : { name: AppRoute.welcome },
      children: [
        {
          path: 'future',
          name: AppRoute.future,
          component: FuturePage
        },
        {
          path: 'status',
          name: AppRoute.status,
          component: DetailPage
        },
        {
          path: '',
          name: AppRoute.home,
          component: HomePage
        }
      ]
    }
  ]
})
