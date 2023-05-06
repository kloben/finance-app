<script setup lang="ts">
import { computed, ref } from 'vue'
import VgInputNumber from '@/components/ui/forms/VgInputNumber.vue'
import VgButton from '@/components/ui/VgButton.vue'
import { useFinancesStore } from '@/stores/finances.store'
import { useRouter } from 'vue-router'
import Toast from 'awesome-toast-component/src/toast'

const amount = ref(0)
const store = useFinancesStore()
const router = useRouter()

const canSubmit = computed((): boolean => Boolean(amount.value) && amount.value > 0)

async function submitForm (event?: SubmitEvent) {
  event?.preventDefault()
  if (!canSubmit.value) {
    return
  }
  try {
    store.updateSavings(amount.value)
    await router.push('/')
  } catch (e) {
    new Toast('😵 Something happened. Try again later')
    console.log(e)
  }
}
</script>

<template>
  <div class="page-wrapper">
    <div class="text-title-3">Welcome</div>
    <div class="text-title-5">Let's start with how much do you have right now</div>
    <form class="form-wrapper" @submit="submitForm">
      <VgInputNumber v-model="amount" />
      <VgButton :disabled="amount <= 0" @clicked="submitForm">Continue</VgButton>
    </form>
  </div>
</template>

<style scoped lang="scss">
.text-title-3, .text-title-5 {
  padding-bottom: 16px;
}
</style>
