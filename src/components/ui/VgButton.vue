<template>
  <div class="vg-button"
       :class="[type, size, disabled ? 'disabled': '']"
       @click="tryClick"
  >
    <div class="text-button">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  type?: 'clear'
  size?: 'big' | 'small'
  disabled?: boolean
}>()
const emit = defineEmits<{
  (e: 'clicked'): void
}>()

function tryClick () {
  if (!props.disabled) {
    emit('clicked')
  }
}
</script>

<style scoped lang="scss">
@import "./VgButton.scss";
</style>
