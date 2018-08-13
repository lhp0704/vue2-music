<template>
  <div class="list">
    <ul class="table-view">
      <li class="table-view-cell" @click="selectItem(item, index)" v-for="(item, index) in data" :key="index">
        <div class="table">
          <div class="table-cell">
            <h3 class="title">
              <span class="t">
                {{item.name}}
              </span>
            </h3>
            <p class="content">
              <span class="t">
                {{item.singer}}·{{item.album}}
              </span>
            </p>
          </div>
          <div class="table-cell text-right">
            <i class="dot"></i>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
const COMPONENT_NAME = "app-list";

export default {
  name: COMPONENT_NAME,
  props: {
    data: {
      type: Array,
      default: true
    }
  },
  date() {
    return {};
  },
  methods: {
    selectItem(item, index) {
      this.$emit("select", item, index);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
@import "@/styles/mixins.scss";

.list {
  .table-view {
    overflow: hidden;

    .table-view-cell {
      position: relative;
      display: -webkit-box;

      .table {
        position: relative;
        -webkit-box-flex: 1;
        display: -webkit-box;
        -webkit-box-align: center;
        padding: 10px 16px;
        overflow: hidden;

        .table-cell {
          -webkit-box-flex: 1;
          display: -webkit-box;
          -webkit-box-orient: vertical;

          .title {
            font-size: $font-size-large;
            color: $color-dark;
            line-height: 24px;
            display: -webkit-box;
            -webkit-box-align: center;
            overflow: hidden;
          }

          .content {
            font-size: $font-size-small;
            line-height: 18px;
            display: -webkit-box;
            -webkit-box-align: center;
            overflow: hidden;
          }

          .t {
            display: block;
            max-width: 100%;
            @include ellipsis;
          }
        }
      }
    }
  }
}
</style>

