<template>
  <div class="home">
    <div class="head">
      <div class="head-cont">
        <WebTop></WebTop>
      </div>
    </div>
    <div class="cont-wrap">
      <div class="searh-input">
        <div class="start-group">
          <input
            type="text"
            class="start-input"
            placeholder="向外探索,向内觉知"
            v-model="title"
            @keyup.enter="search"
          />
          <button class="start" @click="search">搜</button>
        </div>
      </div>
      <ArticlePage ref="articlePage" :about="title" :pageSize="10"></ArticlePage>
    </div>
    <div class="foot">
      <WebFoot></WebFoot>
    </div>
  </div>
</template>
<script>
import WebTop from "@/components/page/Top.vue";
import ArticlePage from "@/components/base/ArticlePage.vue";
import WebFoot from "@/components/page/Foot.vue";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      title: this.$route.query.about,
      canRun: true,
    };
  },
  computed: {
    ...mapState({
      scroolTop: (state) => state.blog.scrollTop,
    }),
  },
  components: {
    WebTop,
    ArticlePage,
    WebFoot,
  },
  mounted() {
    this.getScroll();
    this.search()
  },
  methods: {
    ...mapActions({
      setScrollTop: "blog/setScrollTop"
    }),
    getScroll() {
      window.addEventListener("scroll", () => {
        let top =
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          window.pageYOffset;
        if (!this.canRun) return;
        this.canRun = false;
        setTimeout(() => {
          this.setScrollTop(top);
          this.canRun = true;
        }, 500);
      });
    },
    search(){
      this.$refs.articlePage.getBlog()
    }
  },
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: rgba(238, 238, 238, 0.5);
  .head {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    z-index: 999;
    background-color: #fff;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    .head-cont {
      width: 1080px;
      height: 100%;
      margin: 0 auto;
    }
  }
  .cont-wrap {
    width: 1024px;
    margin: 10px auto;
    height: auto;
    .start-group {
      height: 50px;
      display: flex;
      flex-direction: row;
      border-radius: 4px;
      padding: 10px 30px;
      background: #fff;
      .start-input {
        flex: 1;
        height: 48px;
        padding-left: 6px;
        padding-right: 6px;
        border: 0px;
        background-color: #dfdfdf;
        color: #757575;
        outline: none;
      }
      .start {
        width: 124px;
        height: 50px;
        padding: 0px;
        border: 0px;
        background-color: #c3c3c3;
        cursor: pointer;
      }
    }
  }
  .cont-wrap::-webkit-scrollbar {
    display: none;
  }
  .foot {
    width: 100%;
    position: absolute;
    bottom: 0;
    height: 70px;
    margin-top: 10px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
}
</style>
