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
