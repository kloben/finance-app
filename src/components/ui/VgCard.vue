<template>
  <div class="vg-card">
    <slot />
  </div>
</template>

<style scoped lang="scss">
@import "src/styles/colors";

.vg-card {
  background: $white;
  padding: 20px 24px;
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
