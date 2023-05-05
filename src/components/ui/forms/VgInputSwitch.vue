<script setup lang="ts">
const props = defineProps<{
  options: Record<string, string>
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function tryClick (key: string) {
  if (key !== props.modelValue) {
    emit('update:modelValue', key)
  }
}
</script>

<template>
  <div class="vg-input">
    <div class="vg-button"
         v-for="(label, key) in options"
         :key="key"
         :class="{disabled: key !== modelValue}"
         @click="tryClick(key)"
    >{{ label }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "src/styles/colors";
@import "../VgButton.scss";

.vg-input {
  display: flex;
  justify-content: center;

  .vg-button {
    &.disabled {
      pointer-events: all;
    }

    &:not(:first-child) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    &:not(:last-child) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
}

</style>
