import { defineStore } from 'pinia'
import { calculatePastMonthIds } from '@/helpers/date.helper'
import type { IMonth } from '@/models/month.interface'
import { useGlobalStore } from '@/stores/global.store'
import type { IPayment } from '@/models/payment.interface'
import { getEmptyMonth } from '@/helpers/data.helper'

interface StoreState {
  isInit: boolean,
  monthIds: string[]
}

export const useHomeStore = defineStore('home', {
  state: (): StoreState => ({
    isInit: false,
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
    lastPayments: (state: StoreState): IPayment[] => {
      if (!state.isInit) {
        return []
      }
      const payments: IPayment[] = []
      const global = useGlobalStore()
      for (const month of state.monthIds.slice().reverse()) {
        payments.push(...(global.payments.get(month)?.values() ?? []))
        if (payments.length >= 5) {
          break
        }
      }
      return payments.sort((a, b) => `${a.dayId}-${a.createdAt}` > `${b.dayId}-${b.createdAt}` ? -1 : 1)
        .slice(0, 5)
    }
  },
  actions: {
    async init () {
      if (this.isInit) {
        return
      }
      await useGlobalStore().initMonths(this.monthIds)
      this.isInit = true
    }
  }
})

