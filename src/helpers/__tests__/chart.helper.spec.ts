import { describe, expect, it } from 'vitest'
import { parseBarChartData } from '../chart.helper'
import type { BarChartData } from '../../components/ui/charts/chart-value.interface'
import { AppColor } from '../../styles/colors'

describe('Chart helper', () => {
  describe('parseBarChartData', () => {
    it('Returns empty data', () => {
      const input: BarChartData = []

      expect(parseBarChartData(input)).toEqual({
        labels: [],
        datasets: [{ data: [], backgroundColor: [] }, { data: [], backgroundColor: [] }]
      })
    })

    it('Parses single item', () => {
      const input: BarChartData = [
        { label: 'SomeLabel', up: 123, down: 321 }
      ]

      expect(parseBarChartData(input)).toEqual({
        labels: ['SomeLabel'],
        datasets: [
          { data: [123], backgroundColor: [AppColor.chartPositive] },
          { data: [-321], backgroundColor: [AppColor.chartNegative] }
        ]
      })
    })
  })
})
