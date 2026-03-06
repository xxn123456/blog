<template>
  <div class="water-warp">
    <div class="column-item" v-for="item in lists" :key="item.index">
      <div class="column-item-card-1 column-item-gaid">
        <div class="type-1">
          <span class="iconfont icon-lianjie Icon"></span>{{ item.type }}
        </div>
        <img class="cover" :src="item.coverBg" alt="" />
        <div class="title">{{ item.title }}</div>
        <div class="tag">
          <el-tag
            class="tag-item"
            size="mini"
            v-for="s in item.tags"
            :key="s.index"
            >{{ s }}</el-tag
          >
        </div>
        <div class="des" @click="toDetail(item.url)">
          访问网址：{{ item.url }}
        </div>
      </div>
    </div>
    <div class="loading" v-if="loading">加载中...</div>
  </div>
</template>
<script>
import { queryWebSet } from "@/api/home.js";
export default {
  data() {
    return {
      currentPage: 1,
      lists: [],
      loading: false,
    };
  },
  components: {},
  mounted() {
    this.queryWebSet();
  },
  methods: {
    queryWebSet() {
      let msg = JSON.stringify({
        name: "laboratory",
        pageSize: "1",
        currentPage: "1",
      });
      queryWebSet(msg).then((res) => {
        let { data } = res;
        if (res.code == 200 && data.rows) {
          this.lists = JSON.parse(data.rows[0].configs);
        }
      });
    },
    toDetail(url) {
      // 跳转
      window.open(url, "_blank");
    },
  },
};
</script>
<style lang="scss" scoped>
.water-warp {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .loading {
    width: 100%;
    height: 50px;
    position: fixed;
    font-size: 12px;
  }
  .column-item {
    width: 260px;
    background-color: #fff;
    border-radius: 4px;
    overflow: hidden;
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 15px;
    .column-item-card-1 {
      min-height: 360px;
      height: auto;
      img {
        height: 120px;
        margin: 10px 0;
      }
    }

    .column-item-gaid {
      margin-bottom: 10px;
      padding: 5px 10px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
    }
    .type-1 {
      width: 100%;
      text-align: left;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      color: #333333;
      span {
        margin-right: 4px;
      }
    }

    .title {
      width: 100%;
      text-align: center;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      color: #333333;
      font-weight: 550;
    }
    .tag {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .tag-item {
        margin: 5px;
      }
    }
    .des {
      width: 100%;
      text-align: center;
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      color: #666666;
      display: flex;
      flex-direction: row;
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
</style>