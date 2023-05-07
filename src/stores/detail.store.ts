import { defineStore } from 'pinia'
import type { IMonth } from '@/models/month.interface'
import type { IPayment } from '@/models/payment.interface'
import { useGlobalStore } from '@/stores/global.store'

interface StoreState {
  monthId: string | null
}

export const useDetailStore = defineStore('detail', {
  state: (): StoreState => ({
    monthId: null
  }),
  getters: {
    month: (state: StoreState): IMonth | null => {
      if (!state.monthId) {
        return null
      }
      return null
    },
    payments: (state: StoreState): IPayment[] => {
      if (!state.monthId) {
        return []
      }
      const global = useGlobalStore()
      return Array.from(global.payments.get(state.monthId)?.values() ?? [])
    }
  },
  actions: {
    async loadMonth (monthId: string) {
      if (monthId === this.monthId) {
        return
      }
      this.monthId = null
      const global = useGlobalStore()
      await global.loadMonths([monthId])
      await global.loadPayments(monthId)
      this.monthId = monthId
    }
  }
})