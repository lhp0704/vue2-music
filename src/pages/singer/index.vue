<template>
  <div class="singer">
    <div class="index-list-wrapper">
      <cube-index-list :data="singerList">
        <cube-index-list-group v-for="(group, index) in singerList" :key="index" :group="group">
          <cube-index-list-item v-for="(item, index) in group.items" :key="index" :item="item" @select="selectItem">
            <div class="singer-item">
              <img class="avatar" v-lazy="item.avatar">
              <span class="name">{{item.name}}</span>
            </div>
          </cube-index-list-item>
        </cube-index-list-group>
        <span class="singer-nav-item" slot="nav-item" slot-scope="props">{{props.item}}</span>
      </cube-index-list>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { getSingerList } from "@/api/singer";
import singer from "@/api/singer";

const HOT_SINGERLIST_LEN = 10;
const HOT_NAME = "热门";

export default {
  name: "singer",
  data() {
    return {
      singerList: []
    };
  },
  created() {
    getSingerList().then(response => {
      if (response.code === 0) {
        this.singerList = this._normalizeSingerList(response.data.list);
      }
    });
  },
  methods: {
    _normalizeSingerList(list) {
      let map = {
        hot: {
          name: HOT_NAME,
          items: []
        }
      };
      list.forEach((item, index) => {
        if (index < HOT_SINGERLIST_LEN) {
          map.hot.items.push(
            new singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            })
          );
        }

        let key = item.Findex;
        if (!map[key]) {
          map[key] = {
            name: key,
            items: []
          };
        }
        map[key].items.push(
          new singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          })
        );
      });

      let ret = [];
      let hot = [];
      for (let key in map) {
        let val = map[key];
        if (val.name.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.name === HOT_NAME) {
          hot.push(val);
        }
      }
      ret.sort((a, b) => {
        return a.name.charCodeAt(0) - b.name.charCodeAt(0);
      });
      return hot.concat(ret);
    },
    selectItem(item) {
      this.$router.push({
        path: `/singer/${item.id}`
      });
      this.setSinger(item);
    },
    ...mapMutations({
      setSinger: "SET_SINGER"
    })
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.singer {
  position: fixed;
  width: 100%;
  top: 84px;
  bottom: 0;

  .index-list-wrapper {
    width: 94%;
    height: 98%;
    margin: 0 auto;
    overflow: hidden;

    .singer-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .name {
        margin-left: 20px;
        color: $color-negative;
        font-size: $font-size-medium;
      }
    }

    .cube-index-list {
      .cube-index-list-nav {
        > ul {
          > li {
            padding: 3px;

            &.active {
              .singer-nav-item {
                color: $color-positive;
              }
            }
          }
        }
      }

      .singer-nav-item {
        font-size: $font-size-small-s;
        color: $color-negative;
      }
    }
  }
}
</style>