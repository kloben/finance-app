<script setup lang="ts">
import type { IPayment } from '@/models/payment.interface'
import { PaymentType } from '@/models/payment.interface'
import { computed } from 'vue'
import { toCurrency } from '@/helpers/number.helper'
import { toDayLabel } from '@/helpers/date.helper'
import { useGlobalStore } from '@/stores/global.store'

const store = useGlobalStore()

const props = defineProps<{
  payment: IPayment
}>()

const icon = computed<string>(() => store.getCategory(props.payment.category)?.icon ?? '❔')

const label = computed<string>(() => store.getCategory(props.payment.category)?.label ?? 'Other')

const amount = computed<string>(() => toCurrency(props.payment.amount * (props.payment.type === PaymentType.in ? 1 : -1)))

const date = computed<string>(() => toDayLabel(props.payment.dayId))
</script>

<template>
  <div class="payment-container">
    <div class="icon">
      {{ icon }}
    </div>
    <div class="labels">
      <div class="category">{{ label }}</div>
      <div class="description" v-if="payment.description">{{ payment.description }}</div>
    </div>
    <div class="data">
      <div class="amount" :class="payment.type">{{ amount }}</div>
      <div class="date">{{ date }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "src/styles/colors";

.payment-container {
  display: flex;
  gap: 20px;
  padding: 16px;
  margin-bottom: 2px;
  background: $white;
  color: $black;

  &:last-child {
    margin-bottom: 0;
  }
}

.icon, .labels, .data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
}

.icon {
  width: 28px;
  height: 28px;
  background: rgba(255, 0, 114, 0.05);
  border-radius: 6px;
  font-size: 17px;
  line-height: 20px;
  align-items: center;
}

.labels {
  flex: 1;

  .category {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
  }

  .description {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    opacity: 0.4;
  }
}

.data {
  align-items: end;

  .amount {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;

    &.income {
      color: $chart-positive;
    }

    &.outcome {
      color: $chart-negative;
    }
  }

  .date {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    opacity: 0.4;
  }
}
</style>
