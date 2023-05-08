import { afterAll, beforeAll, beforeEach, describe, vi, it, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useDetailStore } from '../detail.store'

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
})
