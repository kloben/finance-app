<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useDetailStore } from '@/stores/detail.store'
import { toMonthId, toMonthLabel } from '@/helpers/date.helper'
import PaymentInfo from '@/components/PaymentInfo.vue'
import type { IPayment } from '@/models/payment.interface'

const store = useDetailStore()

onMounted(() => {
  store.loadMonth(toMonthId(new Date()))
})

const cleanDate = computed<string>(() => {
  if (!store.monthId) {
    return ''
  }
  return `${toMonthLabel(store.monthId)} ${store.monthId.split('-')[0]}`
})

const sortedPayments = computed<IPayment[]>(() => {
  return [...store.payments].sort((a, b) => `${a.dayId}-${a.createdAt}` > `${b.dayId}-${b.createdAt}` ? -1 : 1)
})
</script>

<template>
  <div class="page-wrapper">
    <div class="text-title-4">Summary for {{ cleanDate }}</div>
    <div class="payments-container" v-if="sortedPayments.length">
      <PaymentInfo v-for="payment of sortedPayments" :key="payment.id" :payment="payment" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "src/styles/colors";

.payments-container {
  padding: 8px 16px;
  background: $white;
  border-radius: 4px;
  max-width: 550px;
  margin: 32px auto 0 auto;
}
</style>
