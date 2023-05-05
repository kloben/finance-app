<template>
  <input type="number"
         :value="modelValue ?? 0"
         @input="emitUpdate($event as InputEvent)"
  />
</template>

<script setup lang="ts">
defineProps<{
  modelValue?: number
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

function emitUpdate (event: InputEvent): void {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value ? parseInt(value) : 0)
}
</script>

<style lang="scss">
@import "./VgInput";
</style>
