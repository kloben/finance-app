<script setup lang="ts">
import BarChart from '@/components/ui/charts/BarChart.vue'
import { useFinancesStore } from '@/stores/finances.store'
import { computed } from 'vue'
import type { IMonth } from '@/models/month-data.interface'

const store = useFinancesStore()

const summaryValues = computed(() => store.lastMonths.map((data: IMonth) => ({
  positive: data.income,
  negative: data.outcome,
  label: new Date(data.monthId).toLocaleString('default', { month: 'short' })
})))
</script>

<template>
  <div class="page-wrapper">
    <BarChart :values="summaryValues" />
  </div>
</template>

<style lang="scss">

</style>
