import { AppColor } from '@/styles/colors'
import { shuffle } from '@/helpers/number.helper'
import type { ChartOptions } from 'chart.js/dist/types'
import type { LayoutPosition } from 'chart.js/dist/types/layout'

export type BarChartData = {
  label: string
  up: number
  down: number
  predicted?: boolean
}[]

export type PieChartData = {
  label: string
  value: number
}[]

interface SetData {
  data: number[]
  backgroundColor: string[]
}

interface BarParsedData {
  labels: string[]
  datasets: [SetData, SetData]
}

interface PieParsedData {
  labels: string[]
  datasets: [SetData]
}

export function parseBarChartData (inputData: BarChartData): BarParsedData {
  const parsed: BarParsedData = {
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

export function parsePieChartData (inputData: PieChartData): PieParsedData {
  const colors = shuffle([AppColor.chartColor1, AppColor.chartColor2, AppColor.chartColor3, AppColor.chartColor4, AppColor.chartColor5, AppColor.chartColor6])
  const parsed: PieParsedData = {
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }]
  }
  for (const [index, input] of inputData.entries()) {
    parsed.labels.push(input.label)
    parsed.datasets[0].data.push(input.value)
    parsed.datasets[0].backgroundColor.push(colors[index])
  }
  return parsed
}

export const barChartOptions: ChartOptions = {
  responsive: true,
  animation: false,
  plugins: {
    legend: {
      display: false
    }
  },
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
        color: AppColor.grey,
        maxTicksLimit: 7
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

export const pieChartOptions = (position?: LayoutPosition): ChartOptions => ({
  responsive: true,
  parsing: false,
  animation: false,
  plugins: {
    legend: {
      position: position ?? 'right',
      onClick: () => {},
      labels: {
        boxWidth: 22
      }
    }
  }
})
