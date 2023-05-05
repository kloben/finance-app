<script setup lang="ts">
import VgBarChart from '@/components/ui/charts/VgBarChart.vue'
import { useFinancesStore } from '@/stores/finances.store'
import { computed } from 'vue'
import type { IMonth } from '@/models/month.interface'
import { toMonthLabel } from '@/helpers/date.helper'
import { toCurrency } from '@/helpers/number.helper'

const store = useFinancesStore()

const summaryValues = computed(() => store.lastMonths.map((data: IMonth) => ({
  up: data.income,
  down: data.outcome,
  label: toMonthLabel(data.monthId)
})))

const savings = computed(() => {
  return toCurrency(store.savings ?? 0)
})
</script>

<template>
  <div class="page-wrapper">
    <div class="text-title-4">Total savings: {{ savings }}</div>
    <VgBarChart :values="summaryValues" />
  </div>
</template>

<style lang="scss">
@import "src/styles/colors";

.text-title-4 {
  padding-bottom: 32px;
}

.payments-container {
  margin-top: 32px;
  padding: 8px 16px;
  background: $white;
  border-radius: 4px;
}
</style>
