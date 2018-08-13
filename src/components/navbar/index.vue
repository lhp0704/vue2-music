<template>
  <div class="navbar">
    <router-link class="navbar-item" to="/recommend">
      推荐
    </router-link>
    <router-link class="navbar-item" to="/toplist">
      排行榜
    </router-link>
    <router-link class="navbar-item" to="/singer">
      歌手
    </router-link>
    <router-link class="navbar-item" to="/search">
      搜索
    </router-link>
  </div>
</template>

<script>
const COMPONENT_NAME = "app-navbar";

export default {
  name: COMPONENT_NAME,
  date() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.navbar {
  display: -webkit-box;
  background: $color-white;

  .navbar-item {
    text-decoration: none;
    -webkit-box-flex: 1;
    position: relative;
    display: block;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    text-align: center;
    font-size: $font-size-large;
    color: $color-negative;
    -webkit-box-sizing: border-box;

    &.router-link-active {
      border-bottom: 2px solid $color-positive;
      color: $color-positive;
    }
  }
}
</style>

