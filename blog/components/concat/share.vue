<template>
  <div class="share-group">
    <a href="#" v-for="share in shares" :key="share.index">
      <span class="iconfont" :class="`icon-${share.class}`"></span>
    </a>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        shares: [{
            name: '微信',
            class: 'weixin',
            url: () => `/partials/qrcode.html?url=${this.url}`
          },
          {
            name: '微博',
            class: 'weibo',
            url: () =>
              `https://service.weibo.com/share/share.php?url=${this.url}&title=${this.title()}&source=${this.url}&sourceUrl=${this.url}&content=${this.description()}`
          },
          {
            name: 'twitter',
            class: 'twitter',
            url: () => `https://twitter.com/share?text=${this.title()}&url=${this.url}`
          },
          {
            name: 'QQ空间',
            class: 'qqkongjian',
            url: () =>
              `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${this.url}&title=${this.title()}&summary=${this.description()}&site=${this.url}`
          },
          {
            name: '豆瓣',
            class: 'douban',
            url: () => `https://www.douban.com/recommend/?url=${this.url}&title=${this.title()}`
          },
          {
            name: '有道笔记',
            class: 'youdaoyunbiji',
            url: () => `https://www.evernote.com/clip.action?url=${this.url}&title=${this.title()}`
          },
          {
            name: 'facebook',
            class: 'facebook',
            url: () => `https://www.facebook.com/sharer/sharer.php?u=${this.url}`
          },
          {
            name: 'linkedin',
            class: "lianjie",
            url: () =>
              `https://www.linkedin.com/shareArticle?title=${this.title()}&summary=${this.description()}&mini=true&url=${this.url}`
          }
        ]

      }
    }
  }

</script>
<style lang="scss" scoped>
  .share-group {
    width: auto;
    height: 252px;
    top: 128px;
    left: 2px;
    position: fixed;
    z-index: 100;
    display: flex;
    flex-direction: column;
    text-align: center;
    opacity: 0.6;
    a {
      display: inline-block;
      width: 36px;
      height: 36px;

      text-decoration: none;

      span {
        display: inline-block;
        width: 100%;
        height: 100%;
        font-size: 16px;
        color: #555;

      }
    }
  }

</style>
