<script setup lang="ts">
import VgBarChart from '@/components/ui/charts/VgBarChart.vue'
import { useGlobalStore } from '@/stores/global.store'
import { computed, onMounted } from 'vue'
import type { IMonth } from '@/models/month.interface'
import { toMonthLabel } from '@/helpers/date.helper'
import { toCurrency } from '@/helpers/number.helper'
import { useHomeStore } from '@/stores/home.store'
import type { BarChartData, PieChartData } from '@/components/ui/charts/chart-value.interface'
import VgPieChart from '@/components/ui/charts/VgPieChart.vue'
import { PaymentType } from '@/models/payment.interface'

const globalStore = useGlobalStore()
const store = useHomeStore()

const barData = computed<BarChartData>(() => store.lastMonths.map((data: IMonth) => ({
  up: data.income,
  down: data.outcome,
  label: toMonthLabel(data.monthId)
})))

const pieData = computed<PieChartData>(() => Object.keys(store.currentMonth.totals).reduce((carry, categoryId) => {
  const category = globalStore.getCategory(categoryId)
  if (category.type === PaymentType.out) {
    carry.push({
      label: category.label,
      value: store.currentMonth.totals[categoryId]
    })
  }
  return carry
}, <PieChartData>[]))

const savings = computed(() => {
  return toCurrency(globalStore.savings ?? 0)
})

onMounted(() => {
  store.init()
})
</script>

<template>
  <div class="page-wrapper">
    <div class="text-title-4">Total savings: {{ savings }}</div>
    <VgBarChart :data="barData" />
    <VgPieChart :data="pieData" />
  </div>
</template>

<style lang="scss">
@import "src/styles/colors";

.text-title-4 {
  padding-bottom: 32px;
}
</style>
