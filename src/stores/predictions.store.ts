import { defineStore } from 'pinia'
import { useGlobalStore } from '@/stores/global.store'
import { calculateNextMonthIds, calculatePastMonthIds, toMonthId } from '@/helpers/date.helper'
import type { IMonth } from '@/models/month.interface'
import { calculatePredictions } from '@/services/predictions.service'
import { getEmptyMonth } from '@/helpers/data.helper'

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
      return global.months.get(state.monthId) ?? getEmptyMonth(state.monthId)
    },
    predictions: (state: StoreState): IMonth[] => {
      if (!state.isInit) {
        return state.nextIds.map(monthId => getEmptyMonth(monthId))
      }
      const global = useGlobalStore()
      return calculatePredictions(
        state.pastIds.map(monthId => global.months.get(monthId) ?? getEmptyMonth(monthId)),
        global.categories,
        state.nextIds
      )
    }
  },
  actions: {
    async init () {
      if (this.isInit) {
        return
      }
      await useGlobalStore().loadMonths(this.pastIds)
      this.isInit = true
    }
  }
})
