<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import TabBar from '@/components/TabBar.vue'
</script>

<template>
  <div class="base-container">
    <NavBar></NavBar>
    <router-view></router-view>
    <TabBar></TabBar>
  </div>
</template>

<style lang="scss">
.base-container {
  padding-bottom: 60px;
}
</style>
