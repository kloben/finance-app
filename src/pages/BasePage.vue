<script setup lang="ts">
import TabBar from '@/components/TabBar.vue'
</script>

<template>
  <div class="base-container">
    <router-view></router-view>
    <TabBar></TabBar>
  </div>
</template>

<style lang="scss">
.base-container {
  padding-bottom: 100px;
}
</style>
