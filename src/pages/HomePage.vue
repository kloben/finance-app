<script setup lang="ts">
import BarChart from '@/components/ui/charts/BarChart.vue'
import { useFinancesStore } from '@/stores/finances.store'
import { computed } from 'vue'
import type { IMonth } from '@/models/month.interface'

const store = useFinancesStore()

const summaryValues = computed(() => store.lastMonths.map((data: IMonth) => ({
  positive: data.income,
  negative: data.outcome,
  label: new Date(data.monthId).toLocaleString('default', { month: 'short' })
})))

const savings = computed(() => {
  return Intl.NumberFormat('default', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
  }).format(store.savings ?? 0)
})
</script>

<template>
  <div class="page-wrapper">
    <div class="text-title-4">Savings: {{savings}}</div>
    <BarChart :values="summaryValues" />
  </div>
</template>

<style lang="scss">
.text-title-4 {
  padding-bottom: 32px;
}
</style>
