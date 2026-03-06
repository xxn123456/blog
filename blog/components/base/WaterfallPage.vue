<template>
  <div class="water-warp">
    <div class="tags">
      <span
        v-for="(item, index) in tags"
        :key="item.value"
        :style="tagActive == index ? 'color:#0088f5;' : ''"
        @click="changeTag(index)"
        >{{ item.label }}</span
      >
    </div>
    <div class="column">
      <div class="column-item" v-for="item in lists" :key="item.index">
        <div
          class="column-item-card-1 column-item-gaid"
          @click="toDetail(item)"
        >
          <div class="type-1">
            <span class="iconfont icon-lianjie Icon"></span>{{ item.tag }}
          </div>
          <img v-if="item.coverBg" class="coverBg" :src="item.coverBg" alt="" />
          <div class="title">{{ item.title }}</div>
          <div class="des">查看详情↓</div>
        </div>
      </div>
    </div>

    <div class="loading" v-if="loading">加载中...</div>
  </div>
</template>
<script>
import { queryWorks } from "@/api/home.js";
export default {
  data() {
    return {
      lists: [],
      tagActive: 0,
      tags: [
        {
          value: "0",
          label: "大屏",
        },
        {
          value: "1",
          label: "后台管理系统",
        },
        {
          value: "2",
          label: "小程序",
        },
        {
          value: "3",
          label: "自研",
        },
      ],
      loading: false,
    };
  },
  components: {},
  mounted() {
    this.queryWorks();
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    changeTag(tag) {
      this.tagActive = tag;
      this.queryWorks();
    },
    queryWorks() {
      const tag = this.tags[this.tagActive].label;
      let params = {
        tag: tag,
      };
      queryWorks(params).then((res) => {
        if (res.code == 200) {
          let data = res.data.rows;
          this.lists = data;
        }
      });
    },
    toDetail(item) {
      // 跳转
      let openUrl = this.$router.resolve({
        path: "/developDetail?id=" + item.id,
      });
      window.open(openUrl.href, "_blank");
    },
    initWater() {
      this.lists.forEach((el, index) => {
        let min = Math.min(
          this.columnHeight[0],
          this.columnHeight[1],
          this.columnHeight[2]
        );
        if (this.columnHeight[0] == min) {
          this.columns[0].push(el);
          this.columnHeight[0] += el.height;
        } else if (this.columnHeight[1] == min) {
          this.columns[1].push(el);
          this.columnHeight[1] += el.height;
        } else {
          this.columns[2].push(el);
          this.columnHeight[2] += el.height;
        }
      });
    },
    async handleScroll() {
      const innerHeight = window.innerHeight; // 可视窗口高度
      const scrollTop = document.documentElement.scrollTop; // 滚动高度
      const scrollHeight = document.documentElement.scrollHeight; // 页面总高度
      if (scrollTop + innerHeight >= scrollHeight) {
        this.currentPage += 1;
        let msg = JSON.stringify({
          pageSize: "20",
          currentPage: this.currentPage,
        });
        this.loading = true;
        queryWorks(msg).then((res) => {
          if (res.code == 200) {
            let data = res.data.rows;
            this.loading = false;
            // this.lists = this.lists.concat(data)
            if (data.length > 0) {
              this.columns = [[], [], []];
              this.columnHeight = [0, 0, 0];
              data.forEach((item) => {
                this.lists.push(item);
              });
              this.initWater();
            }
          }
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.water-warp {
  width: 100%;
  .tags {
    width: 100%;
    background-color: #fff;
    line-height: 36px;
    color: #333333;
    padding: 5px;
    box-sizing: border-box;
    cursor: pointer;
    span {
      display: inline-block;
      margin-left: 15px;
      margin-right: 15px;
    }
  }
  .loading {
    width: 100%;
    height: 50px;
    position: fixed;
    font-size: 12px;
  }
  .column {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 10px;
    margin-top: 10px;
    .column-item {
      width: 286.6px;
      background-color: #fff;
      border-radius: 4px;
      .column-item-card-1 {
        height: 280px;
        overflow: hidden;
        .coverBg{
          height: 140px;
          width: auto;
          margin: 10px 0;
        }
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
      .des {
        width: 100%;
        text-align: center;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        color: #666666;
        cursor: pointer;
      }
    }
  }
}
</style>