import { describe, it, expect, beforeEach, beforeAll, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import type { IPayment } from "../../models/payment.interface";
import PaymentInfo from "../PaymentInfo.vue";
import { TestPayments } from "../../services/__mocks__/test-data";
import { createPinia, setActivePinia } from "pinia";
import { useGlobalStore } from "../../stores/global.store";

function generateWrapper (payment?: IPayment): VueWrapper {
  return mount(PaymentInfo, {
    props: {
      payment: payment ?? TestPayments[1]
    }
  })
}

describe('PaymentInfo', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  beforeAll(() => {
    vi.mock('../../services/db.service.ts')
  })

  it('Mounts with income payment data', async () => {
    const wrapper = generateWrapper()
    const store = useGlobalStore()
    await store.init()

    expect(wrapper.get('.icon').text()).toBe('IC1')
    expect(wrapper.get('.category').text()).toBe('First category')
    expect(wrapper.get('.description').text()).toBe('Some description 1')
    expect(wrapper.get('.amount').text()).toBe('€100')
    expect(wrapper.get('.date').text()).toBe('Apr 15')
  })

  it('Mounts with outcome payment data', async () => {
    const wrapper = generateWrapper(TestPayments[2])
    const store = useGlobalStore()
    await store.init()

    expect(wrapper.get('.icon').text()).toBe('IC2')
    expect(wrapper.get('.category').text()).toBe('Second category')
    expect(wrapper.find('.description').exists()).toBe(false)
    expect(wrapper.get('.amount').text()).toBe('-€200')
    expect(wrapper.get('.date').text()).toBe('Apr 20')
  })

  it('Mounts with unknown category payment data', async () => {
    const wrapper = generateWrapper({
      ...TestPayments[2],
      category: 'new'
    })
    const store = useGlobalStore()
    await store.init()

    expect(wrapper.get('.icon').text()).toBe('❔')
    expect(wrapper.get('.category').text()).toBe('Other')
    expect(wrapper.find('.description').exists()).toBe(false)
    expect(wrapper.get('.amount').text()).toBe('-€200')
    expect(wrapper.get('.date').text()).toBe('Apr 20')
  })
})