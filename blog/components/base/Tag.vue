<template>
  <div class="art-tags">
    <div class="art-tag" v-for="tag in artTags" :key="tag.index">
      <div class="des" @click="selectPoint(tag.value)">
        {{ tag.value }}
      </div>
    </div>
  </div>
</template>
<script>
import { queryWebSet } from "@/api/home.js";
export default {
  data() {
    return {
      artTags: [],
    };
  },
  mounted() {
    this.queryWebSet();
  },
  methods: {
    queryWebSet() {
      let msg = JSON.stringify({
        name: "artilce-tag",
        pageSize: "1",
        currentPage: "1",
      });
      queryWebSet(msg).then((res) => {
        let { data } = res;
        if (res.code == 200 && data.rows) {
          this.artTags = JSON.parse(data.rows[0].configs);
        }
      });
    },
    selectPoint(value) {
      this.$emit("selectPoint", value);
    },
  },
};
</script>
<style lang="scss" scoped>
.art-tags {
  height: 100%;
  padding: 10px;
  background-color: #fff;
  cursor: pointer;
  .art-tag {
    display: inline-flex;
    margin-bottom: 10px;
    margin-right: 8px;
    .pic {
      width: 24px;
      height: 24px;
      background-color: #e8e8e8;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    .des {
      font-size: 12px;
      height: 24px;
      line-height: 24px;
      padding-left: 12px;
      padding-right: 12px;
      background-color: #dfdfdf;
    }
  }
}
</style>
