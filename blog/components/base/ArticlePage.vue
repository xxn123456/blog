<template>
  <div class="article">
    <div v-if="isEmpty" class="empty">╭(●｀∀´●)╯,暂无数据</div>
    <div class="article-list" v-else>
      <ul class="has-list" v-if="!loading">
        <li v-for="item in articles" :key="item.id">
          <a @click="to_detail(item)" class="to-detail" role="button">
            <div class="list-item">
              <div class="pic">
                <img :src="item.book" :alt="item.title" />
              </div>
              <div class="cont">
                <div class="title">
                  {{ item.title }}
                </div>
                <div class="subTitle">
                  {{ item.subTitle }}
                </div>
                <div class="other">
                  <div class="other-label">
                    <span
                      class="iconfont icon-shijian"
                      style="font-size: 12px"
                    ></span>
                    <span class="des">{{ item.createdAt }}</span>
                  </div>
                  <div class="other-label">
                    <span
                      class="iconfont icon-kejianxianshi"
                      style="font-size: 12px"
                    ></span>
                    <span class="des">{{ item.visitNum }}</span>
                  </div>
                  <div class="other-label">
                    <span
                      class="iconfont icon-xiaoxi"
                      style="font-size: 12px"
                    ></span>
                    <span class="des">{{ item.replyNum }}</span>
                  </div>
                  <div class="other-label">
                    <span
                      class="iconfont icon-xihuan"
                      style="font-size: 12px"
                    ></span>
                    <span class="des">0</span>
                  </div>

                  <div class="other-label">
                    <span
                      class="iconfont icon-rongqi"
                      style="font-size: 12px"
                    ></span>
                    <span class="des">{{ item.categoryName }}</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </li>
      </ul>
      <ul class="load-list" v-else>
        <li v-for="index in pageSize" :key="index">
          <a class="to-detail">
            <div class="list-item loading-item">
              <div class="pic loading-placeholder"></div>
              <div class="cont">
                <div class="title loading-placeholder"></div>
                <div class="subTitle loading-placeholder"></div>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div class="page-nav">
      <div class="prev">
        <span class="go-nav">
          共计：{{ total }}条,第{{ page }}页,每页{{ pageSize }}条
        </span>
        <span 
          @click="prev" 
          :class="{ 'disabled': page <= 1 }"
          role="button"
          aria-label="上一页"
        >上一页</span>
      </div>
      <div 
        class="next" 
        @click="next"
        :class="{ 'disabled': page * pageSize >= total }"
        role="button"
        aria-label="下一页"
      >下一页</div>
    </div>
  </div>
</template>
<script>
import { getBlogList, updataBlogSee } from "@/api/home.js";

export default {
  props: {
    about: {
      type: String,
      default: null,
    },
    pageSize: {
      type: Number,
      default: 5,
      validator: (value) => value > 0,
    },
  },
  data() {
    return {
      articles: [],
      page: 1,
      isEmpty: true,
      total: 0,
      loading: true,
    };
  },
  computed: {
    blogStore() {
      return this.$store.state.blog;
    },
    leftNavId() {
      return this.blogStore.leftNav;
    },
  },
  watch: {
    leftNavId() {
      // 监听左侧导航变化，重新加载数据
      this.page = 1;
      this.getBlog();
    },
  },
  methods: {
    // 格式化文章数据
    formatArticle(el) {
      // 处理副标题
      let new_subTitle = "未配置详情";
      if (el.content) {
        new_subTitle =
          el.content.length > 80
            ? el.content.substring(0, 80) + "..."
            : el.content;
      }
      // 处理分类名称
      let new_categname = "暂未归类";
      if (el.navType && el.navType.categoryName) {
        new_categname = el.navType.categoryName;
      }
      // 处理封面图
      const book = el.book || require("@/static/error/404.jpeg");

      return {
        id: el.id,
        title: el.title,
        book: book,
        subTitle: new_subTitle,
        createdAt: el.createdAt,
        visitNum: el.visitNum,
        replyNum: Array.isArray(el.reply) ? el.reply.length : 0,
        categoryName: new_categname,
      };
    },
    async getBlog() {
      this.loading = true;
      try {
        let params = {
          currentPage: this.page,
          pageSize: this.pageSize,
          title: this.about,
        };
        if (this.leftNavId != 1) {
          params.navTypeId = this.leftNavId;
        }

        let res = await getBlogList(params);
        let { code, data } = res;
        if (code == "200") {
          if (data.rows && data.rows.length > 0) {
            this.total = data.count;
            this.articles = data.rows.map(this.formatArticle);
            this.isEmpty = false;
            // 滚动到顶部
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              this.loading = false;
            }, 500);
          } else {
            this.isEmpty = true;
            this.articles = [];
            this.total = 0;
            this.loading = false;
          }
        }
      } catch (error) {
        console.error("获取文章列表失败:", error);
        this.loading = false;
        this.isEmpty = true;
      }
    },

    async to_detail(item) {
      // 更新访问量
      try {
        const res = await updataBlogSee({
          id: item.id,
          visitNum: item.visitNum + 1,
        });
        if (res.code == 200) {
          // 更新本地数据
          const article = this.articles.find((a) => a.id === item.id);
          if (article) {
            article.visitNum = item.visitNum + 1;
          }
        }
      } catch (error) {
        console.error("更新访问量失败:", error);
      }

      // 打开文章详情页 - 根据环境动态设置 origin
      const isDev = process.env.NODE_ENV === "development";
      const origin = isDev
        ? `${window.location.protocol}//${window.location.hostname}:8080`
        : "http://blog.shutiaogege.top";
      const openUrl = `${origin}/detail?id=${item.id}`;
      window.open(openUrl, "_blank");
    },

    prev() {
      if (this.page <= 1) {
        return;
      }
      this.page -= 1;
      this.getBlog();
    },

    next() {
      if (this.page * this.pageSize >= this.total) {
        return;
      }
      this.page += 1;
      this.getBlog();
    },
  },
};
</script>
<style lang="scss" scoped>
// 公共加载动画 mixin
@mixin loading-animation {
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
  border-radius: 4px;
}
.article {
  width: 100%;
  overflow: hidden;
  .empty {
    width: 100%;
    height: 100px;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    color: #666666;
  }
  .article-list {
    width: 100%;

    .has-list {
      padding-left: 0px;
      li {
        list-style: none;
        cursor: pointer;

        .to-detail {
          text-decoration: none;

          .list-item {
            width: 100%;
            height: 117px;
            display: flex;
            flex-direction: row;
            padding: 8px;
            background-color: #fff;
            margin-bottom: 16px;
            border-radius: 4px;

            .pic {
              width: 166px;
              height: 117px;
              margin-right: 10px;
              overflow: hidden;

              img {
                width: 166px;
                height: 117px;
                border-radius: 4px;
              }
            }

            .cont {
              width: calc(100% - 186px);
              height: 117px;

              .title {
                width: 100%;
                height: 32px;
                font-size: 14px;
                font-weight: 600;
                color: #333333;
              }

              .subTitle {
                width: 100%;
                height: calc(100% - 54px);
                overflow: hidden;
                font-size: 14px;
                color: #666666;
              }

              .other {
                padding-right: 10px;
                height: 22px;
                line-height: 22px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                font-size: 12px;
                color: #666666;

                .other-label {
                  .des {
                    margin-left: 4px;
                    font-size: 12px;
                  }
                }
              }
            }
          }
        }
      }
    }

    .load-list {
      padding-left: 0px;
      li {
        list-style: none;
        cursor: pointer;

        .to-detail {
          text-decoration: none;

          .loading-item {
            width: 100%;
            height: 117px;
            display: flex;
            flex-direction: row;
            padding: 8px;
            background-color: #f8f8f8;
            margin-bottom: 16px;
            border-radius: 4px;

            .loading-placeholder {
              @include loading-animation;
            }

            .pic {
              width: 166px;
              height: 117px;
              margin-right: 10px;
              overflow: hidden;
            }

            .cont {
              width: calc(100% - 186px);
              height: 117px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;

              .title {
                width: 100%;
                height: 32px;
              }

              .subTitle {
                width: 100%;
                height: 63px;
                overflow: hidden;
              }
            }
          }
        }
      }
    }
  }

  .page-nav {
    margin-top: 10px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-image: url("/layout/up-2.png");
    background-size: 100% 40px;
    background-position: left;

    .prev {
      background-repeat: no-repeat;
      padding-left: 60px;
      float: left;
      color: #333333;
      cursor: pointer;

      .go-nav {
        font-size: 12px;
        margin-right: 20px;
      }

      span {
        transition: opacity 0.3s;
        
        &.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
    }

    .next {
      background-repeat: no-repeat;
      width: 130px;
      float: right;
      text-align: right;
      padding-right: 20px;
      color: #fff;
      cursor: pointer;
      transition: opacity 0.3s;

      &.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
}
</style>
