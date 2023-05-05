import { describe, expect, it } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import type { ChartValue } from '../../../../models/chart-value.interface'
import VgBarChart from '../VgBarChart.vue'

function generateWrapper (values: ChartValue[] = []): VueWrapper {
  return mount(VgBarChart, {
    props: {
      values
    }
  })
}

function getValues (wrapper: VueWrapper): { labelX: string[], labelY: string[], bars: string[][] } {
  const bars = wrapper.get('.chart-bars').findAll('.column')
    .map(col => col.findAll('.bar')
      .map(el => (el.element.getAttribute('style') ?? '')
        .replace('height:', '').replace(';', '').trim()))
  return {
    bars,
    labelX: wrapper.get('.chart-x-axis').findAll('.text-body-2').map(el => el.text()),
    labelY: wrapper.get('.chart-y-axis').findAll('.text-caption').map(el => el.text())
  }
}

const testData: ChartValue[] = [
  { label: 'Label1', up: 10, down: 20 },
  { label: 'Label2', up: 30, down: 40 }
]

describe('BarChart', () => {
  it('renders with empty content', () => {
    const wrapper = generateWrapper()

    const { labelX, labelY, bars } = getValues(wrapper)

    expect(labelX).toEqual([])
    expect(labelY).toEqual(['0'])
    expect(bars).toEqual([])
  })

  it('renders with content', () => {
    const wrapper = generateWrapper(testData)

    const { labelX, labelY, bars } = getValues(wrapper)

    expect(labelX).toEqual(['Label1', 'Label2'])
    expect(labelY).toEqual(['44', '22', '0', '-22', '-44'])
    expect(bars).toEqual([['23%', '45%'], ['68%', '91%']])
  })
})
