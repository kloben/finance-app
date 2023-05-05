import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import VgInputCheck from '../forms/VgInputCheck.vue'

function generateWrapper (props = {}): VueWrapper {
  return mount(VgInputCheck, {
    props: {
      label: 'Some label',
      ...props
    }
  })
}

describe('VgInputCheck', () => {
  it('renders without initial value', () => {
    const wrapper = generateWrapper()

    const container = wrapper.find('.check-container')
    const label = wrapper.find('.text-body-2')

    expect(container.exists()).toBe(true)
    expect(container.classes()).not.contain('active')
    expect(label.text()).toBe('Some label')
  })

  it('renders with initial value', () => {
    const wrapper = generateWrapper({
      modelValue: true
    })

    const container = wrapper.find('.check-container')

    expect(container.exists()).toBe(true)
    expect(container.classes()).contain('active')
  })

  it('emits change on click', () => {
    const wrapper = generateWrapper({
      modelValue: false
    })

    const container = wrapper.get('.check-container')

    container.trigger('click')

    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([true])
  })
})
