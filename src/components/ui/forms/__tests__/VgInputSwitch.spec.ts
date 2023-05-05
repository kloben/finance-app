import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import VgInputSwitch from '../VgInputSwitch.vue'

function generateWrapper (options: Record<string, string> = {}, modelValue?: string): VueWrapper {
  return mount(VgInputSwitch, {
    props: {
      options,
      modelValue
    }
  })
}

const testOptions = {
  first: 'First Value',
  second: 'Second Value'
}

describe('VgInputSwitch', () => {
  it('renders with empty options', () => {
    const wrapper = generateWrapper()
    const options = wrapper.find('.vg-input').findAll('.vg-button')

    expect(options.length).toBe(0)
  })

  it('renders disabled options', () => {
    const wrapper = generateWrapper(testOptions)
    const options = wrapper.find('.vg-input').findAll('.vg-button')
    const [first, second] = options

    expect(options.length).toBe(2)
    expect(first.text()).toBe('First Value')
    expect(first.classes()).include('disabled')
    expect(second.text()).toBe('Second Value')
    expect(second.classes()).include('disabled')
  })

  it('renders selected options', () => {
    const wrapper = generateWrapper(testOptions, 'first')
    const options = wrapper.find('.vg-input').findAll('.vg-button')
    const [first, second] = options

    expect(options.length).toBe(2)
    expect(first.text()).toBe('First Value')
    expect(first.classes()).not.include('disabled')
    expect(second.text()).toBe('Second Value')
    expect(second.classes()).include('disabled')
  })

  it('emits on option updated', () => {
    const wrapper = generateWrapper(testOptions, 'first')
    const options = wrapper.find('.vg-input').findAll('.vg-button')

    options[1].trigger('click')

    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['second'])
  })

  it('not emits on same option updated', () => {
    const wrapper = generateWrapper(testOptions, 'first')
    const options = wrapper.find('.vg-input').findAll('.vg-button')

    options[0].trigger('click')

    expect(wrapper.emitted()).not.toHaveProperty('update:modelValue')
  })
})
