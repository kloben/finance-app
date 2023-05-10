<script setup lang="ts">
import { computed, ref } from 'vue'
import VgInputNumber from '@/components/ui/forms/VgInputNumber.vue'
import VgButton from '@/components/ui/VgButton.vue'
import { useGlobalStore } from '@/stores/global.store'
import { useRouter } from 'vue-router'
import Toast from 'awesome-toast-component/src/toast'

const amount = ref()
const store = useGlobalStore()
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
  <div class="page-container">
    <div class="title">Welcome 👋</div>
    <div class="subtitle">Let’s start saving!<br>How much money do you have?</div>
    <form @submit="submitForm">
      <VgInputNumber v-model="amount" label="Add Savings" mode="dark" />
      <VgButton type="submit" :disabled="!canSubmit" @click="submitForm">Continue</VgButton>
    </form>
  </div>
</template>

<style scoped lang="scss">
@import "src/styles/colors";

.page-container {
  background: $primary;
  color: $white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 40px;
}

.title {
  font-weight: 600;
  font-size: 40px;
  line-height: 47px;
}

.subtitle {
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
}
</style>
