<script setup lang="ts">
import type { BarChartData } from '@/components/ui/charts/chart-value.interface'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { Chart } from 'chart.js'
import { parseBarChartData } from '@/helpers/chart.helper'

const props = defineProps<{
  data: BarChartData
}>()

const canvasRef = ref<HTMLCanvasElement>()
let chart: Chart<'pie', number[], string>

onMounted(() => {
  const { labels, datasets } = parseBarChartData(props.data)
  chart = new Chart<'pie', number[], string>(
    <HTMLCanvasElement>canvasRef.value,
    {
      type: 'bar',
      responsive: true,
      options: {
        scales: {
          x: { stacked: true },
          y: { stacked: true }
        },
      },
      data: {
        labels,
        datasets
      }
    }
  )
})

onUnmounted(() => {
  chart.destroy()
})

watch(() => props.data, (newData: BarChartData) => {
  const { labels, datasets } = parseBarChartData(props.data)
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
