import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { type BarChartData, type PieChartData, parseBarChartData, parsePieChartData, } from '../chart.helper'
import { AppColor } from '../../styles/colors'

describe('Chart helper', () => {
  beforeAll(() => {
    vi.mock('../number.helper.ts')
  })

  afterAll(() => {
    vi.resetAllMocks()
  })

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

  describe('parsePieChartData', () => {
    it('Returns empty data', () => {
      const input: PieChartData = []

      expect(parsePieChartData(input)).toEqual({
        labels: [],
        datasets: [{ data: [], backgroundColor: [] }]
      })
    })

    it('Parses single item', () => {
      const input: PieChartData = [
        { label: 'SomeLabel', value: 123 }
      ]

      expect(parsePieChartData(input)).toEqual({
        labels: ['SomeLabel'],
        datasets: [
          { data: [123], backgroundColor: [AppColor.chartColor1] }
        ]
      })
    })
  })
})
