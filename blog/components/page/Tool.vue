<template>
  <div class="msg" v-if="isDesktop">
    <span><span class="iconfont icon-weixin Icon" @click="wxopen"></span></span>
    <span
      ><span class="iconfont icon-dingbu Icon" @click="scrollIvew('top')"></span
    ></span>
    <span
      ><span
        class="iconfont icon-xia1 Icon"
        @click="scrollIvew('bottom')"
      ></span
    ></span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isDesktop: true,
    };
  },
  mounted() {
    this.checkDevice();
  },
  methods: {
    checkDevice() {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      // 判断是否为移动设备
      const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      // 判断是否为平板设备
      const isTablet = /ipad|android(?!.*mobile)|tablet/i.test(userAgent.toLowerCase());
      // 只有在非移动设备且非平板设备时才显示（即电脑端）
      this.isDesktop = !isMobile && !isTablet;
    },
    wxopen() {
      const h = this.$createElement;
      this.$alert(
        '<img style="width: 200px;margin-left: 85px;" src="http://upload.shutiaogege.top/article/1742132450866.jpg"/>',
        "联系方式",
        {
          dangerouslyUseHTMLString: true,
        }
      );
    },
    scrollIvew(val) {
      if (val == "top") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }
    },
    defaltOpen() {
      const h = this.$createElement;
      this.$alert("敬请期待", "流程", {
        dangerouslyUseHTMLString: true,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.msg {
  width: 42px;
  height: 130px;
  display: flex;
  flex-direction: column;
  color: #555555;
  background-color: #fff;
  text-align: center;
  cursor: pointer;
  span {
    width: 42px;
    height: 42px;
    line-height: 42px;
  }
}
</style>