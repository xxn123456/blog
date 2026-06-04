<template>
  <div class="water-warp">
    <div class="tags">
      <span
        v-for="(item, index) in tags"
        :key="item.value"
        :class="['tag-item', { 'tag-active': tagActive === index }]"
        @click="changeTag(index)"
      >{{ item.label }}</span>
    </div>
    <div class="column-container">
      <div 
        class="column" 
        v-for="(col, colIndex) in columns" 
        :key="colIndex"
      >
        <div
          class="column-item"
          v-for="item in col"
          :key="item.id"
          @click="toDetail(item)"
          role="button"
          :aria-label="`查看详情：${item.title}`"
        >
          <div class="type-1">
            <span class="iconfont icon-lianjie Icon"></span>{{ item.tag }}
          </div>
          <img 
            v-if="item.coverBg" 
            class="coverBg" 
            :src="item.coverBg" 
            :alt="item.title" 
          />
          <div class="title">{{ item.title }}</div>
          <div class="des">查看详情↓</div>
        </div>
      </div>
    </div>

    <div class="loading" v-if="loading">加载中...</div>
    <div class="no-more" v-if="noMore && !loading">没有更多数据了</div>
  </div>
</template>
<script>
import { queryWorks } from "@/api/home.js";

export default {
  data() {
    return {
      columns: [[], [], []], // 三列数据
      columnHeight: [0, 0, 0], // 三列高度
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
      currentPage: 1,
      noMore: false, // 是否还有更多数据
      scrollTimer: null, // 滚动防抖定时器
    };
  },
  components: {},
  mounted() {
    this.queryWorks();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    // 组件销毁前移除滚动事件监听
    window.removeEventListener("scroll", this.handleScroll);
    // 清除定时器
    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer);
    }
  },
  methods: {
    changeTag(tag) {
      this.tagActive = tag;
      // 重置数据
      this.currentPage = 1;
      this.columns = [[], [], []];
      this.columnHeight = [0, 0, 0];
      this.noMore = false;
      this.queryWorks();
    },
    queryWorks() {
      const tag = this.tags[this.tagActive].label;
      let params = {
        tag: tag,
        currentPage: this.currentPage,
        pageSize: 20,
      };
      
      this.loading = true;
      queryWorks(params)
        .then((res) => {
          if (res.code == 200) {
            let data = res.data.rows || [];
            if (data.length > 0) {
              this.distributeToColumns(data);
              this.currentPage += 1;
            } else {
              this.noMore = true;
            }
          }
        })
        .catch((error) => {
          console.error("查询作品失败:", error);
          this.loading = false;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    distributeToColumns(data) {
      // 将数据分配到最矮的列
      data.forEach((item) => {
        // 找到最矮的列
        let minHeight = this.columnHeight[0];
        let minIndex = 0;
        for (let i = 1; i < 3; i++) {
          if (this.columnHeight[i] < minHeight) {
            minHeight = this.columnHeight[i];
            minIndex = i;
          }
        }
        // 添加到最矮的列
        this.columns[minIndex].push(item);
        // 估算高度：图片140px + 其他内容约110px = 250px
        this.columnHeight[minIndex] += 250;
      });
    },
    toDetail(item) {
      // 打开作品详情页
      const origin = "http://blog.shutiaogege.top";
      const openUrl = `${origin}/developDetail?id=${item.id}`;
      window.open(openUrl, "_blank");
    },
    handleScroll() {
      // 防抖处理
      if (this.scrollTimer) {
        clearTimeout(this.scrollTimer);
      }

      this.scrollTimer = setTimeout(() => {
        // 判断是否到达底部
        const innerHeight = window.innerHeight;
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        if (
          scrollTop + innerHeight >= scrollHeight - 100 &&
          !this.loading &&
          !this.noMore
        ) {
          this.loadMore();
        }
      }, 300);
    },
    loadMore() {
      const tag = this.tags[this.tagActive].label;
      let params = {
        tag: tag,
        currentPage: this.currentPage,
        pageSize: 20,
      };

      this.loading = true;
      queryWorks(params)
        .then((res) => {
          if (res.code == 200) {
            let data = res.data.rows || [];
            if (data.length > 0) {
              this.distributeToColumns(data);
              this.currentPage += 1;
            } else {
              this.noMore = true;
            }
          }
        })
        .catch((error) => {
          console.error("加载更多作品失败:", error);
        })
        .finally(() => {
          this.loading = false;
        });
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
    
    .tag-item {
      display: inline-block;
      margin-left: 15px;
      margin-right: 15px;
      transition: color 0.3s;
    }
    
    .tag-active {
      color: #0088f5;
      font-weight: 600;
    }
  }
  
  .loading,
  .no-more {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 12px;
    color: #999;
  }
  
  .column-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
    gap: 10px;
    
    .column {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;
      
      .column-item {
        width: 100%;
        background-color: #fff;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        transition: transform 0.3s, box-shadow 0.3s;
        overflow: hidden;
        
        &:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .type-1 {
          width: 100%;
          text-align: left;
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          color: #333333;
          padding-left: 10px;
          
          span {
            margin-right: 4px;
          }
        }
        
        .coverBg {
          width: 80%;
          height: 140px;
          object-fit: cover;
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
        }
      }
    }
  }
}
</style>