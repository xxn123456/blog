<template>
  <div class="nav">
    <ul class="nav-list">
      <li
        v-for="item in cateNames"
        :key="item.id"
        @click="navClick(item, 'nuxt')"
      >
        <div
          :href="item.leftNavUrl"
          :class="['nav-item', currentPath == item.leftNavUrl ? 'active' : '']"
        >
          <span class="iconfont Icon" :class="item.icon"></span>
          <span>{{ item.categoryName }}</span>
        </div>
      </li>
    </ul>
    <nav class="other-link">
      <ul>
        <li>
          <nuxt-link to="/webLog" class="nav-item link-item log-link">
            <span class="nav-link">更新日志</span>
          </nuxt-link>
        </li>
        <li>
          <a class="nav-item link-item hot-link" @click="handleFriendLink">
            <span class="nav-link">友情链接</span>
            <span class="state">hot</span>
          </a>
        </li>
        <li>
          <a
            :href="adminUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="nav-item link-item admin-link"
          >
            <span class="nav-link">博客后台</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import { getCateName } from "@/api/home.js";
import { Text } from "@/utils/clickText.js";
import "@/assets/icon/iconfont.css";
import "@/static/fonts/DinRegular.css";
export default {
  data() {
    return {
      cateNames: [],
      adminUrl: "http://shutiaogege.top/blog_admin/#/login", // 博客后台地址
    };
  },
  computed: {
    currentPath() {
      return this.$route.path;
    },
  },
  mounted() {
    this.initCateNames();
    this.creatTextEffect();
  },
  methods: {
    initCateNames() {
      // 优先从 sessionStorage 获取
      const cachedCateNames = sessionStorage.getItem("cateNames");
      if (cachedCateNames) {
        try {
          this.cateNames = JSON.parse(cachedCateNames);
          this.handleCateNamesLoaded();
        } catch (e) {
          console.error("解析缓存的分类数据失败", e);
          this.queryNavType();
        }
      } else {
        // 从接口获取
        this.queryNavType();
      }
    },
    handleCateNamesLoaded() {
      this.cateNames.forEach((item) => {
        if (this.currentPath == item.leftNavUrl) {
          this.$store.dispatch("blog/changeLeft", item.id);
          console.log("当前栏目", item.id);
          this.$emit("navOk", item.id);
        }
      });
    },
    queryNavType() {
      let msg = JSON.stringify({
        currentPage: 1,
        pageSize: 20,
      });
      getCateName(msg).then((res) => {
        let { code, data } = res;
        if (code == "200") {
          this.cateNames = data.rows;
          // 保存到 sessionStorage
          sessionStorage.setItem("cateNames", JSON.stringify(data.rows));
          this.handleCateNamesLoaded();
        }
      });
    },
    navClick(item, type) {
      if (type == "nuxt") {
        this.$router.push(item.leftNavUrl);
      }
    },
    handleFriendLink() {
      // 友情链接点击处理 - 可以跳转到友情链接页面或弹窗显示
      this.$message.info("友情链接功能开发中...");
      // 如果需要跳转到友情链接页面，可以取消下面的注释
      // this.$router.push('/friendLinks');
    },
    creatTextEffect() {
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
  },
};
</script>
<style lang="scss" scoped>
.nav {
  width: 160px;
  position: sticky;
  top: 65px;
  cursor: pointer;
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
      .nav-item {
        width: 160px;
        height: 42px;
        line-height: 42px;
        margin-bottom: 8px;
        text-decoration: none;
        color: #333333;
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
    cursor: pointer;
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
        .link-item {
          width: 160px;
          height: 42px;
          line-height: 42px;
          margin-bottom: 8px;
          text-decoration: none;
          font-weight: 600;
          .nav-link {
            position: relative;
            left: 30px;
          }
          .state {
            position: absolute;
            font-size: 12px;
            left: 90px;
          }
        }
        // 提取的颜色类
        .log-link {
          color: #fd7515;
        }
        .hot-link {
          color: red;
        }
        .admin-link {
          color: #0088f5;
        }
      }
    }
  }
}
</style>
