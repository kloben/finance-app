import { defineStore } from 'pinia'
import { toMonthId } from '@/helpers/date.helper'
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
      this.monthIds = calculateMonthIds()
      const global = useGlobalStore()
      void global.initMonths(this.monthIds)
    }
  }
})

function calculateMonthIds (): string[] {
  return new Array(5).fill('').reduce(({ date, monthIds }) => {
    date.setDate(15) // Causes problems if day too high
    monthIds.unshift(toMonthId(date))
    date.setMonth(date.getMonth() - 1)
    return { date, monthIds }
  }, { date: new Date(), monthIds: [] }).monthIds
}
