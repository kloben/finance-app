import { describe, it, expect, beforeAll, vi } from 'vitest'
import { fetchCategories, fetchMonth, fetchMonths, fetchPayments } from '../db.service'
import { TestCategories, TestMonths, TestPayments } from '../__mocks__/data'

describe('DB Service', () => {
  beforeAll(async () => {
    vi.mock('../db.client')
  })

  it('fetches existing month', async () => {
    const month = await fetchMonth('2023-04')

    expect(month).toEqual(TestMonths['2023-04'])
  })

  it('fetches new month', async () => {
    const month = await fetchMonth('2023-03')

    expect(month).toEqual({
      monthId: '2023-03',
      income: 0,
      outcome: 0,
      totals: {}
    })
  })

  it('fetches months even non existing', async () => {
    const months = await fetchMonths(['2023-03', '2023-04', '2023-05'])

    expect(months).toEqual([
      { monthId: '2023-03', income: 0, outcome: 0, totals: {} },
      { monthId: '2023-04', income: 100, outcome: 200, totals: { inCat: 100, outCat: 200 } },
      { monthId: '2023-05', income: 0, outcome: 0, totals: {} }
    ])
  })

  it('fetches empty month list', async () => {
    const months = await fetchMonths([])

    expect(months).toEqual([])
  })

  it('fetches existing payments', async () => {
    const payments = await fetchPayments('2023-04')
    expect(payments).toEqual([TestPayments['1'], TestPayments['2']])
  })

  it('fetches new payments', async () => {
    const payments = await fetchPayments('2023-03')
    expect(payments).toEqual([])
  })

  it('fetches categories', async () => {
    const categories = await fetchCategories()
    expect(categories).toEqual(Object.values(TestCategories))
  })
})
