<template>
  <div class="main">
    <div class="detail">
      <div class="artcle-type">讨论</div>
      <h2>{{ blog.title }}</h2>
      <div class="detail-mian">
        <client-only>
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
        </client-only>
      </div>
    </div>
    <div class="share">
      <a href="#" v-for="share in shares" :key="share.index">
        <span class="iconfont" :class="`icon-${share.class}`"></span>
      </a>
    </div>
    <div class="about-artcle">
      <ul>
        <li>
          <div class="left-line"></div>
          <span>本文于2021-2-19发布,发布栏目明殿|当前浏览量2000</span>
        </li>
        <li>
          <div class="left-line"></div>
          <span>标签:名店</span>
        </li>

        <li>
          <div class="left-line"></div>
          <span>文章地址:baidu.com</span>
        </li>
        <li>
          <div class="left-line"></div>
          <span>版权声明:自由转载,请标明出处,禁止商业使用</span>
        </li>
      </ul>

      <div class="ewm">
        <div>微信小程序扫码阅读</div>
        <img src="@/static/layout/ewm.png" alt="" />
      </div>
    </div>
    <div class="detail-ad">
      <img src="@/static/layout/xiaomi-11.png" alt="" />
    </div>
    <div class="recom-article">
      <div class="recom-item">
        <img src="@/static/layout/recomd.png" alt="" />
        <span>寻求代码本质,还是流与形式</span>
      </div>
      <div class="recom-item">
        <img src="@/static/layout/recomd.png" alt="" />
        <span>寻求代码本质,还是流与形式</span>
      </div>
      <div class="recom-item">
        <img src="@/static/layout/recomd.png" alt="" />
        <span>寻求代码本质,还是流与形式</span>
      </div>
      <div class="recom-item">
        <img src="@/static/layout/recomd.png" alt="" />
        <span>寻求代码本质,还是流与形式</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    blog: {
      type: Object,
      default: {
        title: "文章标题",
        content: "",
      },
    },
  },
  data() {
    return {
      shares: [
        {
          name: "微信",
          class: "weixin",
          url: () => `/partials/qrcode.html?url=${this.url}`,
        },
        {
          name: "微博",
          class: "weibo",
          url: () =>
            `https://service.weibo.com/share/share.php?url=${
              this.url
            }&title=${this.title()}&source=${this.url}&sourceUrl=${
              this.url
            }&content=${this.description()}`,
        },
        {
          name: "twitter",
          class: "twitter",
          url: () =>
            `https://twitter.com/share?text=${this.title()}&url=${this.url}`,
        },
        {
          name: "QQ空间",
          class: "qqkongjian",
          url: () =>
            `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${
              this.url
            }&title=${this.title()}&summary=${this.description()}&site=${
              this.url
            }`,
        },
        {
          name: "豆瓣",
          class: "douban",
          url: () =>
            `https://www.douban.com/recommend/?url=${
              this.url
            }&title=${this.title()}`,
        },
        {
          name: "有道笔记",
          class: "youdaoyunbiji",
          url: () =>
            `https://www.evernote.com/clip.action?url=${
              this.url
            }&title=${this.title()}`,
        },
        {
          name: "facebook",
          class: "facebook",
          url: () => `https://www.facebook.com/sharer/sharer.php?u=${this.url}`,
        },
        {
          name: "linkedin",
          class: "lianjie",
          url: () =>
            `https://www.linkedin.com/shareArticle?title=${this.title()}&summary=${this.description()}&mini=true&url=${
              this.url
            }`,
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  height: auto;

  .detail {
    padding: 12px 24px;
    width: 100%;
    min-height: 200px;
    background-color: #fff;
    position: relative;
    overflow: hidden;
    /deep/ .v-note-wrapper{
        border: 0px;
        color: #555555;
        font-size: 14px;
    }

    .artcle-type {
      position: absolute;
      top: -11px;
      left: -29px;
      transform: rotate(-45deg);
      background-color: rgba(76, 175, 80, 0.8);
      width: 84px;
      height: 48px;
      padding-top: 12px;
      line-height: 36px;
      text-align: center;
      text-transform: uppercase;
      transform-origin: center;
      color: #fff;
      font-weight: 700;
      font-size: 12px;
    }

    h2 {
      text-align: center;
      font-weight: 700;
      font-size: 20px;
      color: #555555;
      margin-top: 20px;
      margin-bottom: 30px;
    }

    .detail-mian {
      font-size: 14px;
      color: #555555;
      font-weight: bold;
      position: relative;
      z-index: 10;
    }
  }

  .detail-ad {
    margin-top: 15px;
    height: 220px;
    background-color: #fff;
    padding: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .share {
    margin-top: 15px;
    height: 60px;
    padding: 12px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    a {
      display: inline-block;
      width: 48px;
      height: 36px;

      text-decoration: none;
      background-color: rgb(238, 238, 238);

      span {
        display: inline-block;
        width: 100%;
        height: 100%;
        font-size: 20px;
        color: #555;
        text-align: center;
        line-height: 36px;
      }
    }
  }

  .about-artcle {
    width: 100%;
    margin-top: 15px;
    min-height: 120px;
    padding: 12px;
    background-color: #fff;

    ul {
      list-style: none;
      padding-left: 0px;

      li {
        width: 100%;
        display: flex;
        flex-direction: row;
        padding-bottom: 15px;

        .left-line {
          width: 8px;
          height: 20px;
          background-color: rgb(238, 238, 238);
        }

        span {
          display: inline-block;
          padding-left: 12px;
          font-size: 14px;
          color: #555555;
          font-weight: 500;
        }
      }
    }

    .ewm {
      width: 100%;
      height: 140px;
      text-align: center;

      img {
        width: 100px;
        height: 100px;
        margin: 10px auto;
      }
    }
  }

  .recom-article {
    width: 100%;
    height: 180px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
    margin-top: 15px;

    .recom-item {
      width: 190px;
      height: 120px;
      display: flex;
      flex-direction: column;
      margin-right: 10px;
      margin-bottom: 10px;

      span {
        font-size: 12px;
        color: #555555;
        opacity: 0.9;
        display: inline-block;
        height: 30px;
        line-height: 30px;
        background-color: #fff;
        text-align: center;
      }
    }

    .recom-item:nth-of-type(3n) {
      margin-right: 0px;
    }
  }
}
</style>
