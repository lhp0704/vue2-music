<template>
  <div class="header">
    <div class="logo"></div>
  </div>
</template>

<script>
const COMPONENT_NAME = "app-header";

export default {
  name: COMPONENT_NAME,
  date() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
@import "@/styles/mixins.scss";

.header {
  position: relative;
  height: 44px;
  text-align: center;
  background: $color-theme;

  .logo {
    display: inline-block;
    width: 90px;
    height: 25px;
    margin: 9px 0 0 10px;
    @include media-logo("logo");
    background-size: cover;
    background-repeat: no-repeat;
    text-indent: -9999px;
  }
}
</style>


