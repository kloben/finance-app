export interface BarChartValue {
  label: string
  up: number
  down: number
  predicted?: boolean
}

export type PieChartData = {
  label: string
  value: number
}[]
