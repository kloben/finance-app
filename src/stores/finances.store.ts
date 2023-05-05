import { defineStore } from 'pinia'
import { fetchMonths, storeMonth } from '@/services/db.service'
import type { IMonthData } from '@/models/month-data.interface'
import { toMonthId } from '@/helpers/date.helper'
import type { IPaymentData } from '@/models/payment-data.interface'

export const useFinancesStore = defineStore('finances', {
  state: () => ({
    months: [] as IMonthData[],
    payments: [] as IPaymentData[]
  }),
  actions: {
    async init (): Promise<void> {
      this.months = await fetchMonths()
    },
    async createMonth (date: Date, balance: number, income: number, outcome: number): Promise<void> {
      const month = await storeMonth({
        monthId: toMonthId(date),
        income,
        outcome,
        balance
      })
      this.months.push(month)
    },
    async createTransaction (amount: number, recurrent: boolean, description?: string, date?: Date) {

    }
  }
})
