<script setup lang="ts">
import type { BarChartData } from '@/components/ui/charts/chart-value.interface'
import { onMounted, ref, watch } from 'vue'
import { Chart } from 'chart.js'

const props = defineProps<{
  data: BarChartData
}>()

const canvasRef = ref<HTMLCanvasElement>()
let chart: Chart<'pie', number[], string>

function parseData (data: BarChartData): { labels: string[], data: [number[], number[]] } {
  return data.reduce((carry: { labels: string[], data: [number[], number[]] }, data) => {
    carry.labels.push(data.label)
    carry.data[0].push(data.up)
    carry.data[1].push(-data.down)
    return carry
  }, { labels: [], data: [[], []] })
}

onMounted(() => {
  const { labels, data } = parseData(props.data)
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
        datasets: [
          { data: data[0] },
          { data: data[1] }
        ]
      }
    }
  )
})

watch(() => props.data, (newData: BarChartData) => {
  const { labels, data } = parseData(props.data)
  chart.data.labels = labels
  chart.data.datasets[0].data = data[0]
  chart.data.datasets[1].data = data[1]
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
