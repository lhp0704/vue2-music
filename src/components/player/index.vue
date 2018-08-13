<template>
  <div class="player" v-show="playlist.length>0">
    <div class="opt_box" v-show="fullScreen"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

const COMPONENT_NAME = "app-player";

export default {
  name: COMPONENT_NAME,
  computed: {
    ...mapGetters(["fullScreen", "playlist", "playSong"])
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
</style>