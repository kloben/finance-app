<script setup lang="ts">
import BarChart from '@/components/ui/charts/BarChart.vue'
import { computed } from 'vue'
import { useFinancesStore } from '@/stores/finances.store'
import { toMonthLabel } from '@/helpers/date.helper'
import { calculatePredictions } from '@/services/predictions.service'
import type { IMonth } from '@/models/month.interface'

const store = useFinancesStore()

const chartData = computed(() => {
  const currentMonth = store.currentMonth
  const predictions = calculatePredictions(store.monthIds.map((monthId) => ({
    monthId,
    payments: Array.from(store.paymentsCache.get(monthId)?.values() ?? [])
  })))

  return [
    toChart(currentMonth),
    ...predictions.map(m => toChart(m, true))
  ]
})

function toChart (month: IMonth, predicted: boolean = false) {
  return {
    label: toMonthLabel(month.monthId),
    up: month.income,
    down: month.outcome,
    predicted
  }
}
</script>

<template>
  <div class="page-wrapper">
    <div class="text-title-4">Predictions</div>
    <BarChart :values="chartData" />
  </div>
</template>

<style scoped lang="scss">

</style>
