<script setup lang="ts">
import VgInput from '@/components/ui/forms/VgInput.vue'
import VgInputNumber from '@/components/ui/forms/VgInputNumber.vue'
import { reactive } from 'vue'

const formValues = reactive({
  title: '',
  amount: 0
})
</script>

<template>
  <div class="text-title-4">
    New Expense
  </div>
  <VgInput v-model="formValues.title" />
  <VgInputNumber v-model="formValues.amount" />
  <div>{{ formValues }}</div>
</template>

<style lang="scss">

</style>
