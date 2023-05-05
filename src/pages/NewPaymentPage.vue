<script setup lang="ts">
import VgInput from '@/components/ui/forms/VgInput.vue'
import VgInputNumber from '@/components/ui/forms/VgInputNumber.vue'
import { computed, reactive } from 'vue'
import VgButton from '@/components/ui/VgButton.vue'
import VgInputCheck from '@/components/ui/forms/VgInputCheck.vue'
import VgInputSelect from '@/components/ui/forms/VgInputSelect.vue'
import VgInputSwitch from '@/components/ui/forms/VgInputSwitch.vue'
import { useFinancesStore } from '@/stores/finances.store'
import type { IPaymentData, PaymentType } from '@/models/payment.interface'
import { useRouter } from 'vue-router'
import { IncomeCategory, OutcomeCategory } from '@/data/categories.enum'

const store = useFinancesStore()
const router = useRouter()

const formValues = <IPaymentData>reactive({
  type: 'outcome' as PaymentType,
  amount: 0,
  category: '',
  description: '',
  recurrent: false
})

const isValid = computed(() => {
  return formValues.amount > 0 && formValues.category && formValues.type
})
const categories = computed(() => formValues.type === 'outcome' ? OutcomeCategory : IncomeCategory)
const types = {
  income: 'Income',
  outcome: 'Outcome'
}

async function createTransaction () {
  try {
    await store.createPayment(new Date(), formValues)
    await router.push('/')
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div class="page-wrapper">
    <div class="text-title-4">
      New Payment
    </div>
    <div class="form-wrapper">
      <VgInputSwitch v-model="formValues.type" :options="types" />
      <VgInputNumber v-model="formValues.amount" label="Amount" />
      <VgInputSelect v-model="formValues.category" :options="categories" label="Category" />
      <VgInput v-model="formValues.description" label="Description (Optional)" />
      <VgInputCheck v-model="formValues.recurrent" label="Make recurrent" />
      <VgButton :disabled="!isValid" @clicked="createTransaction">Create</VgButton>
    </div>
  </div>
</template>

<style lang="scss">

</style>
