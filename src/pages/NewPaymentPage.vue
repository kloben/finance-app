<script setup lang="ts">
import VgInput from '@/components/ui/forms/VgInput.vue'
import VgInputNumber from '@/components/ui/forms/VgInputNumber.vue'
import { computed, reactive } from 'vue'
import VgButton from '@/components/ui/VgButton.vue'
import VgInputCheck from '@/components/ui/forms/VgInputCheck.vue'
import VgInputSelect from '@/components/ui/forms/VgInputSelect.vue'
import VgInputSwitch from '@/components/ui/forms/VgInputSwitch.vue'
import { useGlobalStore } from '@/stores/global.store'
import type { IPaymentData } from '@/models/payment.interface'
import { PaymentType } from '@/models/payment.interface'
import { useRouter } from 'vue-router'
import Toast from 'awesome-toast-component'

const store = useGlobalStore()
const router = useRouter()

const types = {
  [PaymentType.in]: 'Income',
  [PaymentType.out]: 'Outcome'
}

const formValues = reactive<IPaymentData>({
  type: PaymentType.out,
  amount: 0,
  category: undefined,
  description: undefined
})

const isValidForm = computed<boolean>(() => formValues.amount > 0 && Boolean(formValues.type))

const categories = computed<{ key: string, label: string }[]>(() => {
  return store.getCategories(formValues.type).map((category) => {
    return { key: category.id, label: category.label }
  })
})

async function createTransaction (event?: SubmitEvent) {
  event?.preventDefault()
  if (!isValidForm.value) {
    return
  }
  try {
    await store.createPayment(new Date(), formValues)
    await router.push('/')
    new Toast('👌 Payment created')
  } catch (e) {
    new Toast('😵 Something happened. Try again later')
    console.log(e)
  }
}
</script>

<template>
  <div class="page-wrapper">
    <div class="text-title-4">
      New Payment
    </div>
    <form class="form-wrapper" @submit="createTransaction">
      <VgInputSwitch v-model="formValues.type" :options="types" />
      <VgInputNumber v-model="formValues.amount" label="Amount" />
      <VgInputSelect v-model="formValues.category" :options="categories" label="Category (Optional)" />
      <VgInput v-model="formValues.description" label="Description (Optional)" />
      <VgButton :disabled="!isValidForm" @click="createTransaction">Create</VgButton>
      <input type="submit" hidden /> <!-- TODO: Change vgButton to submit -->
    </form>
  </div>
</template>

<style lang="scss">

</style>
