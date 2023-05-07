<script setup lang="ts">
import type { PieChartData } from '@/components/ui/charts/chart-value.interface'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { Chart } from 'chart.js'

const props = defineProps<{
  data: PieChartData
}>()

const canvasRef = ref<HTMLCanvasElement>()
let chart: Chart<'pie', number[], string>

function parseData (data: PieChartData): { labels: string[], data: number[] } {
  return data.reduce((carry: { labels: string[], data: number[] }, data) => {
    carry.labels.push(data.label)
    carry.data.push(data.value)
    return carry
  }, { labels: [], data: [] })
}

onMounted(() => {
  const { labels, data } = parseData(props.data)
  chart = new Chart<'pie', number[], string>(
    <HTMLCanvasElement>canvasRef.value,
    {
      type: 'pie',
      responsive: true,
      data: {
        labels,
        datasets: [{ data }]
      }
    }
  )
})

onUnmounted(() => {
  chart.destroy()
})

watch(() => props.data, (newData: PieChartData) => {
  const { labels, data } = parseData(props.data)
  chart.data.labels = labels
  chart.data.datasets[0].data = data
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
