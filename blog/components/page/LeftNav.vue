<template>
  <div class="nav">
    <ul class="nav-list" v-if="cateNames.length > 0">
      <li v-for="item in cateNames" :key="item.id" @click="activeNav(item)">
        <div
          :href="item.leftNavUrl"
          :class="currentPath == item.leftNavUrl ? 'active' : ''"
        >
          <span class="iconfont Icon" :class="item.icon"></span
          ><span>{{ item.categoryName }}</span>
        </div>
      </li>
    </ul>
    <div class="nav-skeion" v-else>
      <div
        v-for="item in cateNameSkeion"
        :key="item.index"
        class="nav-skeion-item"
      ></div>
    </div>
    <div class="other-link">
      <ul>
        <li>
          <nuxt-link to="/webLog" class="link" style="color: #fd7515"
            ><span class="nav-link">更新日志</span></nuxt-link
          >
        </li>
        <li>
          <a
            href="http://shutiaogege.top/job/#/index"
            class="link"
            style="color: red"
            ><span class="nav-link">个人简历</span
            ><span class="state">hot</span></a
          >
        </li>
        <li>
          <a
            href="http://shutiaogege.top/blog_admin/#/login"
            target="_blank"
            class="link"
            style="color: #0088f5"
            ><span class="nav-link">博客后台</span></a
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import "@/assets/icon/iconfont.css";
import "@/static/fonts/DinRegular.css";
import { mapState, mapMutations } from "vuex";
import { getCateName} from "@/api/home.js";
import { Text } from "@/utils/clickText.js";
export default {
  data() {
    return {
      cateNames: [],
      cateNameSkeion: [{}, {}, {}, {}],
    };
  },
  computed: {
    ...mapState("blog", {
      active: (state) => state.leftNav,
      menuLists: (state) => state.menu,
    }),

    currentPath() {
      return this.$route.path;
    },
  },
  mounted() {
    if (this.menuLists.length == 0) {
      this.get_CateName();
      this.initText();
    } else {
      this.cateNames = this.menuLists;
    }
  },
  methods: {
    ...mapMutations({
      setMenu: "blog/SETMENUN",
      changeLeft: "blog/CHANGLEFT",
    }),
    initText() {
      window.addEventListener("load", function () {
        let body = document.body;
        let content = ["自由", "民主", "富强", "和谐", "友善"]; //自定义内容的数组
        body.addEventListener("click", function (e) {
          let x = e.pageX;
          let y = e.pageY; //当前坐标
          let randContent = Math.ceil(Math.random() * content.length);
          let text = new Text(x, y, randContent, content);
          let span = document.createElement("span");
          span.style.color = text.getRandom();
          text.create(span);
          setTimeout(function () {
            text.out(span);
          }, 1900);
        });
      });
    },

    get_CateName() {
      if (this.menuLists.length != 0) {
        this.cateNames = this.menuLists;
        return false;
      }
      let msg = JSON.stringify({
        currentPage: 1,
        pageSize: 20,
      });
      getCateName(msg).then((res) => {
        let { code, data } = res;
        if (code == "200") {
          this.cateNames = data.rows;
          this.setMenu(this.cateNames);
          this.cateNames.forEach((item) => {
            if (this.currentPath == item.leftNavUrl) {
              console.log("开始设置")
              this.changeLeft(item.id);
            }
          });
        }
      });
    },

    activeNav(item) {
      this.changeLeft(item.id);
      this.$router.push(item.leftNavUrl);
    },
  },
};
</script>
<style lang="scss" scoped>
@keyframes loading {
  to {
    background-position-x: -20%;
  }
}

.nav {
  width: 160px;
  position: fixed;
  .nav-list {
    background-color: rgba(255, 255, 255, 0.5);
  }

  ul {
    padding-left: 0px;

    li {
      width: 100%;
      list-style: none;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-size: 14px;

      div {
        width: 160px;
        height: 42px;
        line-height: 42px;
        margin-bottom: 8px;
        text-decoration: none;
        color: #333333;
        cursor: pointer;

        .Icon {
          margin-right: 12px;
          margin-left: 30px;
        }
      }

      .active {
        background-color: #fff;
        color: #0088f5;
      }
    }
  }
  .nav-skeion {
    .nav-skeion-item {
      display: block;
      width: 160px;
      height: 42px;
      line-height: 42px;
      margin-bottom: 8px;
      text-decoration: none;
      color: #333333;
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
  }

  .other-link {
    ul {
      padding-left: 0px;

      li {
        width: 100%;
        list-style: none;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        border-bottom: 1px dashed #dadada;

        a {
          display: block;
          width: 160px;
          height: 42px;
          line-height: 42px;
          margin-bottom: 8px;
          text-decoration: none;

          font-weight: 600;

          .Icon {
            margin-right: 12px;
            margin-left: 30px;
          }
          .nav-link {
            position: relative;
            left: 30px;
          }

          .state {
            font-size: 8px;
            margin-left: 8px;
          }
        }
      }
    }
  }
}
</style>
