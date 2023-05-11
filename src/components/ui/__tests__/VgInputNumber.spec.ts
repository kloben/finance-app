import {describe, it, expect} from 'vitest'
import {mount, VueWrapper} from '@vue/test-utils'
import VgInputNumber, {type VgInputNumberProps} from '../VgInputNumber.vue'

function generateWrapper(props: VgInputNumberProps = {}): VueWrapper {
  return mount(VgInputNumber, {
    props
  })
}

describe('VgInputNumber', () => {
  it('renders without initial value', () => {
    const wrapper = generateWrapper()
    const inputElement = wrapper.get('input')

    expect(inputElement.element.value).toBe('')
    expect(inputElement.attributes()['placeholder']).toBe('')
  })

  it('renders with initial value', () => {
    const wrapper = generateWrapper({modelValue: 123})
    const inputElement = wrapper.get('input')

    expect(inputElement.element.value).toBe('123')
  })

  it('renders placeholder', () => {
    const wrapper = generateWrapper({
      modelValue: 123,
      label: 'Some label'
    })
    const inputElement = wrapper.get('input')

    expect(inputElement.element.value).toBe('123')
    expect(inputElement.attributes()['placeholder']).toBe('Some label')
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
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([undefined])
  })
})
