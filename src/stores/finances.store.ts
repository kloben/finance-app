import { defineStore } from 'pinia'
import { fetchMonths, fetchSavings, storePayment, storeSavings } from '@/services/db.service'
import type { IMonth } from '@/models/month.interface'
import type { IPayment, IPaymentData } from '@/models/payment.interface'
import { toMonthId } from '@/helpers/date.helper'

interface StoreState {
  savings: number | null
  months: Map<string, IMonth>
  payments: Map<number, IPayment>
}

export const useFinancesStore = defineStore('finances', {
  state: (): StoreState => ({
    savings: null,
    months: new Map<string, IMonth>(),
    payments: new Map<number, IPayment>()
  }),
  getters: {
    lastMonths: (state): IMonth[] => {
      return Array.from(state.months.keys()).sort().slice(-5).map(id => state.months.get(id) as IMonth)
    },
    lastPayments: (state): IPayment[] => {
      // eslint-disable-next-line @typescript-eslint/require-array-sort-compare
      return Array.from(state.payments.keys()).sort().slice(-5).map(id => state.payments.get(id) as IPayment)
    }
  },
  actions: {
    async init (): Promise<void> {
      const { monthIds } = new Array(5).fill('').reduce(({ date, monthIds }) => {
        date.setDate(15) // TODO: Review if necessary
        monthIds.push(toMonthId(date))
        date.setMonth(date.getMonth() - 1)
        return { date, monthIds }
      }, { date: new Date(), monthIds: [] })
      const months = await fetchMonths(monthIds)
      for (const monthId of monthIds) {
        this.months.set(monthId, months.find(month => month.monthId === monthId) ?? { monthId, income: 0, outcome: 0 })
      }
      this.savings = fetchSavings()
    },
    updateSavings (newValue: number): void {
      storeSavings(newValue)
      this.savings = newValue
    },
    async createPayment (date: Date, paymentData: IPaymentData) {
      const { payment, month, savings } = await storePayment(date, paymentData)
      if (savings !== null) {
        this.savings = savings
      }
      this.months.set(month.monthId, month)
      this.payments.set(payment.id, payment)
    }
  }
})
