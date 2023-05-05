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
    <label>
      <span v-if="label" class="text-caption">{{ label }}</span>
      <input type="text"
             :value="modelValue ?? ''"
             @input="emit('update:modelValue', $event.target.value ?? '')"
      />
    </label>
  </div>
</template>

<style lang="scss">
@import "./VgInput";
</style>
