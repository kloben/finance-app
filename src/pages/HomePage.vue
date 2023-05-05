<script setup lang="ts">
import BarChart from '@/components/ui/charts/BarChart.vue'
import { useMonthStore } from '@/stores/months.store'
import { computed } from 'vue'
import type { IMonthData } from '@/models/month-data.interface'

const store = useMonthStore()
const summaryValues = computed(() => store.months.map((data: IMonthData) => ({
  positive: data.profit,
  negative: data.loss,
  label: new Date(data.month).toLocaleString('default', { month: 'short' })
})))
</script>

<template>
  <BarChart :values="summaryValues" />
</template>

<style lang="scss">

</style>
