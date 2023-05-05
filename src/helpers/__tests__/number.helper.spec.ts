import { describe, expect, it } from 'vitest'
import { toCurrency } from '../number.helper'

describe('NumberHelper', () => {
  it('Returns short currency', () => {
    expect(toCurrency(123)).toBe('€123')
  })

  it('Returns long currency', () => {
    expect(toCurrency(1234567.89)).toBe('€1,234,567.89')
  })

  it('Returns decimal currency', () => {
    expect(toCurrency(1234.89)).toBe('€1,234.89')
  })
})
