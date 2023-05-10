import type { BarChartData } from '@/components/ui/charts/chart-value.interface'
import { AppColor } from '@/styles/colors'

interface SetData {
  data: number[]
  backgroundColor: string[]
}

interface ParsedData {
  labels: string[]
  datasets: [SetData, SetData]
}

export function parseBarChartData (inputData: BarChartData): ParsedData {
  const parsed: ParsedData = {
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }, { data: [], backgroundColor: [] }]
  }
  for (const input of inputData) {
    parsed.labels.push(input.label)
    parsed.datasets[0].data.push(input.up)
    parsed.datasets[0].backgroundColor.push(AppColor.chartPositive)
    parsed.datasets[1].data.push(-input.down)
    parsed.datasets[1].backgroundColor.push(AppColor.chartNegative)
  }
  return parsed
}

export const barChartOptions = {
  scales: {
    x: {
      stacked: true,
      grid: {
        color: AppColor.lightGrey,
        tickLength: 0
      },
      ticks: {
        padding: 8,
        color: AppColor.darkGrey
      },
      border: {
        display: false
      }
    },
    y: {
      grid: {
        color: AppColor.lightGrey,
        tickLength: 0
      },
      ticks: {
        padding: 12,
        color: AppColor.grey
      },
      border: {
        display: false
      }
    }
  },
  datasets: {
    bar: {
      barThickness: 16,
      borderRadius: 14
    }
  }
}