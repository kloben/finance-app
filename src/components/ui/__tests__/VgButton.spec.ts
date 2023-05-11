import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import VgButton, { type VgButtonProps } from '../VgButton.vue'

function generateWrapper (props: VgButtonProps = {}): VueWrapper {
  return mount(VgButton, {
    slots: {
      default: 'Some text'
    },
    props
  })
}

describe('VgButton', () => {
  it('renders without props', () => {
    const wrapper = generateWrapper()
    const element = wrapper.get('.vg-button')

    expect(wrapper.text()).toEqual('Some text')
    expect(element.classes()).toEqual(['vg-button', 'light'])
    expect(element.attributes()).not.haveOwnProperty('disabled')
    expect(element.attributes('type')).toBe('button')
  })

  it('emits clicks', () => {
    const wrapper = generateWrapper()

    wrapper.get('.vg-button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('not emits if disabled', () => {
    const wrapper = generateWrapper({
      disabled: true
    })
    const element = wrapper.get('.vg-button')

    element.trigger('click')
    expect(element.attributes()).haveOwnProperty('disabled')
    expect(wrapper.emitted()).not.toHaveProperty('clicked')
  })

  it('applies type', () => {
    const wrapper = generateWrapper({
      type: 'submit'
    })
    const element = wrapper.get('.vg-button')

    expect(element.classes()).toEqual(['vg-button', 'light'])
    expect(element.attributes()).not.haveOwnProperty('disabled')
    expect(element.attributes('type')).toBe('submit')
  })

  it('applies mode', () => {
    const wrapper = generateWrapper({
      mode: 'dark'
    })
    const element = wrapper.get('.vg-button')

    expect(element.classes()).toEqual(['vg-button', 'dark'])
    expect(element.attributes()).not.haveOwnProperty('disabled')
    expect(element.attributes('type')).toBe('button')
  })
})
