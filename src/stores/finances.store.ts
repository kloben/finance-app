import { defineStore } from 'pinia'
import { fetchMonths, fetchSavings, storePayment, storeSavings } from '@/services/db.service'
import type { IMonth } from '@/models/month-data.interface'
import type { IPayment, IPaymentData } from '@/models/payment.interface'
import { toMonthId } from '@/helpers/date.helper'

interface StoreState {
  savings: number | null
  months: Record<string, IMonth>
  payments: IPayment[]
}

export const useFinancesStore = defineStore('finances', {
  state: (): StoreState => ({
    savings: null,
    months: {},
    payments: []
  }),
  getters: {
    lastMonths: (state): IMonth[] => {
      return Object.values(state.months).sort((a, b) => a.monthId > b.monthId ? 1 : -1).slice(0, 5)
    },
    lastPayments: (state): IPayment[] => {
      return state.payments.slice(0, 5)
    }
  },
  actions: {
    async init (): Promise<void> {
      const { monthIds } = new Array(5).fill('').reduce(({ date, monthIds }) => {
        date.setDate(15)
        date.setMonth(date.getMonth() - 1)
        monthIds.push(toMonthId(date))
        return { date, monthIds }
      }, { date: new Date(), monthIds: [] })
      const months = await fetchMonths(monthIds)
      this.months = monthIds.map((monthId: string) => {
        return months.find(month => month.monthId === monthId) ?? { monthId, income: 0, outcome: 0 }
      })
      this.savings = fetchSavings()
    },
    updateSavings (newValue: number): void {
      storeSavings(newValue)
      this.savings = newValue
    },
    async createPayment (date: Date, paymentData: IPaymentData) {
      const payment = await storePayment(date, paymentData)
      this.payments.push(payment)
    }
  }
})
