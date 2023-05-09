import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useGlobalStore } from '../global.store'
import { PaymentType } from '../../models/payment.interface'
import { fetchMonths, fetchPayments } from '../../services/__mocks__/db.service'
import { getEmptyMonth } from '../../helpers/data.helper'

describe('GlobalStore', () => {
  beforeAll(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2023, 4, 30))
    vi.mock('../../services/db.service.ts')
  })
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })
  afterAll(() => {
    vi.useRealTimers()
  })

  it('mounts with empty values', () => {
    const store = useGlobalStore()
    expect(store.savings).toBe(15000)
    expect(store.categories.size).toBe(0)
    expect(store.months.size).toBe(0)
    expect(store.payments.size).toBe(0)
  })

  it('inits with empty values', async () => {
    const store = useGlobalStore()
    await store.init()

    expect(store.savings).toBe(15000)
    expect(store.months.size).toBe(0)
    expect(store.payments.size).toBe(0)
    expect(Array.from(store.categories.keys())).toEqual(['inCat', 'outCat'])
  })

  it('gets all categories of type', async () => {
    const store = useGlobalStore()
    await store.init()

    expect(store.getCategories(PaymentType.in)).toEqual([{ id: 'inCat', label: 'First category', type: 'income' }])
  })

  it('gets existing category ', async () => {
    const store = useGlobalStore()
    await store.init()

    expect(store.getCategory('inCat')).toEqual({ id: 'inCat', label: 'First category', type: 'income' })
  })

  it('gets non existing category ', async () => {
    const store = useGlobalStore()
    await store.init()

    expect(store.getCategory('new')).toEqual({ id: '', label: 'Other' })
  })

  it('inits new months', async () => {
    const store = useGlobalStore()
    await store.loadMonths(['2023-04', '2023-05'])

    expect(store.months.size).toBe(2)
    expect(store.payments.size).toBe(0)
    expect(fetchMonths).toHaveBeenCalledTimes(1)
    expect(fetchMonths).toHaveBeenCalledWith(['2023-04', '2023-05'])
  })

  it('skip init existing months', async () => {
    const store = useGlobalStore()
    store.months.set('2023-04', getEmptyMonth('2023-04'))
    await store.loadMonths(['2023-04', '2023-05'])

    expect(fetchMonths).toHaveBeenCalledTimes(1)
    expect(fetchMonths).toHaveBeenCalledWith(['2023-05'])
  })

  it('skip init if all months exist', async () => {
    const store = useGlobalStore()
    store.months.set('2023-04', getEmptyMonth('2023-04'))
    store.months.set('2023-05', getEmptyMonth('2023-05'))
    await store.loadMonths(['2023-04', '2023-05'])

    expect(fetchMonths).toHaveBeenCalledTimes(0)
  })

  it('inits new month payments', async () => {
    const store = useGlobalStore()
    await store.loadPayments('2023-04')

    expect(fetchPayments).toHaveBeenCalledTimes(1)
    expect(fetchPayments).toHaveBeenCalledWith('2023-04')
    expect(store.payments.get('2023-04')!.size).toBe(2)
  })

  it('skips existing month payments', async () => {
    const store = useGlobalStore()
    store.payments.set('2023-05', new Map())
    await store.loadPayments('2023-05')

    expect(fetchPayments).toHaveBeenCalledTimes(0)
  })

  it('updates savings', async () => {
    const store = useGlobalStore()

    expect(store.savings).toBe(15000)
    await store.updateSavings(23000)
    expect(store.savings).toBe(23000)
  })

  it('creates new payment without init', async () => {
    const store = useGlobalStore()

    await store.createPayment(new Date(2023, 3, 10), {
      type: PaymentType.in,
      amount: 123,
      category: 'inCat'
    })

    expect(store.savings).toBe(15123)
    expect(Array.from(store.months.values())).toEqual([
      {
        monthId: '2023-04',
        income: 223,
        outcome: 200,
        totals: {
          inCat: 223,
          outCat: 200
        }
      }
    ])
    expect(Array.from(store.payments.values())).toEqual([])
  })

  it('creates new payment with init', async () => {
    const store = useGlobalStore()
    await store.loadMonths(['2023-04'])

    await store.createPayment(new Date(2023, 3, 10), {
      type: PaymentType.in,
      amount: 222,
      category: 'inCat'
    })

    expect(store.savings).toBe(15222)
    expect(Array.from(store.months.values())).toEqual([
      {
        monthId: '2023-04',
        income: 322,
        outcome: 200,
        totals: {
          inCat: 322,
          outCat: 200
        }
      }
    ])
    expect(store.payments.size).toBe(0)
  })
})
