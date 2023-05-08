import { describe, afterAll, beforeAll, beforeEach, vi, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useHomeStore } from '../home.store'
import { getEmptyMonth } from '../../helpers/data.helper'
import { TestMonths } from '../../services/__mocks__/data'
import { fetchMonths } from '../../services/__mocks__/db.service'

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
    const store = useHomeStore()

    expect(store.isInit).toBe(false)
    expect(store.currentMonthId).toBe('2023-04')
    expect(store.monthIds).toEqual(['2022-12', '2023-01', '2023-02', '2023-03', '2023-04'])

    expect(store.currentMonth).toEqual(getEmptyMonth('2023-04'))
    expect(store.lastMonths).toEqual([])
  })

  it('inits with month data', async () => {
    const store = useHomeStore()
    await store.init()

    expect(store.isInit).toBe(true)
    expect(store.currentMonth).toEqual(TestMonths['2023-04'])
    expect(store.lastMonths.length).toBe(5)

    expect(fetchMonths).toHaveBeenCalledTimes(1)
    expect(fetchMonths).toHaveBeenCalledWith(['2022-12', '2023-01', '2023-02', '2023-03', '2023-04'])
  })

  it('skips init if already initialized', async () => {
    const store = useHomeStore()
    store.isInit = true
    await store.init()

    expect(fetchMonths).toHaveBeenCalledTimes(0)
  })
})
