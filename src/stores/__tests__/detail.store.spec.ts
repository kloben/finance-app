import { afterAll, beforeAll, beforeEach, describe, vi, it, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useDetailStore } from '../detail.store'
import {TestMonths} from "../../services/__mocks__/test-data";
import {fetchMonths, fetchPayments} from "../../services/__mocks__/db.service";
import {getEmptyMonth} from "../../helpers/data.helper";

describe('DetailStore', () => {
  beforeAll(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2023, 3, 30))
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
    const store = useDetailStore()

    expect(store.monthId).toBe(null)
    expect(store.month).toEqual(null)
    expect(store.payments).toEqual([])
  })

  it('loads month data', async () => {
    const store = useDetailStore()
    await store.loadMonth('2023-04')

    expect(store.monthId).toBe('2023-04')
    expect(store.month).toEqual(TestMonths['2023-04'])
    expect(store.payments.length).toBe(2)

    expect(fetchMonths).toHaveBeenCalledTimes(1)
    expect(fetchMonths).toHaveBeenCalledWith(['2023-04'])
    expect(fetchPayments).toHaveBeenCalledTimes(1)
    expect(fetchPayments).toHaveBeenCalledWith('2023-04')
  })

  it('skip loading month if same as current', async () => {
    const store = useDetailStore()
    store.monthId = '2023-04'
    await store.loadMonth('2023-04')

    expect(store.monthId).toBe('2023-04')
    expect(store.month).toEqual(getEmptyMonth('2023-04'))

    expect(fetchMonths).toHaveBeenCalledTimes(0)
    expect(fetchPayments).toHaveBeenCalledTimes(0)
  })
})
