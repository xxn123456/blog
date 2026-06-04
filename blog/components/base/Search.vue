<template>
  <div class="search">
    <div class="start-group">
      <input
        type="text"
        class="start-input"
        placeholder="向外探索,向内觉知"
        v-model="title"
        @keyup.enter="to_search"
      />
      <button class="start" @click="to_search">搜</button>
    </div>
    <a href="#" class="go">
      <span class="iconfont icon-shijianzhou Icon"></span
    ></a>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
    };
  },
  methods: {
    to_search() {
      const origin = window.location.origin;
      const url = `${origin}/search?about=${this.title}`;
      window.open(url, "_blank");
    },
  },
};
</script>
<style lang="scss" scoped>
.search {
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding-left: 10px;
  padding-right: 10px;
  .start-group {
    height: 32px;
    display: flex;
    flex-direction: row;
    border-radius: 4px;
    .start-input {
      width: 160px;
      height: 30px;
      padding-left: 6px;
      padding-right: 6px;
      border: 0px;
      background-color: #dfdfdf;
      color: #757575;
      outline: none;
    }
    .start {
      width: 30px;
      height: 32px;
      padding: 0px;
      border: 0px;
      background-color: #c3c3c3;
      cursor: pointer;
    }
  }
  .go {
    display: inline-block;
    width: 40px;
    text-align: center;
    height: 32px;
    line-height: 32px;
    text-decoration: none;
    background-color: #dfdfdf;
    color: #757575;
  }
}
</style>
