<template>
  <input class="vg-input"
         type="text"
         :value="modelValue ?? ''"
         @input="emitUpdate($event as InputEvent)"
  />
</template>

<script setup lang="ts">
defineProps<{
  modelValue?: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function emitUpdate (event: InputEvent): void {
  emit('update:modelValue', (event.target as HTMLInputElement).value ?? '')
}
</script>

<style lang="scss">
@import "./VgInput";
</style>
