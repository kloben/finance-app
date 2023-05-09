<script setup lang="ts">
defineProps<{
  label?: string
  modelValue?: number
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: number | undefined): void
}>()
</script>

<template>
  <div class="vg-input">
    <input type="number"
           min="0"
           step="1"
           :value="modelValue"
           :placeholder="label ?? ''"
           @input="emit('update:modelValue', $event.target.value ? Number($event.target.value) : undefined)"
    />
  </div>
</template>

<style lang="scss">
@import "./VgInput";
</style>
