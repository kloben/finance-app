import { describe, it, afterAll, beforeAll, beforeEach, vi, expect } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { flushPromises, shallowMount, VueWrapper } from '@vue/test-utils';
import DetailPage from '../DetailPage.vue';
import { useGlobalStore } from '../../stores/global.store';
import { TestPayments } from "../../services/__mocks__/test-data";

function generateWrapper (): VueWrapper<DetailPage> {
  return shallowMount(DetailPage)
}

describe('DetailPage', () => {
  beforeAll(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2023, 3, 30))
    vi.mock('../../services/db.service.ts')
  })
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  afterAll(() => {
    vi.useRealTimers()
  })

  it('Mounts with current data', async () => {
    await useGlobalStore().init()
    const wrapper = generateWrapper()
    await flushPromises()

    expect(wrapper.get('.selector').text()).toBe('Apr')
    expect(wrapper.vm.canGoBack).toBe(true)
    expect(wrapper.vm.canGoNext).toBe(false)
    expect(wrapper.vm.pieData).toEqual([
      { label: 'First category', value: 100 },
      { label: 'Second category', value: 200 }
    ])
    expect(wrapper.vm.sortedPayments).toEqual([TestPayments[2], TestPayments[1]])
  })

  it('Changes to previous month', async () => {
    await useGlobalStore().init()
    const wrapper = generateWrapper()
    await flushPromises()
    wrapper.vm.changeMonth(-1)
    await flushPromises()

    expect(wrapper.get('.selector').text()).toBe('Mar')
    expect(wrapper.vm.canGoBack).toBe(true)
    expect(wrapper.vm.canGoNext).toBe(true)
    expect(wrapper.vm.pieData).toEqual([])
    expect(wrapper.vm.sortedPayments).toEqual([])
  })
})