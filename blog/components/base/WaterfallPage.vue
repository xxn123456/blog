<template>
  <div class="water-warp">
    <div class="column" v-for="columnItem in columns" :key="columnItem.index">
      <div class="column-item" v-for="item in columnItem" :key="item.index">
        <div
          class="column-item-card-1 column-item-gaid"
          v-show="item.cardType == 1"
        >
          <div class="type-1">
            <span class="iconfont icon-rongqi Icon"></span>/ {{item.tag}}
          </div>
          <img
            :src="item.coverBg"
            alt=""
          />
          <div class="title">{{item.title}}</div>
          <div class="des" @click="toDetail(item)">查看详情↓</div>
        </div>
        <div
          class="column-item-card-2 column-item-gaid"
          v-show="item.cardType == 2"
        >
          <div class="type-2">
            <span class="iconfont icon-rongqi Icon"></span>/ {{item.tag}}
          </div>
          <img
            :src="item.coverBg"
            alt=""
          />
          <div class="title">{{item.title}}</div>
          <div class="des" @click="toDetail(item)">查看详情↓</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { queryWorks } from "@/api/home.js";
export default {
  data() {
    return {
      currentPage: 1,
      columnHeight: [0, 0, 0],
      cardType: 0, //
      lists: [],
      columns: [[], [], []],
    };
  },
  components: {},
  mounted() {
    this.queryWorks();
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    queryWorks() {
      let msg = JSON.stringify({
        pageSize: "10",
        currentPage: this.currentPage,
      });
      queryWorks(msg).then((res) => {
        if (res.code == 200) {
          let data = res.data.rows;
          this.lists = data;
          this.initWater();
        }
      });
    },
    toDetail(item){
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
          pageSize: "10",
          currentPage: this.currentPage,
        });
        queryWorks(msg).then((res) => {
          if (res.code == 200) {
            let data = res.data.rows;
            this.lists = this.lists.concat(data)
            if(data.length>0){
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
  display: flex;
  flex-direction: row;
  .column {
    flex-grow: 1;
    flex-basis: 0;
    padding-left: 10px;
    padding-right: 10px;
    .column-item {
      background-color: #fff;
      border-radius: 4px;
      .column-item-card-1 {
        height: 280px;
        img {
          width: 240px;
          height: auto;
          margin: 10px 0;
        }
      }
      .column-item-card-2 {
        height: 620px;
        img {
          width: 200px;
          height: auto;
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
        color: #0088f5;
        font-weight: 550;
        span {
          margin-right: 10px;
        }
      }
      .type-2 {
        width: 100%;
        text-align: left;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: #fd7515;
        font-weight: 550;
        span {
          margin-right: 10px;
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
        font-size: 14px;
        color: #666666;
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}
</style>