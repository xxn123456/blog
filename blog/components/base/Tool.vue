<template>
  <div class="msg" @click="defaltOpen">
    <span><span class="iconfont icon-dianying Icon"></span></span>
    <span><span class="iconfont icon-danmu Icon"></span></span>

    <span><span class="iconfont icon-youjian Icon"></span></span>
    <span><span class="iconfont icon-dingbu Icon"></span></span>
    <span><span class="iconfont icon-xia1 Icon"></span></span>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    defaltOpen() {
      alert("开发中敬请期待");
    },
  },
};
</script>
<style lang="scss" scoped>
.msg {
  width: 42px;
  height: 210px;
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