import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import VgInputNumber from '../forms/VgInputNumber.vue'

function generateWrapper (props = {}): VueWrapper {
  return mount(VgInputNumber, {
    props
  })
}

describe('VgInputNumber', () => {
  it('renders without initial value', () => {
    const wrapper = generateWrapper()

    expect(wrapper.get('input').element.value).toBe('0')
    expect(wrapper.find('.text-caption').exists()).toBe(false)
  })

  it('renders with initial value', () => {
    const wrapper = generateWrapper({
      modelValue: 123
    })

    expect(wrapper.get('input').element.value).toBe('123')
    expect(wrapper.find('.text-caption').exists()).toBe(false)
  })
  //
  it('renders label', () => {
    const wrapper = generateWrapper({
      modelValue: 123,
      label: 'Some label'
    })

    expect(wrapper.get('input').element.value).toBe('123')
    expect(wrapper.get('.text-caption').text()).toBe('Some label')
  })

  it('emits on value change', () => {
    const wrapper = generateWrapper()

    wrapper.get('input').setValue(321)

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([321])
  })

  it('not emits on incorrect input', () => {
    const wrapper = generateWrapper()

    wrapper.get('input').setValue('wrong')

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([0])
  })
})
