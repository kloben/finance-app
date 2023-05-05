import { defineStore } from 'pinia'
import { fetchMonths, storeMonth } from '@/services/db.service'
import type { IMonthData } from '@/models/month-data.interface'
import { toMonthId } from '@/helpers/date.helper'
import type { ITransaction } from '@/models/transation.interface'

export const useFinancesStore = defineStore('finances', {
  state: () => ({
    months: [] as IMonthData[],
    transactions: [] as ITransaction[]
  }),
  actions: {
    async init (): Promise<void> {
      this.months = await fetchMonths()
    },
    async createMonth (date: Date, savings: number, profit: number, loss: number): Promise<void> {
      const month = await storeMonth({
        month: toMonthId(date),
        profit,
        loss,
        savings
      })
      this.months.push(month)
    }
  }
})
