import { defineStore } from 'pinia'
import { fetchMonths, storeMonth, storePayment } from '@/services/db.service'
import type { IMonth, IMonthData } from '@/models/month-data.interface'
import type { IPayment, IPaymentData } from '@/models/payment.interface'

export const useFinancesStore = defineStore('finances', {
  state: () => ({
    months: [] as IMonth[],
    payments: [] as IPayment[]
  }),
  getters: {},
  actions: {
    async init (): Promise<void> {
      this.months = await fetchMonths()
    },
    async createMonth (date: Date, data: IMonthData): Promise<void> {
      const month = await storeMonth(date, data)
      this.months.push(month)
    },
    async createPayment (date: Date, paymentData: IPaymentData) {
      const payment = await storePayment(date, paymentData)
      this.payments.push(payment)
    }
  }
})
