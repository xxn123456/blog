<template>
  <div class="home">
    <div class="head">
      <div class="head-cont">
        <WebTop></WebTop>
      </div>
    </div>
    <div class="cont-wrap">
      <div class="cont">
        <detail-main></detail-main>
      </div>
    </div>
    <div class="foot">
      <WebFoot></WebFoot>
    </div>
  </div>
</template>
<script>
import DetailMain from "@/components/content/ArticleDetail.vue";
import WebTop from "@/components/page/Top.vue";
import WebFoot from "@/components/page/Foot.vue";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      canRun: true
    };
  },
  components: {
    WebTop,
    WebFoot,
    DetailMain,
  },
  mounted() {
    this.getScroll();
  },
  methods: {
    ...mapActions({
      setScrollTop: "blog/setScrollTop",
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
    }
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  min-height: 100vh;
  padding-bottom: 80px;
  position: relative;
  background-color: rgba(238, 238, 238, 0.5);
  .head {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    z-index: 999;
    background: #fff;
    .head-cont {
      width: 1080px;
      height: 100%;
      margin: 0 auto;
    }
  }
  .cont-wrap {
    width: 1050px;
    margin: 0 auto;
    text-align: center;
    height: auto;
    position: relative;
    .cont {
      width: 900px;
      padding-top: 10px;
      overflow-x: hidden;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .artice {
        width: 100%;
        height: 2600px;

        .my-swiper {
          width: 100%;
          height: 200px;
          margin-bottom: 16px;
        }

        .my-houre {
          width: 100%;
          height: 36px;
        }
      }

      .aside-nav {
        width: 160px;
      }

      .content {
        width: 594px;
        height: 2715px;
      }

      .aside-ad {
        width: 266px;
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
    position: absolute;
    bottom: 0px;
    width: 100%;
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
