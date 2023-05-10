<script setup lang="ts">
import VgInput from '@/components/ui/VgInput.vue'
import VgInputNumber from '@/components/ui/VgInputNumber.vue'
import { computed, reactive } from 'vue'
import VgButton from '@/components/ui/VgButton.vue'
import VgInputSelect from '@/components/ui/VgInputSelect.vue'
import VgInputSwitch from '@/components/ui/VgInputSwitch.vue'
import { useGlobalStore } from '@/stores/global.store'
import type { IPaymentData } from '@/models/payment.interface'
import { PaymentType } from '@/models/payment.interface'
import Toast from 'awesome-toast-component'
import { usePopupStore } from '@/stores/popup.store'
import { AppColor } from '@/styles/colors'

const store = useGlobalStore()
const popup = usePopupStore()

const paymentTypes = [
  {
    label: 'Expense',
    value: PaymentType.out,
    color: AppColor.chartNegative
  },
  {
    label: 'Income',
    value: PaymentType.in,
    color: AppColor.chartPositive
  }
]

const formValues = reactive<Partial<IPaymentData> & { type: PaymentType }>({
  type: PaymentType.out,
  amount: undefined,
  category: undefined,
  description: undefined
})

const isValidForm = computed<boolean>(() => Boolean(formValues.amount) && Number(formValues.amount) > 0 && Boolean(formValues.type))

const categories = computed<{ key: string, label: string }[]>(() => {
  return store.getCategories(formValues.type).map((category) => {
    return { key: category.id, label: `${category.icon} ${category.label}` }
  })
})

async function createTransaction (event?: SubmitEvent) {
  event?.preventDefault()
  if (!isValidForm.value) {
    return
  }
  try {
    await store.createPayment(new Date(), <IPaymentData>formValues)
    await popup.closePopup()
    new Toast('👌 Payment created')
  } catch (e) {
    new Toast('😵 Something happened. Try again later')
    console.log(e)
  }
}
</script>

<template>
  <div class="title">New Payment</div>
  <form @submit="createTransaction">
    <VgInputSwitch v-model="formValues.type" :options="paymentTypes" />
    <VgInputNumber v-model="formValues.amount" label="Amount" />
    <VgInputSelect v-model="formValues.category" :options="categories" label="Select category" />
    <VgInput v-model="formValues.description" label="Add description" />
    <VgButton :disabled="!isValidForm" @click="createTransaction">Create</VgButton>
  </form>
</template>

<style lang="scss">
.title {
  font-weight: 500;
  font-size: 21px;
  line-height: 25px;
  padding-bottom: 32px;
}
</style>
