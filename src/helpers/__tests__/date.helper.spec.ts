import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import {
  calculateNextMonthIds,
  calculatePastMonthIds,
  modifyMonthId,
  toDayId,
  toMonthId,
  toMonthLabel
} from '../date.helper'

const date = new Date(2023, 4, 30)

describe('DateHelper', () => {
  beforeAll(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2023, 4, 30))
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it('Calculates dayId', () => {
    expect(toDayId(date)).toBe('2023-05-30')
  })

  it('Calculates monthId', () => {
    expect(toMonthId(date)).toBe('2023-05')
  })

  it('Calculates month label from date', () => {
    expect(toMonthLabel(date)).toBe('May')
  })

  it('Calculates month label from monthId', () => {
    expect(toMonthLabel(toMonthId(date))).toBe('May')
  })

  it('modifies monthId without year change', () => {
    expect(modifyMonthId('2023-05', 1)).toBe('2023-06')
  })

  it('modifies monthId with year change', () => {
    expect(modifyMonthId('2023-01', -1)).toBe('2022-12')
  })

  it('calculates pastMonthIds including current', () => {
    expect(calculatePastMonthIds(3)).toEqual(['2023-03', '2023-04', '2023-05'])
  })

  it('calculates nextMonthIds', () => {
    expect(calculateNextMonthIds(3)).toEqual(['2023-06', '2023-07', '2023-08'])
  })
})
