import { afterAll, beforeAll, beforeEach, describe, vi, it, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { usePredictionsStore } from '../predictions.store'
import { getEmptyMonth } from '../../helpers/data.helper'
import { fetchMonths } from '../../services/__mocks__/db.service'
import { TestMonths } from '../../services/__mocks__/data'
import { useGlobalStore } from '../global.store'

describe('HomeStore', () => {
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
    const store = usePredictionsStore()

    expect(store.isInit).toBe(false)
    expect(store.monthId).toBe('2023-04')
    expect(store.pastIds).toEqual(['2023-02', '2023-03', '2023-04'])
    expect(store.nextIds).toEqual(['2023-05', '2023-06', '2023-07', '2023-08'])

    expect(store.actual).toEqual(getEmptyMonth('2023-04'))
    expect(store.predictions).toEqual([getEmptyMonth('2023-05'), getEmptyMonth('2023-06'), getEmptyMonth('2023-07'), getEmptyMonth('2023-08')])
  })

  it('inits successfully', async () => {
    useGlobalStore().init()
    const store = usePredictionsStore()
    await store.init()

    expect(store.isInit).toBe(true)
    expect(store.actual).toEqual(TestMonths['2023-04'])
    expect(store.predictions[0]).toEqual(
      {
        monthId: '2023-05',
        income: 59.33333333333333,
        outcome: 118.66666666666666,
        totals: {
          inCat: 59.33333333333333,
          outCat: 118.66666666666666,
        }
      }
    )

    expect(fetchMonths).toHaveBeenCalledTimes(1)
    expect(fetchMonths).toHaveBeenCalledWith(['2023-02', '2023-03', '2023-04'])
  })

  it('skips init if already initialized', async () => {
    const store = usePredictionsStore()
    store.isInit = true
    await store.init()

    expect(fetchMonths).toHaveBeenCalledTimes(0)
  })
})
