<script setup lang="ts">
import VgBarChart from '@/components/ui/charts/VgBarChart.vue'
import {useGlobalStore} from '@/stores/global.store'
import {computed, onMounted} from 'vue'
import type {IMonth} from '@/models/month.interface'
import {toMonthLabel} from '@/helpers/date.helper'
import {toCurrency} from '@/helpers/number.helper'
import PaymentData from '@/components/PaymentData.vue'
import {useHomeStore} from '@/stores/home.store'

const globalStore = useGlobalStore()
const store = useHomeStore()

const summaryValues = computed(() => store.lastMonths.map((data: IMonth) => ({
  up: data.income,
  down: data.outcome,
  label: toMonthLabel(data.monthId)
})))

const savings = computed(() => toCurrency(globalStore.savings ?? 0))

onMounted(() => {
  store.init()
})
</script>

<template>
  <div class="page-wrapper">
    <div class="text-title-4">Total savings: {{ savings }}</div>
    <VgBarChart :values="summaryValues"/>
    <div class="payments-container" v-if="store.lastPayments.length">
      <PaymentData v-for="payment of store.lastPayments" :key="payment.id" :payment="payment"/>
    </div>
  </div>
</template>

<style lang="scss">
@import "src/styles/colors";

.text-title-4 {
  padding-bottom: 32px;
}

.payments-container {
  padding: 8px 16px;
  background: $white;
  border-radius: 4px;
  max-width: 550px;
  margin: 32px auto 0 auto;
}
</style>
