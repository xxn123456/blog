<template>
  <client-only>
    <div class="ad">
      <swiper :options="swiperOption" ref="mySwiper" class="my-swiper">
        <swiper-slide class="swiper-item">
          <img src="@/static/layout/al.jpg" alt="">
         </swiper-slide>
        <swiper-slide class="swiper-item">
          <img src="@/static/layout/jd.jpg" alt="">
        </swiper-slide>
        </swiper>
    </div>
  </client-only>
</template>
<script>
  export default {
    data() {
      return {
        swiperOption: {
          direction: 'vertical',
          loop: true,
          observer: true,
          observeParents: true,
          autoplay: {
            delay: 2000,
            disableOnInteraction: false
          },
        }
      }
    }
  }

</script>
<style lang="scss" scoped>
  .ad {
    width: 266px;

    height: 88px;

    background-color: #dcdcdc;

    color: #fff;

    .my-swiper {
      width: 100%;
      height: 100%;

      .swiper-item {
        img {
          width: 266px;
          height: 88px;
        }
      }
    }
  }

</style>
