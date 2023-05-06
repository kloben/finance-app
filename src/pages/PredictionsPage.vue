<script setup lang="ts">
import VgBarChart from '@/components/ui/charts/VgBarChart.vue'
import { computed, onMounted } from 'vue'
import { toMonthLabel } from '@/helpers/date.helper'
import type { IMonth } from '@/models/month.interface'
import { usePredictionsStore } from '@/stores/predictions.store'

const store = usePredictionsStore()

const chartData = computed(() => {
  return [
    toChart(store.actual),
    ...store.predictions.map(m => toChart(m, true))
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

onMounted(() => {
  store.init()
})
</script>

<template>
  <div class="page-wrapper">
    <div class="text-title-4">Predictions</div>
    <VgBarChart :values="chartData" />
  </div>
</template>
