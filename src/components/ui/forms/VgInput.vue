<script setup lang="ts">
defineProps<{
  label?: string
  modelValue?: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="vg-input">
    <input type="text"
           :placeholder="label ?? ''"
           :value="modelValue ?? ''"
           @input="emit('update:modelValue', $event.target.value ?? '')"
    />
  </div>
</template>

<style lang="scss">
@import "./VgInput";
</style>
