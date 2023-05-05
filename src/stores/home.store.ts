import { defineStore } from 'pinia'
import { fetchSummaries, saveSummary } from '@/services/db.service'
import { ref } from 'vue'
import { toMonthId } from '@/helpers/date.helper'

export const homeStore = defineStore('home', async () => {
  console.log('Store INIT')
  const summaries = await fetchSummaries()
  console.log('Store LOADED')
  const state = {
    summaries: ref(summaries)
  }
  const getters = {
  }
  const actions = {
    init: async (savings: number) => {
      const summary = await saveSummary({
        month: toMonthId(new Date()),
        profit: 0,
        loss: 0,
        savings
      })
      state.summaries.value.push(summary)
    }
  }
  return { ...state, ...getters, ...actions }
})
