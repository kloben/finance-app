import { defineStore } from 'pinia'
import {
  fetchCategories,
  fetchMonths,
  fetchPayments,
  fetchSavings,
  storePayment,
  storeSavings
} from '@/services/db.service'
import type { IMonth } from '@/models/month.interface'
import type { IPayment, IPaymentData } from '@/models/payment.interface'
import { toMonthId } from '@/helpers/date.helper'
import type { ICategory } from '@/models/category.interface'
import type { PaymentType } from '@/models/payment.interface'

interface StoreState {
  savings: number | null
  monthIds: string[]
  categories: Map<string, ICategory>
  monthsCache: Map<string, IMonth>
  paymentsCache: Map<string, Map<number, IPayment>> // Grouped by month
}

export const useFinancesStore = defineStore('finances', {
  state: (): StoreState => ({
    savings: null,
    monthIds: [],
    categories: new Map<string, ICategory>(),
    monthsCache: new Map<string, IMonth>(),
    paymentsCache: new Map<string, Map<number, IPayment>>()
  }),
  getters: {
    currentMonth: (state: StoreState): IMonth => {
      const monthId = state.monthIds[state.monthIds.length - 1]
      return state.monthsCache.get(monthId) ?? { monthId, income: 0, outcome: 0 }
    },
    lastMonths: (state: StoreState): IMonth[] => {
      return state.monthIds
        .map((monthId) => state.monthsCache.get(monthId) ?? { monthId, income: 0, outcome: 0 })
    },
    lastPayments: (state: StoreState): IPayment[] => {
      const payments: IPayment[] = []
      for (const month of state.monthIds.slice().reverse()) {
        payments.push(...(state.paymentsCache.get(month)?.values() ?? []))
        if (payments.length >= 5) {
          break
        }
      }
      return payments.sort((a, b) => `${a.dayId}-${a.createdAt}` > `${b.dayId}-${b.createdAt}` ? -1 : 1)
        .slice(0, 5)
    },
    getCategories: (state: StoreState): (type: PaymentType) => ICategory[] => {
      return (type: PaymentType) => Array.from(state.categories.values()).filter(cat => cat.type === type)
    },
    getCategory: (state: StoreState): (id: string) => ICategory | undefined => {
      return (id: string) => state.categories.get(id)
    }
  },
  actions: {
    async init (): Promise<void> {
      const monthIds = getMonthIds()
      const [months, payments, categories] = await Promise.all([
        fetchMonths(monthIds),
        getPayments(monthIds),
        fetchCategories()
      ])
      const savings = fetchSavings()

      this.$patch((state: StoreState) => {
        state.monthIds = monthIds
        state.savings = savings
        for (const category of categories) {
          state.categories.set(category.id, category)
        }
        for (const month of months) {
          state.monthsCache.set(month.monthId, month)
        }
        for (const monthId in payments) {
          state.paymentsCache.set(monthId, payments[monthId].reduce((map, payment) => {
            map.set(payment.id, payment)
            return map
          }, new Map()))
        }
      })
    },
    updateSavings (newValue: number): void {
      storeSavings(newValue)
      this.savings = newValue
    },
    async createPayment (date: Date, paymentData: IPaymentData) {
      const { payment, month, savings } = await storePayment(date, paymentData)
      this.$patch((state: StoreState) => {
        if (savings !== null) {
          state.savings = savings
        }
        state.monthsCache.set(month.monthId, month)
        const payments = state.paymentsCache.get(payment.monthId)
        if (payments) {
          payments.set(payment.id, payment)
        }
      })
    }
  }
})

function getMonthIds (): string[] {
  return new Array(5).fill('').reduce(({ date, monthIds }) => {
    date.setDate(15) // Causes problems if day too high
    monthIds.unshift(toMonthId(date))
    date.setMonth(date.getMonth() - 1)
    return { date, monthIds }
  }, { date: new Date(), monthIds: [] }).monthIds
}

async function getPayments (monthIds: string[]): Promise<Record<string, IPayment[]>> {
  const payments: Record<string, IPayment[]> = {}
  for (const monthId of monthIds) {
    payments[monthId] = await fetchPayments(monthId)
  }
  return payments
}
