import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import VgInput from '../forms/VgInput.vue'

function generateWrapper (props = {}): VueWrapper {
  return mount(VgInput, {
    props
  })
}

describe('VgInput', () => {
  it('renders without initial value', () => {
    const wrapper = generateWrapper()

    expect(wrapper.get('input').element.value).toBe('')
    expect(wrapper.find('.text-caption').exists()).toBe(false)
  })

  it('renders with initial value', () => {
    const wrapper = generateWrapper({
      modelValue: 'Some text'
    })

    expect(wrapper.get('input').element.value).toBe('Some text')
    expect(wrapper.find('.text-caption').exists()).toBe(false)
  })

  it('renders label', () => {
    const wrapper = generateWrapper({
      modelValue: 'Some text',
      label: 'Some label'
    })

    expect(wrapper.get('input').element.value).toBe('Some text')
    expect(wrapper.get('.text-caption').text()).toBe('Some label')
  })

  it('emits on value change', () => {
    const wrapper = generateWrapper()

    wrapper.get('input').setValue('NewValue')

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
  })
})
