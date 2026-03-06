<template>
  <div class="home">
    <div class="head">
      <div class="head-cont">
        <WebTop></WebTop>
      </div>
    </div>
    <div class="cont-wrap">
      <div class="cont">
        <div class="aside-nav">
          <LeftNav @navOk="navOk"></LeftNav>
        </div>
        <div class="content">
          <div class="artice">
            <div class="article-wrap">
              <ArticlePage ref="articlePage"></ArticlePage>
            </div>
          </div>
        </div>
        <div class="aside-ad">
          <div class="ad">
            <div class="total">
              <ArticleTotal ref="articleTotal"></ArticleTotal>
            </div>
            <div class="search-warp">
              <Search ref="searchBtn"></Search>
            </div>
            <div class="art-tag-warp">
              <ArticleTag @selectPoint="selectPoint"></ArticleTag>
            </div>
            <div class="hot-some">
              <HotSome ref="hotSome" title="推荐文章"></HotSome>
            </div>
          </div>
        </div>
        <div class="msg-btns">
          <Toop></Toop>
        </div>
      </div>
    </div>
    <div class="foot">
      <WebFoot></WebFoot>
    </div>
  </div>
</template>
<script>
import LeftNav from "@/components/page/LeftNav.vue";
import WebTop from "@/components/page/Top.vue";
import ArticleSwiper from "@/components/base/ArticleSwiper.vue";
import ArticlePage from "@/components/base/ArticlePage.vue";
import WebFoot from "@/components/page/Foot.vue";
import Toop from "@/components/base/Tool.vue";
import Search from "@/components/base/Search.vue";
import HotSome from "@/components/base/HotSome.vue";
import ArticleTag from "@/components/base/Tag.vue";
import ArticleTotal from "@/components/base/ArticleTotal.vue";
import { mapState, mapActions } from "vuex";
import { detectDevice } from "@/utils/navigator.js";
export default {
  data() {
    return {
      web: "",
      canRun: true,
    };
  },
  computed: {
    ...mapState({
      scroolTop: (state) => state.blog.scrollTop,
    }),
  },
  components: {
    LeftNav,
    WebTop,
    ArticleSwiper,
    Search,
    HotSome,
    ArticleTotal,
    ArticleTag,
    ArticlePage,
    WebFoot,
    Toop,
  },
  mounted() {
    let web = detectDevice();
    this.web = web;
    this.getScroll();
  },
  methods: {
    ...mapActions({
      setScrollTop: "blog/setScrollTop",
      changeLeft: "blog/changeLeft",
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
    navOk() {
      // 导航好了之后，获取文章列表
      this.$refs.articlePage.getBlog();
      this.$refs.hotSome.getBlog()
      this.$refs.articleTotal.getBlogAsy()
    },
    selectPoint(value) {
      this.$refs.searchBtn.changeCont(value);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./static/css/layout.scss";
</style>
