<script setup lang="ts">
import { describeArc } from '@/helpers/chart.helper'
import type { PieChartValue } from '@/components/ui/charts/chart-value.interface'
import { computed } from 'vue'

interface DisplayData {
  path: string
  color: string
}

const props = defineProps<{
  input: PieChartValue[]
}>()

const display = computed<DisplayData[]>(() => {
  const total = props.input.reduce((carry, value) => carry + value.value, 0)
  let offset = 0
  return props.input.map((value: PieChartValue) => {
    const angle = value.value / total * 360
    const path = describeArc(200, 200, 100, offset, offset + angle)
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16)
    offset += angle
    return { path, color }
  })
})
</script>

<template>
  <div class="chart-container">
    <svg>
      <path v-for="(data, index) of display" :key="index" :d="data.path" :stroke="data.color" />
    </svg>
  </div>
</template>

<style scoped lang="scss">
@import "src/styles/colors";

svg {
  width: 400px;
  height: 400px;

  path {
    fill: none;
    //stroke: black;
    stroke-width: 200;
  }
}

// https://codepen.io/jh3y/pen/bQbpWd
.chart-container {
  //background: black;
  //height: 200px;
  //clip-path: circle(40% at 50% 50%);
  //aspect-ratio: 1;
  //position: relative;
}
</style>
