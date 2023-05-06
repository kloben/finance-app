<template>
  <div class="top-bar">
    <router-link to="/">
      <div class="logo">FinanceAPP</div>
    </router-link>
  </div>
</template>

<style scoped lang="scss">
@import "src/styles/colors";

.top-bar {
  background: $white;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-weight: bold;
  font-size: 22px;
  padding: 10px;
}
</style>
