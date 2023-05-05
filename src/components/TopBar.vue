<script setup lang="ts">
import VgButton from '@/components/ui/VgButton.vue'
import { useFinancesStore } from '@/stores/finances.store'
import { IncomeCategory, OutcomeCategory } from '@/data/categories.enum'

const store = useFinancesStore()

async function insertRandom () {
  const date = new Date()
  date.setDate(15)
  for (let i = 0; i < 5; i++) {
    await store.createPayment(date, {
      type: 'income',
      amount: Math.floor(Math.random() * 250),
      category: IncomeCategory.salary,
      description: crypto.randomUUID()
    })
    await store.createPayment(date, {
      type: 'income',
      amount: Math.floor(Math.random() * 100),
      category: IncomeCategory.other,
      description: crypto.randomUUID()
    })
    await store.createPayment(date, {
      type: 'outcome',
      amount: Math.floor(Math.random() * 50),
      category: OutcomeCategory.electricity,
      description: crypto.randomUUID()
    })
    await store.createPayment(date, {
      type: 'outcome',
      amount: Math.floor(Math.random() * 50),
      category: OutcomeCategory.gas,
      description: crypto.randomUUID()
    })
    await store.createPayment(date, {
      type: 'outcome',
      amount: Math.floor(Math.random() * 50),
      category: OutcomeCategory.fuel,
      description: crypto.randomUUID()
    })
    await store.createPayment(date, {
      type: 'outcome',
      amount: Math.floor(Math.random() * 100),
      category: OutcomeCategory.shopping,
      description: crypto.randomUUID()
    })
  }
}
</script>

<template>
  <div class="top-bar">
    <router-link to="/">
      <div class="logo">FinanceAPP</div>
    </router-link>
    <VgButton @click="insertRandom()">Random</VgButton>
  </div>
</template>

<style scoped lang="scss">
@import "src/styles/colors";

.top-bar {
  background: $white;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-weight: bold;
  font-size: 22px;
  padding: 10px;
}
</style>
