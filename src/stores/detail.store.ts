import { defineStore } from 'pinia'
import type { IMonth } from '@/models/month.interface'
import type { IPayment } from '@/models/payment.interface'
import { useGlobalStore } from '@/stores/global.store'
import { getEmptyMonth } from '@/helpers/data.helper'

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
      return useGlobalStore().months.get(state.monthId) ?? getEmptyMonth(state.monthId)
    },
    payments: (state: StoreState): IPayment[] => {
      if (!state.monthId) {
        return []
      }
      return Array.from(useGlobalStore().payments.get(state.monthId)?.values() ?? [])
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
