<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { Chart } from 'chart.js'
import type { PieChartData } from '@/helpers/chart.helper'
import { parsePieChartData, pieChartOptions } from '@/helpers/chart.helper'

const props = defineProps<{
  data: PieChartData
}>()

const canvasRef = ref<HTMLCanvasElement>()
let chart: Chart

onMounted(() => {
  const { labels, datasets } = parsePieChartData(props.data)
  chart = new Chart(
    <HTMLCanvasElement>canvasRef.value,
    {
      type: 'pie',
      options: pieChartOptions,
      data: { labels, datasets }
    }
  )
})

onUnmounted(() => {
  chart.destroy()
})

watch(() => props.data, (newData: PieChartData) => {
  const { labels, datasets } = parsePieChartData(props.data)
  chart.data.labels = labels
  chart.data.datasets = datasets
  chart.update()
})
</script>

<template>
  <canvas ref="canvasRef"></canvas>
</template>

<style scoped lang="scss">
@import "src/styles/colors";

canvas {
  max-height: 30vh;
}
</style>
