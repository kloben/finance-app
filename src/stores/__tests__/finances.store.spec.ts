import { describe, it, expect, beforeEach, beforeAll, vi, afterAll } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useGlobalStore } from '../global.store'
import { PaymentType } from '../../models/payment.interface'

describe('FinanceStore', () => {
  beforeAll(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2023, 4, 30))
    vi.mock('../../services/db.service.ts')
  })
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  afterAll(() => {
    vi.useRealTimers()
  })

  it('inits with mock values', async () => {
    const store = useGlobalStore()
    await store.init()

    expect(store.savings).toBe(15000)
    expect(store.monthIds).toEqual(['2023-01', '2023-02', '2023-03', '2023-04', '2023-05'])
    expect(store.lastMonths).toEqual([
      { monthId: '2023-01', income: 0, outcome: 0 },
      { monthId: '2023-02', income: 111, outcome: 222 },
      { monthId: '2023-03', income: 0, outcome: 0 },
      { monthId: '2023-04', income: 100, outcome: 200 },
      { monthId: '2023-05', income: 0, outcome: 0 }
    ])
    expect(store.currentMonth).toEqual({ monthId: '2023-05', income: 0, outcome: 0 })
  })

  it('updates savings', async () => {
    const store = useGlobalStore()
    await store.init()

    expect(store.savings).toBe(15000)
    await store.updateSavings(23000)
    expect(store.savings).toBe(23000)
  })

  it('creates income payment for existing month', async () => {
    const store = useGlobalStore()
    await store.init()

    await store.createPayment(new Date(2023, 3, 10), {
      type: PaymentType.in,
      amount: 123,
      category: 'test'
    })

    expect(store.savings).toBe(15123)
    expect(store.lastMonths).toEqual([
      { monthId: '2023-01', income: 0, outcome: 0 },
      { monthId: '2023-02', income: 111, outcome: 222 },
      { monthId: '2023-03', income: 0, outcome: 0 },
      { monthId: '2023-04', income: 223, outcome: 200 },
      { monthId: '2023-05', income: 0, outcome: 0 }
    ])
  })

  it('creates outcome payment for new month', async () => {
    const store = useGlobalStore()
    await store.init()

    await store.createPayment(new Date(2023, 2, 10), {
      type: PaymentType.out,
      amount: 321,
      category: 'test'
    })

    expect(store.savings).toBe(14679)
    expect(store.lastMonths).toEqual([
      { monthId: '2023-01', income: 0, outcome: 0 },
      { monthId: '2023-02', income: 111, outcome: 222 },
      { monthId: '2023-03', income: 0, outcome: 321 },
      { monthId: '2023-04', income: 100, outcome: 200 },
      { monthId: '2023-05', income: 0, outcome: 0 }
    ])
  })
})
