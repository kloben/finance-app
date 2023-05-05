<script setup lang="ts">
import { ref } from 'vue'
import VgInputNumber from '@/components/ui/forms/VgInputNumber.vue'
import VgButton from '@/components/ui/VgButton.vue'
import { useMonthStore } from '@/stores/months.store'
import { useRouter } from 'vue-router'

const amount = ref(0)
const store = useMonthStore()
const router = useRouter()

async function onClick () {
  try {
    await store.initMonth(amount.value)
    await router.push('/')
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div class="page-wrapper">
    <div class="text-title-3">Welcome</div>
    <div class="text-title-5">Let's start with how much do you have right now</div>
    <div class="form-wrapper">
      <VgInputNumber v-model="amount" />
      <VgButton :disabled="amount <= 0" @click="onClick">Continue</VgButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.text-title-3, .text-title-5 {
  padding-bottom: 16px;
}
</style>
