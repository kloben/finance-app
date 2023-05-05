<script setup lang="ts">
import VgInput from '@/components/ui/forms/VgInput.vue'
import VgInputNumber from '@/components/ui/forms/VgInputNumber.vue'
import { reactive } from 'vue'
import VgButton from '@/components/ui/VgButton.vue'

const formValues = reactive({
  title: '',
  amount: 0
})
</script>

<template>
  <div class="page-wrapper">
    <div class="text-title-4">
      New Expense
    </div>
    <div class="form-wrapper">
      <VgInputNumber v-model="formValues.amount" label="Amount" />
      <VgInput v-model="formValues.title" label="Description (Optional)" />
      <VgButton>Create</VgButton>
    </div>
  </div>
</template>

<style lang="scss">

</style>
