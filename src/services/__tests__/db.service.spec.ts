import { describe, it, expect, beforeAll, vi } from 'vitest'
import { fetchMonths } from '../db.service'

describe('DB Service', () => {
  beforeAll(async () => {
    vi.mock('dexie')
  })

  it('clears undefined months on fetchMonths', async () => {
    const result = await fetchMonths(['2023-05', '2023-04', '2023-03', '2023-02', '2023-01'])
    expect(result).toEqual([
      { monthId: '2023-05', income: 123, outcome: 321 },
      { monthId: '2023-04', income: 456, outcome: 654 }
    ])
  })
})
