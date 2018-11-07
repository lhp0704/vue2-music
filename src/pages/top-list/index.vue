<template>
  <div class="top-list-wrapper">
    <cube-scroll :data="topList" :options="scrollOptions" ref="scroll">
      <ul>
        <li class="top-list-item" @click="selectItem(item)" v-for="item in topList" :key="item.id">
          <div class="topic-item">
            <div class="topic-media">
              <img width="100" height="100" v-lazy="item.picUrl" />
              <span class="listen-count">
                <i class="icon icon-listen"></i>{{item.listenCount|FixedString}}
              </span>
            </div>
            <div class="song-item">
              <ul>
                <h3 class="topic-title">{{item.topTitle}}</h3>
                <li v-for="(song,index) in item.songList" :key="index">
                  {{index + 1}}
                  <span class="text-name">{{song.songname}}</span>- {{song.singername}}
                </li>
              </ul>
              <i class="topic-arrow"></i>
            </div>
          </div>
        </li>
      </ul>
      <div class="loading-box" v-show="!topList.length">
        <app-loading></app-loading>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
import Loading from "@/components/loading";
import { getTopList } from "@/api/top-list";

export default {
  name: "top-list",
  data() {
    return {
      topList: [],
      scrollOptions: {
        scrollbar: {
          fade: false
        }
      }
    };
  },
  created() {
    getTopList().then(response => {
      if (response.code === 0) {
        this.topList = response.data.topList;
      }
    });
  },
  methods: {
    selectItem(item) {
      this.$router.push({
        path: `/toplist/${item.id}`
      });
    }
  },
  filters: {
    FixedString(val) {
      return (val / 10000).toFixed(1) + "万";
    }
  },
  watch: {
    topList() {
      setTimeout(() => {
        this.$Lazyload.lazyLoadHandler();
      }, 20);
    }
  },
  components: {
    "app-loading": Loading
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
@import "@/styles/mixins.scss";

.top-list-wrapper {
  position: fixed;
  width: 100%;
  top: 84px;
  bottom: 0;

  .top-list-item {
    margin: 10px;
    overflow: hidden;

    .topic-item {
      display: -webkit-box;
      background: $color-white;
    }

    .topic-media {
      position: relative;
      width: 100px;
      height: 100px;
      display: block;

      .listen-count {
        position: absolute;
        display: block;
        left: 5px;
        bottom: 7px;
        line-height: 12px;
        color: $color-white;
        opacity: 0.6;
        font-size: $font-size-small-s;
        z-index: 10;
      }

      .icon-listen {
        display: block;
        float: left;
        width: 10px;
        height: 10px;
        background-position: 0 -50px;
        margin-right: 3px;
        background-image: url(../../assets/list_sprite.png);
        background-repeat: no-repeat;
        background-size: 24px 60px;
        z-index: 10;
      }
    }

    .song-item {
      position: relative;
      -webkit-box-flex: 1;

      display: -webkit-box;
      -webkit-box-align: center;
      -webkit-box-pack: center;

      > ul {
        -webkit-box-flex: 1;
        margin: 0 10px 0 15px;

        > li {
          font-size: $font-size-medium;
          color: $color-negative;
          line-height: 21px;
          margin: 0;
          @include ellipsis;

          .text-name {
            color: $color-dark;
            margin-left: 4px;
            margin-right: 5px;
          }
        }

        .topic-title {
          font-size: $font-size-large;
          color: $color-dark;
          line-height: 24px;
          margin-bottom: 5px;
          @include ellipsis;
        }
      }

      .topic-arrow {
        position: absolute;
        right: 10px;
        top: 50%;
        margin-top: -4px;
        width: 6px;
        height: 6px;
        border-right: 1px solid #b2b2b2;
        border-bottom: 1px solid #b2b2b2;
        transform: rotate(-45deg);
        -ms-transform: rotate(-45deg); /* IE 9 */
        -moz-transform: rotate(-45deg); /* Firefox */
        -webkit-transform: rotate(-45deg); /* Safari 和 Chrome */
        -o-transform: rotate(-45deg);
      }
    }
  }
}
</style>