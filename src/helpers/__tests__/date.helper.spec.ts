import { describe, expect, it } from 'vitest'
import { toDayId, toMonthId, toMonthLabel } from '../date.helper'

const date = new Date(2023, 4, 30)

describe('DateHelper', () => {
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
})
