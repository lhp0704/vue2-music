<template>
  <div class="recommend">
    <div v-if="recommendList.length" class="slide-wrapper" ref="slideWrapper">
      <app-slide>
        <div v-for="item in recommendList" :key="item.id">
          <a :href="item.linkUrl">
            <img class="needsclick" :src="item.picUrl">
          </a>
        </div>
      </app-slide>
    </div>
    <div class="list-wrapper">
      <h1 class="title"></h1>
    </div>
  </div>
</template>

<script>
import Slide from "@/components/slide";
import { getRecommendList } from "@/api/recommend";

export default {
  name: "recommend",
  data() {
    return {
      recommendList: []
    };
  },
  created() {
    getRecommendList().then(response => {
      if (response.code === 0) {
        this.recommendList = response.data.slider;
      }
    });
  },
  components: {
    "app-slide": Slide
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.recommend {
  position: fixed;
  width: 100%;
  top: 84px;
  bottom: 0;

  .slide-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .list-wrapper {
    margin-left: 10px;
    margin-right: 10px;

    .title {
      height: 40px;
      line-height: 40px;
      font-size: $font-size-large;
      color: $color-dark-grey;
    }
  }
}
</style>