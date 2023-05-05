import { defineStore } from 'pinia'
import { fetchMonths, storeMonth, storePayment } from '@/services/db.service'
import type { IMonth, IMonthData } from '@/models/month-data.interface'
import type { IPayment, IPaymentData } from '@/models/payment.interface'

interface StoreState {
  months: Record<string, IMonth>
  payments: IPayment[]
}

export const useFinancesStore = defineStore('finances', {
  state: (): StoreState => ({
    months: {},
    payments: []
  }),
  getters: {
    hasMonths: (state): boolean => Object.keys(state.months).length > 0,
    lastMonths: (state): IMonth[] => {
      return Object.values(state.months).sort((a, b) => a.monthId > b.monthId ? 1 : -1).slice(0, 5)
    },
    lastPayments: (state): IPayment[] => {
      return state.payments.slice(0, 5)
    }
  },
  actions: {
    async init (): Promise<void> {
      this.months = await fetchMonths().then(months => months.reduce<Record<string, IMonth>>((carry, month) => {
        carry[month.monthId] = month
        return carry
      }, {}))
    },
    async createMonth (date: Date, data: IMonthData): Promise<void> {
      const month = await storeMonth(date, data)
      this.months[month.monthId] = month
    },
    async createPayment (date: Date, paymentData: IPaymentData) {
      const payment = await storePayment(date, paymentData)
      this.payments.push(payment)
    }
  }
})
