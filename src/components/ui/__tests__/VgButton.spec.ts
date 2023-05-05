import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import VgButton from '../VgButton.vue'

function generateWrapper (props = {}): VueWrapper {
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

    expect(wrapper.text()).toEqual('Some text')
  })

  it('emits clicks', () => {
    const wrapper = generateWrapper()

    wrapper.get('.vg-button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('clicked')
  })

  it('not emits if disabled', () => {
    const wrapper = generateWrapper({
      disabled: true
    })

    wrapper.get('.vg-button').trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('clicked')
  })

  it('applies styles', () => {
    const wrapper = generateWrapper({
      type: 'clear',
      size: 'small'
    })

    const classes = wrapper.get('.vg-button').classes()
    expect(classes).toContain('clear')
    expect(classes).toContain('small')
  })
})
