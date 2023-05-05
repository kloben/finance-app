import { defineStore } from 'pinia'
import { fetchSummaries } from '@/services/db.service'
import type { IMonthSummary } from '@/models/month-summary.interface'

export const useHomeStore = defineStore('home', {
  state: () => ({
    months: [] as IMonthSummary[]
  }),
  getters: {
    hasMonths: (state) => state.months.length > 0
  },
  actions: {
    async init () {
      this.months = await fetchSummaries()
    }
  }
})
// export const homeStore = defineStore('home', async () => {
//   const state = {
//     summaries: ref(summaries)
//   }
//   const getters = {
//   }
//   const actions = {
//     init: async ()
//     initMonth: async (savings: number) => {
//       const summary = await saveSummary({
//         month: toMonthId(new Date()),
//         profit: 0,
//         loss: 0,
//         savings
//       })
//       state.summaries.value.push(summary)
//     }
//   }
//   return { ...state, ...getters, ...actions }
// })
