import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import {
  calculateNextMonthIds,
  calculatePastMonthIds,
  modifyMonthId,
  toDayId, toDayLabel,
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

  it('calculates pastMonthIds including current', () => {
    expect(calculatePastMonthIds(3)).toEqual(['2023-03', '2023-04', '2023-05'])
  })

  it('calculates nextMonthIds excluding current', () => {
    expect(calculateNextMonthIds(3)).toEqual(['2023-06', '2023-07', '2023-08'])
  })

  it('calculates dayId', () => {
    expect(toDayId(date)).toBe('2023-05-30')
  })

  it('calculates monthId', () => {
    expect(toMonthId(date)).toBe('2023-05')
  })

  it('calculates month label from date', () => {
    expect(toMonthLabel(date)).toBe('May')
  })

  it('calculates month label from monthId', () => {
    expect(toMonthLabel(toMonthId(date))).toBe('May')
  })
  
  it('calculates day label', () => {
    expect(toDayLabel('2023-05-30')).toBe('May 30')
  })

  it('modifies monthId without year change', () => {
    expect(modifyMonthId('2023-05', 1)).toBe('2023-06')
  })

  it('modifies monthId with year change', () => {
    expect(modifyMonthId('2023-01', -1)).toBe('2022-12')
  })
  

  


})
