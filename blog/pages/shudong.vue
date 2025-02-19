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
            <div class="gogle-ad">
             
            </div>
            <div class="article-wrap">
              <ArticlePage></ArticlePage>
            </div>
          </div>
        </div>
        <div class="aside-ad">
          <div class="ad">
            <div class="total">
              <ArticleTotal></ArticleTotal>
            </div>
            <div class="hot-some">
               <HotSome title="推荐文章"></HotSome>
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
import AsideAd from "@/components/ad/AsideAd.vue";
import ArticleSwiper from "@/components/base/ArticleSwiper.vue";
import Notice from "@/components/base/Notice.vue";
import HomeAd from "@/components/ad/HomeAd.vue";
import ArticlePage from "@/components/base/ArticlePage.vue";
import WebFoot from "@/components/page/Foot.vue";
import Toop from "@/components/base/Tool.vue";
import Search from "@/components/base/Search.vue";
import ArticleTag from "@/components/base/Tag.vue";
import ArticleTotal from '@/components/base/ArticleTotal.vue';
import Webinfo from '@/components/base/Webinfo.vue';
import HotSome from "@/components/base/HotSome.vue";
import {mapState,mapActions} from "vuex";
export default {
  data() {
    return {
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
    HotSome,
    AsideAd,
    ArticleSwiper,
    Notice,
    HomeAd,
    Search,
    ArticleTotal,
    ArticleTag,
    ArticlePage,
    Webinfo,
    WebFoot,
    Toop,
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
  min-width: 1050px;
  position: relative;
  background-color: rgba(238, 238, 238, 0.5);
  .head {
    position: fixed;
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
      width: 1050px;
      height: 100%;
      margin: 0 auto;
    }
  }
  .cont-wrap {
    width: 1050px;
    height: auto;
    margin: 0 auto;
 
    .cont {
      padding-top: 74px;
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
        width: 594px;
        min-height: 800px;
        margin-bottom: 100px;
        margin-top: -16px;
        
      }
      .aside-ad {
        width: 266px;
        .ad {
          width: 266px;
          height: 100%;

          .search-warp {
            height: 44px;
            margin-bottom: 16px;
          }
          .info{
            height: 200px;
            margin-top: 12px;
          }

          .hot-some {
            height: 394px;
            margin-bottom: 16px;
            margin-top: 12px;
          }

          .ad-msg {
            width: 226px;
            height: 90px;
          }

          .art-tag-warp {
            margin-top: 15px;
            width: 266px;
            color: #333333;

            .ad-msg {
              width: 226px;
              height: 90px;
              margin-bottom: 15px;
            }
          }
        }
      }
      .msg-btns {
        position: fixed;
        margin-left: 1100px;
        bottom: 180px;
      }
    }
  }
  .cont-wrap::-webkit-scrollbar {
    display: none;
  }
  .foot {
    height: 70px;
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
