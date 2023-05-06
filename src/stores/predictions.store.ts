import { defineStore } from 'pinia'
import { useGlobalStore } from '@/stores/global.store'
import { calculateNextMonthIds, calculatePastMonthIds, toMonthId } from '@/helpers/date.helper'
import type { IMonth } from '@/models/month.interface'
import { calculatePredictions } from '@/services/predictions.service'

interface StoreState {
  isInit: boolean
  monthId: string
  pastIds: string[]
  nextIds: string[]
}

export const usePredictionsStore = defineStore('predictions', {
  state: (): StoreState => ({
    isInit: false,
    monthId: toMonthId(new Date()),
    pastIds: calculatePastMonthIds(3),
    nextIds: calculateNextMonthIds(4)
  }),
  getters: {
    actual: (state: StoreState): IMonth => {
      const global = useGlobalStore()
      return global.months.get(state.monthId) ?? { monthId: state.monthId, income: 0, outcome: 0 }
    },
    predictions: (state: StoreState): IMonth[] => {
      if (!state.isInit) {
        return state.nextIds.map(monthId => ({ monthId, income: 0, outcome: 0 }))
      }
      const global = useGlobalStore()
      return calculatePredictions(
        state.nextIds.map(monthId => {
          return {
            monthId,
            payments: Array.from(global.payments.get(monthId)?.values() ?? [])
          }
        }),
        state.nextIds
      )
    }
  },
  actions: {
    async init () {
      if (this.isInit) {
        return
      }

      const global = useGlobalStore()
      await global.initMonths(this.pastIds)
      this.isInit = true
    }
  }
})
