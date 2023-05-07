export interface BarChartValue {
  label: string
  up: number
  down: number
  predicted?: boolean
}

export interface PieChartValue {
  label: string
  value: number
}
