<script setup lang="ts">
import BarChart from '@/components/ui/charts/BarChart.vue'
import { computed } from 'vue'
import { useFinancesStore } from '@/stores/finances.store'
import { toMonthLabel } from '@/helpers/date.helper'

const store = useFinancesStore()

const chartData = computed(() => {
  const months = store.lastMonths.slice(-3)
  const currentMonth = months[months.length - 1]
  return [
    {
      positive: currentMonth.income,
      negative: currentMonth.outcome,
      label: toMonthLabel(currentMonth.monthId)
    }
  ]
})
</script>

<template>
  <div class="page-wrapper">
    <div class="text-title-4">Predictions</div>
    <BarChart :values="chartData" />
  </div>
</template>

<style scoped lang="scss">

</style>
