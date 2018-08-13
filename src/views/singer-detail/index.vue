<template>
  <transition name="slide">
    <div class="singer-detail">
      <div class="info-box" ref="box">
        <div class="info-box-bd">
          <!-- <div class="action-back">
            <i class="icon-back"></i>
          </div> -->
        </div>
        <div class="info-box-bg" :style="bgImage" ref="bgImage"></div>
      </div>
      <div class="list-box" ref="wrapper">
        <div class="layer" ref="layer"></div>
        <cube-scroll class="scroll" :data="songList" :options="scrollOptions" :scroll-events="scrollEvents" @scroll="scroll" ref="scroll">
          <div class="count-box">
            <div class="count-box-desc">歌曲
              <span class="count-box-number">共{{total}}首</span>
            </div>
          </div>
          <app-list :data="songList" @select="selectItem"></app-list>
        </cube-scroll>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import List from "@/components/list";
import { prefixStyle } from "@/utils/dom";
import { getSingerInfo } from "@/api/singer";
import { createSong } from "@/api/song";

export default {
  name: "singer-detail",
  data() {
    return {
      songList: [],
      total: 0,
      scrollY: 0,
      scrollOptions: {
        probeType: 3
      },
      scrollEvents: ["scroll"]
    };
  },
  created() {
    if (!this.singer.id) {
      this.$router.push("/singer");
      return;
    }
    getSingerInfo(this.singer.id).then(response => {
      if (response.code === 0) {
        this.songList = this._normalizeSongList(response.data.list);
        this.total = response.data.total;
      }
    });
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight;
    this.minTransalteY = -this.imageHeight + 84;
    this.$refs.wrapper.style.top = `${this.imageHeight}px`;
  },
  methods: {
    _normalizeSongList(list) {
      let ret = [];
      list.forEach(item => {
        let { musicData } = item;
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    selectItem(item, index) {
      this.playItem({ list: this.songList, index });
    },
    ...mapActions({
      playItem: "playItem"
    })
  },
  watch: {
    scrollY(newVal) {
      let translateY = Math.max(this.minTransalteY, newVal);
      let zIndex = 0;
      let scale = 1;
      let top = newVal;
      if (top > 0) {
        scale = 1 + Math.abs(top / this.imageHeight);
        this.$refs.box.style[prefixStyle("transform")] = `scale(${scale})`;
        this.$refs.wrapper.style.top = `${this.imageHeight}px`;
      } else {
        if (this.minTransalteY > top) {
          top = this.minTransalteY;
        }
        this.$refs.box.style[
          prefixStyle("transform")
        ] = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${top}, 0, 1)`;

        this.$refs.wrapper.style.top = `${this.imageHeight + top}px`;
      }

      this.$refs.layer.style[
        prefixStyle("transform")
      ] = `translate3d(0,${newVal}px,0)`;
    }
  },
  computed: {
    bgTitle() {
      return this.singer.name;
    },
    bgImage() {
      return `background-image:url(${this.singer.avatar})`;
    },
    ...mapGetters(["singer"])
  },
  components: {
    "app-list": List
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}

.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}

.singer-detail {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  z-index: 100;
  background: $color-white;

  .info-box {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 274px;
    color: $color-white;
    background: $color-white;
    overflow: hidden;

    .info-box-bd {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 4;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      background: rgba(0, 0, 0, 0.2);
    }

    .info-box-bg {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 3;
      width: 100%;
      height: 100%;
      background-size: cover;
    }
  }

  .list-box {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 11;
    overflow: hidden;

    .layer {
      position: relative;
      height: 100%;
      background: $color-white;
    }

    .scroll {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      padding-bottom: 190px;
      overflow: hidden;
      will-change: transform;

      .count-box {
        position: relative;
        display: -webkit-box;
        -webkit-box-align: center;
        height: 54px;
        margin: 0 16px -10px;

        .count-box-desc {
          font-size: $font-size-medium;
        }

        .count-box-number {
          margin-left: 5px;
        }
      }
    }
  }

  // .action-back {
  //   display: -webkit-box;
  //   -webkit-box-align: center;
  //   height: 44px;
  //   padding: 0 16px 0 14px;
  //   color: $color-white;
  //   background: $color-theme;

  //   .icon-back {
  //     font-family: "";
  //     font-size: 24px;
  //     font-weight: 400;
  //     font-style: normal;
  //     line-height: 1;
  //     display: inline-block;
  //     text-decoration: none;
  //     -webkit-font-smoothing: antialiased;
  //   }
  // }
}
</style>