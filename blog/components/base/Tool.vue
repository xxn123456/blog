<template>
  <div class="msg">
    <!-- <span
      ><span class="iconfont icon-dianying Icon" @click="defaltOpen"></span
    ></span>
    <span
      ><span class="iconfont icon-danmu Icon" @click="defaltOpen"></span
    ></span> -->
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
    return {};
  },
  methods: {
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