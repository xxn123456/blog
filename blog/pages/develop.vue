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
          <LeftNav></LeftNav>
        </div>
        <div class="content">
          <div class="artice">
            <div class="article-wrap">
              <WaterfallPage></WaterfallPage>
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
import ArticlePage from "@/components/base/ArticlePage.vue";
import WebFoot from "@/components/page/Foot.vue";
import Toop from "@/components/base/Tool.vue";
import WaterfallPage from "@/components/base/WaterfallPage.vue";
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
    ArticlePage,
    Toop,
    WaterfallPage,
    WebFoot,
  },
  mounted() {
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
  },
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  min-width: 1050px;
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
    width: 1080px;
    height: auto;
    margin: 0 auto;
    padding-left: 15px;
    padding-right: 15px;
    .cont {
      padding-top: 10px;
      width: 1050px;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .artice {
        width: 100%;

        .my-swiper {
          width: 100%;
          height: 200px;
          margin-bottom: 16px;
        }
        .my-houre {
          width: 100%;
          height: 36px;
          margin-top: 12px;
        }
      }
      .aside-nav {
        width: 160px;
      }
      .content {
        width: 880px;
        margin-left: 10px;
        min-height: 800px;
        margin-bottom: 100px;
      }
      .msg-btns {
        position: fixed;
        right: 300px;
        bottom: 180px;
      }
    }
  }
  .cont-wrap::-webkit-scrollbar {
    display: none;
  }

  .foot {
    height: 70px;
    margin-top: 10px;
    background-color: #fff;
    top: 0px;
    left: 0px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
}
</style>
