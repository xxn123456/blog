<template>
  <div class="home">
    <div class="head">
      <div class="head-cont">
        <WebTop></WebTop>
      </div>
    </div>
     <div class="bg-video">
          <img src="@/static/img/1739959905607.jpg" />
    </div>
    <div class="cont-wrap">
      <div class="cont">
       
        <div class="up-msg">
          <h4>版本开发计划</h4>
        </div>
        <div class="block">
          <client-only>
            <el-timeline>
              <el-timeline-item :timestamp="item.time" placement="top" v-for="item in blogs" :key="item.index">
                <el-card>
                  <h4>
                    {{item.cont}}
                  </h4>
                  <p>{{item.autor}} 提交于 {{item.time}}</p>
                </el-card>
              </el-timeline-item>
          </el-timeline>
          </client-only>
        </div>
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
import { queryWebSet } from "@/api/home.js";
export default {
  data() {
    return {
      canRun: true,
      blogId: this.$route.query.id,
      blogs: [],
    };
  },
  components: {
    WebTop,
    WebFoot,
    footBar,
  },
  mounted() {
    this.queryWebSet()
  },
  methods: {
     queryWebSet() {
      let msg = JSON.stringify({
        name: "web-updata",
        pageSize: "1",
        currentPage: "1",
      });
      queryWebSet(msg).then((res) => {
        let { data } = res;
        if (res.code == 200 && data.rows) {
          this.blogs = JSON.parse(data.rows[0].configs);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  min-width: 1050px;
  position: relative;
  background-image: url("../static/layout/background.png");

  .head {
    position: fixed;
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
      width: 1050px;
      height: 100%;
      margin: 0 auto;
    }
  }
  .bg-video{
    position: relative;
    height: 380px;
    overflow: hidden;
    img{
      width: 100%;
      height: 380px;
    }
  }

  .cont-wrap {
    width: 100%;
    height: auto;
    background-color: rgba(238, 238, 238, 0.6);

    .cont {
      padding-top: 30px;
      width: 900px;

      margin: 0 auto;
      display: flex;
      flex-direction: column;

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
