import { describe, it, expect } from 'vitest'

import VgButton from '../VgButton.vue'
import { mount } from '@vue/test-utils'

describe('VgButton', () => {
  it('renders without props', () => {
    const wrapper = mount(VgButton)
    expect(wrapper.text()).toContain('')
  })
})
