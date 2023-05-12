import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
// @ts-ignore
import VgInput, {type VgInputProps} from '../VgInput.vue'

function generateWrapper (props: VgInputProps = {}): VueWrapper {
  return mount(VgInput, {
    props
  })
}

describe('VgInput', () => {
  it('renders without initial value', () => {
    const wrapper = generateWrapper()
    const inputElement = wrapper.get('input')

    expect(inputElement.element.value).toBe('')
    expect(inputElement.attributes()['placeholder']).toBe('')
  })

  it('renders with initial value', () => {
    const wrapper = generateWrapper({modelValue: 'Some text'})
    const inputElement = wrapper.get('input')

    expect(inputElement.element.value).toBe('Some text')
  })

  it('renders placeholder', () => {
    const wrapper = generateWrapper({
      modelValue: 'Some text',
      label: 'Some label'
    })
    const inputElement = wrapper.get('input')

    expect(inputElement.element.value).toBe('Some text')
    expect(inputElement.attributes()['placeholder']).toBe('Some label')
  })

  it('emits on value change', () => {
    const wrapper = generateWrapper()

    wrapper.get('input').setValue('NewValue')

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
  })
})
