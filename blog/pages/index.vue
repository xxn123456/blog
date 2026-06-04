<template>
  <div class="home" v-if="isDesktop=='pc'">
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
            <div class="my-swiper">
              <ArticleSwiper></ArticleSwiper>
            </div>
            <div class="my-houre">
              <Notice></Notice>
            </div>
            <div class="gogle-ad">
              <HomeAd></HomeAd>
            </div>
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
              <Search></Search>
            </div>
            <div class="art-tag-warp">
              <ArticleTag></ArticleTag>
            </div>
            <div class="hot-some">
              <HotSome ref="hotSome" title="好文推荐"></HotSome>
            </div>
            <div class="ad-msg">
              <right-ad></right-ad>
            </div>
            <Calendar></Calendar>
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
import Notice from "@/components/base/Notice.vue";
import HomeAd from "@/components/ad/HomeAd.vue";
import ArticlePage from "@/components/base/ArticlePage.vue";
import WebFoot from "@/components/page/Foot.vue";
import Toop from "@/components/page/Tool.vue";
import ArticleTotal from "@/components/base/ArticleTotal.vue";
import Search from "@/components/base/Search.vue";
import HotSome from "@/components/base/HotSome.vue";
import RightAd from "@/components/ad/RightAd.vue";
import Calendar from "@/components/base/Calendar.vue";
import ArticleTag from "@/components/base/Tag.vue";
import { mapState, mapActions } from "vuex";
import { detectDevice } from "@/utils/navigator.js";
export default {
  data() {
    return {
      canRun: true,
      isDesktop: true, // 是否为电脑设备
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
    Notice,
    HomeAd,
    ArticleTotal,
    Search,
    HotSome,
    RightAd,
    Calendar,
    ArticleTag,
    ArticlePage,
    WebFoot,
    Toop,
  },
  mounted() {
    const pc = detectDevice();
    if (pc!="pc") {
      // 非电脑设备,跳转到移动端提示页面
      this.$router.replace("/mobile-tip");
    }
    console.log("设备类型", pc);
    this.isDesktop = pc;
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
      this.$refs.hotSome.getBlog();
      this.$refs.articleTotal.getBlogAsy();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./static/css/layout.scss";
</style>
