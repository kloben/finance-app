<script setup lang="ts">
import VgButton from '@/components/ui/VgButton.vue'
import { useFinancesStore } from '@/stores/finances.store'

const store = useFinancesStore()

async function insertRandom () {
  const date = new Date()
  for (let i = 0; i < 5; i++) {
    date.setDate(Math.random() * 28)
    await store.createPayment(date, {
      type: 'income',
      amount: Math.floor(Math.random() * 250),
      category: 'salary',
      description: crypto.randomUUID()
    })
    date.setDate(Math.random() * 28)
    await store.createPayment(date, {
      type: 'income',
      amount: Math.floor(Math.random() * 100),
      category: 'other',
      description: crypto.randomUUID()
    })
    date.setDate(Math.random() * 28)
    await store.createPayment(date, {
      type: 'outcome',
      amount: Math.floor(Math.random() * 50),
      category: 'electricity',
      description: crypto.randomUUID()
    })
    date.setDate(Math.random() * 28)
    await store.createPayment(date, {
      type: 'outcome',
      amount: Math.floor(Math.random() * 50),
      category: 'gas',
      description: crypto.randomUUID()
    })
    date.setDate(Math.random() * 28)
    await store.createPayment(date, {
      type: 'outcome',
      amount: Math.floor(Math.random() * 50),
      category: 'fuel',
      description: crypto.randomUUID()
    })
    date.setDate(Math.random() * 28)
    await store.createPayment(date, {
      type: 'outcome',
      amount: Math.floor(Math.random() * 100),
      category: 'shopping',
      description: crypto.randomUUID()
    })

    date.setMonth(date.getMonth() - 1)
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
