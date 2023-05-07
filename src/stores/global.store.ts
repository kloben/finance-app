import { defineStore } from 'pinia'
import {
  fetchCategories, fetchMonth,
  fetchPayments,
  fetchSavings, storePayment, storeSavings,
} from '@/services/db.service'
import type { IMonth } from '@/models/month.interface'
import type { IPayment, IPaymentData } from '@/models/payment.interface'
import type { ICategory } from '@/models/category.interface'
import type { PaymentType } from '@/models/payment.interface'

interface StoreState {
  savings: number | null
  categories: Map<string, ICategory>
  months: Map<string, IMonth>
  payments: Map<string, Map<number, IPayment>> // Grouped by month
}

export const useGlobalStore = defineStore('global', {
  state: (): StoreState => ({
    savings: fetchSavings(),
    categories: new Map<string, ICategory>(),
    months: new Map<string, IMonth>(),
    payments: new Map<string, Map<number, IPayment>>()
  }),
  getters: {
    getCategories: (state: StoreState): (type: PaymentType) => ICategory[] => {
      return (type: PaymentType) => Array.from(state.categories.values()).filter(cat => cat.type === type)
    },
    getCategory: (state: StoreState): (id: string) => ICategory | undefined => {
      return (id: string) => state.categories.get(id)
    }
  },
  actions: {
    async init () {
      await fetchCategories().then((categories) => {
        categories.forEach(category => this.categories.set(category.id, category))
      })
    },
    async initMonths (monthIds: string[]) {
      const missing = monthIds.filter(monthId => !this.months.has(monthId))
      if (!missing.length) {
        return
      }
      const months = await Promise.all(missing.map(monthId => fetchMonth(monthId)))
      this.$patch((state: StoreState) => {
        for (const month of months) {
          state.months.set(month.monthId, month)
        }
      })
    },
    updateSavings (newValue: number): void {
      storeSavings(newValue)
      this.savings = newValue
    },
    async createPayment (date: Date, paymentData: IPaymentData): Promise<void> {
      const { payment, month, savings } = await storePayment(date, paymentData)
      this.$patch((state: StoreState) => {
        state.savings = savings
        state.months.set(month.monthId, month)
        state.payments.get(payment.monthId)?.set(payment.id, payment)
      })
    }
  },
})
