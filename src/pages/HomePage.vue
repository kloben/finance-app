<script setup lang="ts">
import BarChart from '@/components/ui/charts/BarChart.vue'
import { useFinancesStore } from '@/stores/finances.store'
import { computed } from 'vue'
import type { IMonthData } from '@/models/month-data.interface'

const store = useFinancesStore()
const summaryValues = computed(() => store.months.map((data: IMonthData) => ({
  positive: data.income,
  negative: data.outcome,
  label: new Date(data.monthId).toLocaleString('default', { month: 'short' })
})))
</script>

<template>
  <BarChart :values="summaryValues" />
</template>

<style lang="scss">

</style>
