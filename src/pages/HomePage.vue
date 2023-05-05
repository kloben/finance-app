<script setup lang="ts">
import BarChart from '@/components/ui/charts/BarChart.vue'
import { useFinancesStore } from '@/stores/finances.store'
import { computed } from 'vue'
import type { IMonth } from '@/models/month.interface'
import PaymentData from '@/components/PaymentData.vue'
import { toMonthLabel } from '@/helpers/date.helper'
import { toCurrency } from '@/helpers/number.helper'

const store = useFinancesStore()

const summaryValues = computed(() => store.lastMonths.map((data: IMonth) => ({
  positive: data.income,
  negative: data.outcome,
  label: toMonthLabel(data.monthId)
})))

const savings = computed(() => {
  return toCurrency(store.savings ?? 0)
})
</script>

<template>
  <div class="page-wrapper">
    <div class="text-title-4">Total savings: {{ savings }}</div>
    <BarChart :values="summaryValues" />
    <div class="payments-container" v-if="store.lastPayments.length">
      <PaymentData v-for="payment of store.lastPayments" :key="payment.id" :payment="payment" />
    </div>
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
