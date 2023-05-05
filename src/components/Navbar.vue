<template>
  <div class="navbar">
    <div class="item">
      Categories
    </div>
    <div class="item">
      New
    </div>
    <div class="item">
      List
    </div>
  </div>
</template>

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
}

.item {
  cursor: pointer;
  padding: 16px;

  &:hover {
    background: darken($white, 10);
  }
}
</style>
