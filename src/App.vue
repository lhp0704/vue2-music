<template>
  <div id="app">
    <app-header></app-header>
    <app-navbar></app-navbar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <app-player></app-player>
  </div>
</template>

<script>
import Header from "@/components/header";
import Navbar from "@/components/navbar";
import Player from "@/components/player";

export default {
  name: "App",
  components: {
    "app-header": Header,
    "app-navbar": Navbar,
    "app-player": Player
  }
};
</script>

<style lang="scss" scoped>
</style>

