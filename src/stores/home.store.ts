import { defineStore } from 'pinia'
import { calculatePastMonthIds } from '@/helpers/date.helper'
import type { IMonth } from '@/models/month.interface'
import { useGlobalStore } from '@/stores/global.store'
import type { IPayment } from '@/models/payment.interface'

interface StoreState {
  monthIds: string[]
}

export const useHomeStore = defineStore('home', {
  state: (): StoreState => ({
    monthIds: []
  }),
  getters: {
    lastMonths: (state: StoreState): IMonth[] => {
      const global = useGlobalStore()
      return state.monthIds.map((monthId) => global.months.get(monthId) ?? { monthId, income: 0, outcome: 0 })
    },
    lastPayments: (state: StoreState): IPayment[] => {
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
    init () {
      if (this.monthIds.length) {
        return
      }
      this.monthIds = calculatePastMonthIds()
      const global = useGlobalStore()
      void global.initMonths(this.monthIds)
    }
  }
})

