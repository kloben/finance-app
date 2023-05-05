<script setup lang="ts">
import BarChart from '@/components/ui/charts/BarChart.vue'
import { useFinancesStore } from '@/stores/finances.store'
import { computed } from 'vue'
import type { IMonth } from '@/models/month.interface'
import PaymentData from '@/components/PaymentData.vue'

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
