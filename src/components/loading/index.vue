<template>
  <div class="loading">
    <img src="./loading.gif">
    <p>{{text}}</p>
  </div>
</template>

<script>
const COMPONENT_NAME = "app-loading";

export default {
  name: COMPONENT_NAME,
  props: {
    text: {
      type: String,
      default: "页面正在努力加载中"
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.loading {
  text-align: center;
  color: $color-dark-grey;

  img {
    display: block;
    width: 100px;
    height: 100px;
    margin: 60px auto 50px;
  }
}
</style>