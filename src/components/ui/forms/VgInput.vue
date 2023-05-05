<template>
  <div class="vg-input">
    <label>
      <span v-if="label" class="text-caption">{{label}}</span>
      <input type="text"
             :value="modelValue ?? ''"
             @input="emitUpdate($event as InputEvent)"
      />
    </label>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string
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
