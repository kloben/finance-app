<script setup lang="ts">

import VgIconHome from '@/components/ui/icons/VgIconHome.vue'
import VgIconStatus from '@/components/ui/icons/VgIconStatus.vue'
import VgIconFuture from '@/components/ui/icons/VgIconFuture.vue'
import VgIconSettings from '@/components/ui/icons/VgIconSettings.vue'
import VgIconAdd from '@/components/ui/icons/VgIconAdd.vue'
</script>

<template>
  <div class="bar-container">
    <router-link to="/">
      <div class="bar-item">
        <VgIconHome />
        <div class="bar-label">Home</div>
      </div>
    </router-link>
    <router-link to="/detail">
      <div class="bar-item">
        <VgIconStatus />
        <div class="bar-label">Status</div>
      </div>
    </router-link>
    <router-link to="/new">
      <div class="floating-item">
        <VgIconAdd />
      </div>
    </router-link>
    <router-link to="/predictions">
      <div class="bar-item">
        <VgIconFuture />
        <div class="bar-label">Future</div>
      </div>
    </router-link>
    <router-link to="/">
      <div class="bar-item">
        <VgIconSettings />
        <div class="bar-label">Settings</div>
      </div>
    </router-link>
  </div>
</template>

<style scoped lang="scss">
@import "src/styles/colors";

$big: 41px;
$small: 33px;
$smallOffset: 26px;

.bar-container {
  width: 100%;
  height: 82px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.1));
  background: radial-gradient(
                  circle at 50% calc($big / 2 * -1),
                  transparent #{$big},
                  #fff calc(#{$big} + 1px)
  ) 0 calc($big / 2) / 100% calc(100% - #{$big} / 2) no-repeat no-repeat,
  radial-gradient(
                  circle at calc(50% - #{$big} - #{$smallOffset}) #{$small},
                  #fff #{$small},
                  transparent calc(#{$small} + 1px)
  ) 0 0 / 100% 100% no-repeat no-repeat,
  radial-gradient(
                  circle at calc(50% + #{$big} + #{$smallOffset}) #{$small},
                  #fff #{$small},
                  transparent calc(#{$small} + 1px)
  ) 0 0 / 100% 100% no-repeat no-repeat,
  linear-gradient(
                  90deg,
                  #fff calc(50% - #{$big} - #{$smallOffset}),
                  transparent calc(50% - #{$big} - #{$smallOffset} + 1px),
                  transparent calc(50% + #{$big} + #{$smallOffset} - 1px),
                  #fff calc(50% + #{$big} + #{$smallOffset})
  ) 0 0 / 100% 100% no-repeat no-repeat;
}

a {
  flex: 0 1 56px;
}

.bar-item {
  text-align: center;
  padding: 3px 6px 0 6px;
  color: $grey;
  overflow: hidden;
  cursor: pointer;
}

.bar-label {
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  padding-top: 6px;
}

.floating-item {
  position: relative;
  top: -40px;
  padding: 16px;
  border-radius: 50%;
  background: linear-gradient(315.39deg, #4C1CD5 15.22%, rgba(76, 28, 213, 0.8) 85.05%);
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
