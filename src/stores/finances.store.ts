import { defineStore } from 'pinia'
import { fetchMonths, fetchPayments, fetchSavings, storePayment, storeSavings } from '@/services/db.service'
import type { IMonth } from '@/models/month.interface'
import type { IPayment, IPaymentData, PaymentType } from '@/models/payment.interface'
import { toMonthId } from '@/helpers/date.helper'

interface StoreState {
  savings: number | null
  monthIds: string[]
  prediction: Omit<IMonth, 'monthId'>
  monthsCache: Map<string, IMonth>
  paymentsCache: Map<string, Map<number, IPayment>> // Grouped by month
}

export const useFinancesStore = defineStore('finances', {
  state: (): StoreState => ({
    savings: null,
    monthIds: [],
    prediction: { income: 0, outcome: 0 },
    monthsCache: new Map<string, IMonth>(),
    paymentsCache: new Map<string, Map<number, IPayment>>()
  }),
  getters: {
    lastMonths: (state: StoreState): IMonth[] => {
      return state.monthIds
        .map((monthId) => state.monthsCache.get(monthId) ?? { monthId, income: 0, outcome: 0 })
    }
    // lastPayments: (state: StoreState): IPayment[] => {
    //   // return Array.from(state.paymentsCache.values()).sort((a, b) => {
    //   //   return `${a.dayId}${a.createdAt}` > `${b.dayId}${b.createdAt}` ? -1 : 1
    //   // }).slice(0, 5)
    // }
  },
  actions: {
    async init (): Promise<void> {
      this.monthIds = getMonthIds()
      await getMonths(this.monthIds).then(months => {
        months.forEach((month) => {
          this.monthsCache.set(month.monthId, month)
        })
      })
      for (const monthId of this.monthIds.slice(-3)) {
        await fetchPayments(monthId).then(payments => {
          this.paymentsCache.set(monthId, payments.reduce((map, payment) => {
            map.set(payment.id, payment)
            return map
          }, new Map()))
        })
      }
      this.savings = fetchSavings()
      this.reCalculatePrediction()
    },
    reCalculatePrediction (): void {
      const totals: { [type in PaymentType]: Record<string, number> } = {
        income: {},
        outcome: {}
      }
      for (const monthId of this.monthIds.slice(-3)) {
        const payments = Array.from(this.paymentsCache.get(monthId)?.values() ?? [])
        for (const payment of payments) {
          totals[payment.type][payment.category] = (totals[payment.type][payment.category] ?? 0) + payment.amount
        }
      }
      this.prediction = {
        income: Math.round(Object.keys(totals.income).reduce((carry, keyId) => carry + (totals.income[keyId] / 3), 0)),
        outcome: Math.round(Object.keys(totals.outcome).reduce((carry, keyId) => carry + (totals.outcome[keyId] / 3), 0))
      }
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
      if (this.monthsCache.has(month.monthId)) {
        this.monthsCache.set(month.monthId, month)
      }
      const payments = this.paymentsCache.get(payment.monthId)
      if (payments) {
        payments.set(payment.id, payment)
      }
      if (this.monthIds.includes(payment.monthId)) {
        this.reCalculatePrediction()
      }
    }
  }
})

function getMonthIds (): string[] {
  return new Array(5).fill('').reduce(({ date, monthIds }) => {
    date.setDate(15) // TODO: Review if necessary
    monthIds.unshift(toMonthId(date))
    date.setMonth(date.getMonth() - 1)
    return { date, monthIds }
  }, { date: new Date(), monthIds: [] }).monthIds
}

async function getMonths (monthIds: string[]): Promise<IMonth[]> {
  return await fetchMonths(monthIds)
    .then(months => monthIds.map((monthId: string): IMonth => {
      return months.find(m => m.monthId === monthId) ?? { monthId, income: 0, outcome: 0 }
    }))
}
