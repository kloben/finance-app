import { describe, it, expect, beforeAll, vi } from 'vitest'
import { fetchCategories, fetchMonth, fetchPayments } from '../db.service'
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

  // it('clears undefined months on fetchMonths', async () => {
  //   const result = await fetchMonths(['2023-05', '2023-04', '2023-03', '2023-02', '2023-01'])
  //   expect(result).toEqual([
  //     { monthId: '2023-05', income: 123, outcome: 321 },
  //     { monthId: '2023-04', income: 456, outcome: 654 }
  //   ])
  // })
})
