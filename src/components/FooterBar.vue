<script setup lang="ts">
import VgIconNew from '@/components/ui/icons/VgIconNew.vue'
import VgIconPrediction from '@/components/ui/icons/VgIconPrediction.vue'
import VgIconChart from '@/components/ui/icons/VgIconChart.vue'
</script>

<template>
  <div class="footer-bar">
    <router-link to="/detail">
      <div class="item" data-test-id="detail-link">
        <VgIconChart />
      </div>
    </router-link>
    <router-link to="/new">
      <div class="item" data-test-id="new-link">
        <VgIconNew />
      </div>
    </router-link>
    <router-link to="/predict">
      <div class="item" data-test-id="prediction-link">
        <VgIconPrediction />
      </div>
    </router-link>
  </div>
</template>

<style scoped lang="scss">
@import "src/styles/colors";

.footer-bar {
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
