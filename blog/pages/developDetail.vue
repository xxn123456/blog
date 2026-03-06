<template>
  <div class="home">
    <div class="head">
      <div class="head-cont">
        <WebTop></WebTop>
      </div>
    </div>
    <div class="bg-video">
      <img src="@/static/img/1739959905607.jpg" />
      <div class="bg-title">项目名称：{{ blog.title }}</div>
    </div>
    <div class="cont-wrap">
      <div class="cont">
        <div class="cont-des">
          <div>类型：{{ blog.tag }}</div>
          <div>介绍：{{ blog.des }}</div>
        </div>
        <mavon-editor
          v-model="blog.content"
          codeStyle="tomorrow-night-eighties"
          :subfield="false"
          :toolbarsFlag="false"
          :preview="true"
          defaultOpen="preview"
          :boxShadow="false"
          previewBackground="#fff"
        >
        </mavon-editor>
      </div>
    </div>
    <div class="foot">
      <WebFoot></WebFoot>
    </div>
  </div>
</template>
<script>
import WebTop from "@/components/page/Top.vue";
import WebFoot from "@/components/page/Foot.vue";
import footBar from "@/components/page/Foot.vue";
import { queryWorkDetail } from "@/api/home.js";
export default {
  data() {
    return {
      blogId: this.$route.query.id,
      blog: {
        title: "文章标题",
        content: "",
        des: "",
        tag: "",
      },
    };
  },
  components: {
    WebTop,
    WebFoot,
    footBar,
  },
  mounted() {
    this.get_BlogDetail();
  },
  methods: {
    get_BlogDetail() {
      let msg = JSON.stringify({
        id: this.blogId,
      });
      queryWorkDetail(msg).then((res) => {
        let { code, data } = res;
        if (code == "200") {
          this.blog = {
            title: data.title,
            des: data.des,
            tag: data.tag,
            content: data.cont,
          };
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  position: relative;
  min-height: 100vh;
   background-color: rgba(238, 238, 238, 0.6);
  .head {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    z-index: 999;
    background-color: #ffffff;
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
  .bg-video {
    position: relative;
    height: 380px;
    overflow: hidden;
    img {
      width: 100%;
      height: 380px;
    }
    .bg-title {
      position: absolute;
      top: 150px;
      height: 80px;
      line-height: 80px;
      font-size: 38px;
      width: 100%;
      color: #fff;
      text-align: center;
    }
  }

  .cont-wrap {
    width: 100%;
    height: auto;
    .cont {
      width: 1050px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      margin-bottom: 100px;
    
      .cont-des {
        width: 100%;
        text-align: center;
        background-color: #ffffff;
        line-height: 36px;
        margin-top: 10px;
        padding: 10px 15px;
        box-sizing: border-box;
      }

      .up-msg {
        margin-bottom: 30px;
        padding: 20px 30px;

        ul {
          li {
            list-style: none;
            margin-top: 10px;
            width: 100%;
            height: auto;
            line-height: 40px;
            font-size: 14px;
            color: #666666;

            .up-state {
              padding-left: 12px;
              padding-right: 12px;
            }
          }
        }
      }
    }
  }

  .cont-wrap::-webkit-scrollbar {
    display: none;
  }

  .foot {
    position: absolute;
    width: 100%;
    height: 70px;
    background-color: #fff;
    bottom: 0px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
}
</style>
