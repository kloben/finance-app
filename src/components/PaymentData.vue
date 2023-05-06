<script setup lang="ts">
import type { IPayment } from '@/models/payment.interface'
import { PaymentType } from '@/models/payment.interface'
import { computed } from 'vue'
import { IncomeCategory, OutcomeCategory } from '@/data/categories'
import { toCurrency } from '@/helpers/number.helper'
import { toMonthLabel } from '@/helpers/date.helper'

const props = defineProps<{
  payment: IPayment
}>()

const label = computed((): string => {
  return props.payment.type === PaymentType.in
    ? IncomeCategory[props.payment.category]
    : OutcomeCategory[props.payment.category]
})

const amount = computed((): string => {
  return toCurrency(props.payment.amount * (props.payment.type === PaymentType.in ? 1 : -1))
})

const date = computed((): { day: number, month: string } => {
  const date = new Date(props.payment.dayId)
  return {
    day: date.getDate(),
    month: toMonthLabel(date)
  }
})
</script>

<template>
  <div class="payment-container">
    <div class="date">
      <div class="text-body-1">{{ date.day }}</div>
      <div class="text-title-6">{{ date.month }}</div>
    </div>
    <div class="label">
      <div class="text-body-1">{{ label }}</div>
      <div class="text-subtitle-2">{{ payment.description }}</div>
    </div>
    <div class="text-title-6 amount">{{ amount }}</div>
  </div>
</template>

<style scoped lang="scss">
@import "src/styles/colors";

.payment-container {
  padding: 8px 0;
  border-bottom: 1px solid $base;
  display: flex;
  gap: 16px;
}

.date, .label, .amount {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
}

.date {
  align-items: center;
}

.label {
  flex: 1;
  text-align: start;
}

.amount {
  text-align: center;
}
</style>
