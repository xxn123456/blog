<template>
  <client-only>
    <div class="ad">
      <span class="iconfont Icon icon-shengyin"></span>
      <swiper :options="swiperOption" ref="mySwiper" class="my-swiper">
        <swiper-slide
          class="swiper-item"
          v-for="item in lists"
          :key="item.index"
        >
          {{ item.cont }}
        </swiper-slide>
      </swiper>
    </div>
  </client-only>
</template>
<script>
import { queryWebSet } from "@/api/home.js";
export default {
  data() {
    return {
      lists: [
        {
          cont: "奋斗",
        },
        {
          cont: "另一个我",
        },
      ],
      swiperOption: {
        direction: "vertical",
        loop: true,
        observer: true, // 启动动态检查器(OB/观众/观看者)
        observeParents: true, // 修改swiper的父元素时，自动初始化swiper
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
      },
    };
  },
  mounted() {
    this.queryWebSet();
  },
  methods: {
    queryWebSet() {
      let msg = JSON.stringify({
        name: "noticle",
        pageSize: "1",
        currentPage: "1",
      });
      queryWebSet(msg).then((res) => {
        let { data } = res;
        if (res.code == 200 && data.rows) {
          this.lists = JSON.parse(data.rows[0].configs);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.ad {
  padding-left: 15px;
  padding-right: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  font-size: 14px;
  color: #666666;
  display: flex;
  flex-direction: row;
  border-radius: 2px;
  .my-swiper {
    height: 40px;
    margin-left: 8px;
  }
}
</style>
