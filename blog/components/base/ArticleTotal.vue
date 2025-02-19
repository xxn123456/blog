<template>
  <div class="article-total">
    <div class="num" v-if="articleTotal != '-'">
      <span class="target">{{articleTotal}}</span>
      <span class="target-des">文章数量</span>
    </div>
    <div class="article-num-skeion" v-else></div>
    <div class="separator">|</div>
    <div class="num">
      <span class="target">-</span>
      <span class="target-des">点击次数</span>
    </div>
    <div class="separator">|</div>
    <div class="num">
      <span class="target">-</span>
      <span class="target-des">全站评论</span>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {

    };
  },
  computed: {
    ...mapState({
      articleTotal: (state) => state.blog.article.total,
    })
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
@keyframes loading {
  to {
    background-position-x: -20%;
  }
}
.article-total {
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  .num {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .target {
      font-size: 16px;
      color: #333333;
      font-weight: 550;
      text-align: center;
    }
    .target-des {
      font-size: 12px;
      color: #999999;
      text-align: center;
    }
  }
  .article-num-skeion {
    width: 80px;
    height: 40px;
    background-color: #ededed;
    background: linear-gradient(
        120deg,
        rgba(255, 255, 255, 0) 40%,
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0) 60%
      )
      #ededed;
    background-size: 200% 100%;
    background-position-x: 180%;
    animation: 0.5s loading ease-in-out infinite;
  }
  .separator {
    color: rgba(0, 0, 0, 0.26);
  }
}
</style>