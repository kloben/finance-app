<script setup lang="ts">
import { watch } from 'vue'

const props = defineProps<{
  label?: string
  options: { key: string | number, label: string }[]
  modelValue?: string
  mode?: 'light' | 'dark'  // Defaults light
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | undefined): void
}>()

watch(() => props.options, () => {
  emit('update:modelValue', undefined)
})
</script>

<template>
  <div class="vg-input" :class="mode ?? 'light'">
    <select :class="{clean: !modelValue}"
            @change="emit('update:modelValue', $event.target.value.length ? $event.target.value : undefined)"
    >
      <option class="default" value="">{{ label ?? '' }}</option>
      <option v-for="{key, label} of options"
              :key="key"
              :value="key"
              :selected="modelValue === key"
      >{{ label }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss">
@import "./VgInput";
</style>
