<script setup lang="ts">
import VgInput from '@/components/ui/forms/VgInput.vue'
import VgInputNumber from '@/components/ui/forms/VgInputNumber.vue'
import { computed, reactive } from 'vue'
import VgButton from '@/components/ui/VgButton.vue'
import VgInputCheck from '@/components/ui/forms/VgInputCheck.vue'
import VgInputSelect from '@/components/ui/forms/VgInputSelect.vue'
import { Category } from '@/data/categories.enum'

const formValues = reactive({
  amount: 0,
  category: null,
  title: null,
  recurrent: false
})

const categories = Object.values(Category)

const isValid = computed(() => {
  return formValues.amount > 0 && formValues.category
})

async function createTransaction () {
  // try {
  //
  // } catch (e) {
  //
  // }
}
</script>

<template>
  <div class="page-wrapper">
    <div class="text-title-4">
      New Payment
    </div>
    <div class="form-wrapper">
      <VgInputNumber v-model="formValues.amount" label="Amount" />
      <VgInputSelect v-model="formValues.category" :options="categories" label="Category" />
      <VgInput v-model="formValues.title" label="Description (Optional)" />
      <VgInputCheck v-model="formValues.recurrent" label="Make recurrent" />
      <VgButton :disabled="!isValid" @click="createTransaction">Create</VgButton>
    </div>
  </div>
</template>

<style lang="scss">

</style>
