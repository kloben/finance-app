<template>
  <input type="text"
         :value="modelValue"
         @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup lang="ts">
defineProps<{
  modelValue?: string
}>()
defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<style lang="scss">
@import "./VgInput";
</style>
