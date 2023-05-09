<script setup lang="ts">
import VgAppLogo from '@/components/ui/icons/VgAppLogo.vue'
</script>

<template>
  <div class="bar-container">
    <router-link to="/">
      <VgAppLogo />
    </router-link>
  </div>
</template>

<style scoped lang="scss">
@import "src/styles/colors";

.bar-container {
  background: $primary;
  color: $white;
  padding: 16px;
  text-align: center;
}

</style>
