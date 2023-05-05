<template>
  <input type="number"
         :value="modelValue ?? 0"
         @input="$emit('update:modelValue', Number($event.target.value))"
  />
</template>

<script setup lang="ts">
defineProps<{
  modelValue?: number
}>()
defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()
</script>

<style lang="scss">
@import "./VgInput";
</style>
