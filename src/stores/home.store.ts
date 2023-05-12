import { defineStore } from 'pinia'
import { calculatePastMonthIds, toMonthId } from '@/helpers/date.helper'
import type { IMonth } from '@/models/month.interface'
import { useGlobalStore } from '@/stores/global.store'
import { getEmptyMonth } from '@/helpers/data.helper'

interface StoreState {
  isInit: boolean
  currentMonthId: string
  monthIds: string[]
}

export const useHomeStore = defineStore('home', {
  state: (): StoreState => ({
    isInit: false,
    currentMonthId: toMonthId(new Date()),
    monthIds: calculatePastMonthIds()
  }),
  getters: {
    lastMonths: (state: StoreState): IMonth[] => {
      if (!state.isInit) {
        return []
      }
      const global = useGlobalStore()
      return state.monthIds.map((monthId) => global.months.get(monthId) ?? getEmptyMonth(monthId))
    },
    currentMonth: (state: StoreState): IMonth => {
      const global = useGlobalStore()
      return global.months.get(state.currentMonthId) ?? getEmptyMonth(state.currentMonthId)
    }
  },
  actions: {
    async init () {
      if (this.isInit) {
        return
      }
      await useGlobalStore().loadMonths(this.monthIds)
      this.isInit = true
    }
  }
})

