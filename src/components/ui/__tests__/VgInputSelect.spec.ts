import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import VgInputSelect from '../VgInputSelect.vue'
import { reactive } from 'vue'

function generateWrapper (options: any[] = [], props = {}): VueWrapper {
  return mount(VgInputSelect, {
    props: {
      ...props,
      options: reactive(options)
    }
  })
}

const testOptions: { key: string, label: string }[] = [
  { key: 'key', label: 'value' },
  { key: 'key2', label: 'value2' }
]

describe('VgInputSelect', () => {
  it('renders with empty values', () => {
    const wrapper = generateWrapper()

    const selectElement = wrapper.get('select')
    const optionElements = selectElement.findAll('option')

    expect(selectElement.element.value).toBe('')
    expect(optionElements.length).toBe(1)
    expect(optionElements[0].text()).toBe('')
    expect(optionElements[0].element.value).toBe('')

    expect(wrapper.find('.text-caption').exists()).toBe(false)
  })

  it('renders with some values', () => {
    const wrapper = generateWrapper(testOptions)

    const selectElement = wrapper.get('select')
    const optionElements = selectElement.findAll('option')

    expect(selectElement.element.value).toBe('')
    expect(optionElements.length).toBe(3)
    expect(optionElements[0].text()).toBe('')
    expect(optionElements[0].element.value).toBe('')
    expect(optionElements[1].text()).toBe('value')
    expect(optionElements[1].element.value).toBe('key')
    expect(optionElements[2].text()).toBe('value2')
    expect(optionElements[2].element.value).toBe('key2')
  })

  it('renders with selected value', () => {
    const wrapper = generateWrapper(testOptions, {
      modelValue: 'key2'
    })

    const selectElement = wrapper.get('select')
    const optionElements = selectElement.findAll('option')

    expect(selectElement.element.value).toBe('key2')
    expect(optionElements.length).toBe(3)
  })

  it('emits on value update', () => {
    const wrapper = generateWrapper(testOptions, {
      modelValue: 'key'
    })

    const selectElement = wrapper.find('select')
    selectElement.setValue('key2')

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['key2'])
  })

  it('emits and reset on options change', async () => {
    const wrapper = generateWrapper(testOptions, {
      modelValue: 'key'
    })

    await wrapper.setProps({
      options: [{ key: 'new', label: 'options' }]
    })

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([undefined])
  })
})
