<script setup lang="ts">
import BarChart from '@/components/ui/charts/BarChart.vue'

const values = [
  {
    positive: 10,
    negative: 20,
    label: 'Jan'
  },
  {
    positive: 20,
    negative: 25,
    label: 'Feb'
  },
  {
    positive: 5,
    negative: 30,
    label: 'Mar'
  },
  {
    positive: 20,
    negative: 25,
    label: 'Apr'
  }
]
</script>

<template>
  <BarChart :values="values" />
</template>

<style lang="scss">

</style>
