import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import VgInputSwitch, { type VgInputSwitchProps} from '../VgInputSwitch.vue'

function generateWrapper (props: Partial<VgInputSwitchProps> = {}): VueWrapper {
  return mount(VgInputSwitch, {
    props: {
      options: props.options ?? testOptions,
      modelValue: props.modelValue
    }
  })
}

const colorStyles = {
  grey: 'background: rgb(236, 236, 236);',
  primary: 'background: rgb(76, 28, 213);',
  red: 'background: red;',
  green: 'background: green;'
}

const testOptions = [
  { label: 'First Value', value: 'first', color: 'red' },
  { label: 'Second Value', value: 'second', color: 'green' },
]

describe('VgInputSwitch', () => {
  it('renders with empty options', () => {
    const wrapper = generateWrapper({options: []})
    const options = wrapper.find('.vg-input').findAll('.vg-switch')

    expect(options.length).toBe(0)
  })

  it('renders default options', () => {
    const wrapper = generateWrapper()
    const options = wrapper.find('.vg-input').findAll('.vg-switch')
    const [first, second] = options

    expect(options.length).toBe(2)
    expect(first.text()).toBe('First Value')
    expect(first.classes()).include('disabled')
    expect(first.attributes()['style']).toBe(colorStyles.grey)
    expect(second.text()).toBe('Second Value')
    expect(second.classes()).include('disabled')
    expect(second.attributes()['style']).toBe(colorStyles.grey)
  })

  it('renders with initial value', () => {
    const wrapper = generateWrapper({modelValue: 'first'})
    const options = wrapper.find('.vg-input').findAll('.vg-switch')
    const [first, second] = options

    expect(options.length).toBe(2)
    expect(first.text()).toBe('First Value')
    expect(first.classes()).not.include('disabled')
    expect(first.attributes()['style']).toBe(colorStyles.red)
    expect(second.text()).toBe('Second Value')
    expect(second.classes()).include('disabled')
    expect(second.attributes()['style']).toBe(colorStyles.grey)
  })

  it('renders default color if not provided', () => {
    const wrapper = generateWrapper({
      options: [
        { label: 'First Value', value: 'first' },
        { label: 'Second Value', value: 'second'},
      ],
      modelValue: 'second'
    })
    const options = wrapper.find('.vg-input').findAll('.vg-switch')
    const [first, second] = options

    expect(options.length).toBe(2)
    expect(first.attributes()['style']).toBe(colorStyles.grey)
    expect(second.attributes()['style']).toBe(colorStyles.primary)
  })

  it('emits on option updated', () => {
    const wrapper = generateWrapper({})
    const options = wrapper.find('.vg-input').findAll('.vg-switch')

    options[1].trigger('click')

    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['second'])
  })

  it('not emits on same option updated', () => {
    const wrapper = generateWrapper({modelValue: 'first'})
    const options = wrapper.find('.vg-input').findAll('.vg-switch')

    options[0].trigger('click')

    expect(wrapper.emitted()).not.toHaveProperty('update:modelValue')
  })
})
