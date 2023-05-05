<template>
  <div class="navbar">
    <div class="item">
      <VgIconChart />
    </div>
    <div class="item">
      <VgIconNew />
    </div>
    <div class="item">
      <VgIconList />
    </div>
  </div>
</template>

<script setup lang="ts">
import VgIconChart from '@/components/ui/icons/VgIconChart.vue'
import VgIconNew from '@/components/ui/icons/VgIconNew.vue'
import VgIconList from '@/components/ui/icons/VgIconList.vue'
</script>

<style scoped lang="scss">
@import "src/styles/colors";

.navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  background: $white;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.item {
  cursor: pointer;
  padding: 12px;

  &:hover {
    background: darken($white, 10);
  }
}
</style>
