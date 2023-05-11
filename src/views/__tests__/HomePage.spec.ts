import { describe, it, afterAll, beforeAll, beforeEach, vi, expect } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { flushPromises, mount, VueWrapper } from '@vue/test-utils';
import { useGlobalStore } from '../../stores/global.store';
import HomePage from '../HomePage.vue';
import { useHomeStore } from '../../stores/home.store';

function generateWrapper (): VueWrapper<HomePage> {
  return mount(HomePage, {
    global: {
      stubs: ['VgBarChart', 'VgPieChart']
    }
  })
}

describe('HomePage', () => {
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
    await useHomeStore().init()
    const wrapper = generateWrapper()
    await flushPromises()

    expect(wrapper.get('.home-summary').get('.value').text()).toBe('€15,000')
    expect(wrapper.vm.barData).toEqual([
      { label: 'Dec', up: 0, down: 0 },
      { label: 'Jan', up: 0, down: 0 },
      { label: 'Feb', up: 111, down: 222 },
      { label: 'Mar', up: 0, down: 0 },
      { label: 'Apr', up: 100, down: 200 }
    ])
    expect(wrapper.vm.pieData).toEqual([{ label: 'Second category', value: 200, }])
  })
})