<script setup lang="ts">
import VgIconNew from '@/components/ui/icons/VgIconNew.vue'
import VgIconPrediction from '@/components/ui/icons/VgIconPrediction.vue'
import VgIconChart from '@/components/ui/icons/VgIconChart.vue'
</script>

<template>
  <div class="footer-container">
  </div>
<!--  <div class="footer-bar">-->
<!--    <router-link to="/detail">-->
<!--      <div class="item" data-test-id="detail-link">-->
<!--        <VgIconChart />-->
<!--      </div>-->
<!--    </router-link>-->
<!--    <router-link to="/new">-->
<!--      <div class="item" data-test-id="new-link">-->
<!--        <VgIconNew />-->
<!--      </div>-->
<!--    </router-link>-->
<!--    <router-link to="/predict">-->
<!--      <div class="item" data-test-id="prediction-link">-->
<!--        <VgIconPrediction />-->
<!--      </div>-->
<!--    </router-link>-->
<!--  </div>-->
</template>

<style scoped lang="scss">
@import "src/styles/colors";

$big: 41px;
$small: 33px;
$smallOffset: 26px;


.footer-container {
  width: 100%;
  height: 82px;
  position: fixed;
  bottom: 0;
  left: 0;
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.1));
  background:
  radial-gradient(
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
</style>
