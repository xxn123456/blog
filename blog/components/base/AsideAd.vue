<template>
  <div class="ad">
    <div class="search-warp">
      <search></search>
    </div>
    <div class="hot-some">
      <hot-some></hot-some>
    </div>
     

    <div class="ad-msg">
      <right-ad></right-ad>
    </div>
     
    <calendar></calendar>
     
    <taobao-ad></taobao-ad>
    
    <div class="art-tag-warp" style="position: sticky; top: 80px;">
       
      <div class="ad-msg-sticky" v-if="400>scrollTop">
        <right-ad></right-ad>
      </div>
      
      <article-tag></article-tag>
    </div>
    



  </div>
</template>
<script>
  import Search from '@/components/base/Search.vue'
  import HotSome from '@/components/base/HotSome.vue'
  import RightAd from '@/components/ad/RightAd.vue'
  import calendar from '@/components/base/calendar.vue'
  import articleTag from '@/components/base/Tag.vue'
  import TaobaoAd from '@/components/ad/TaobaoAd.vue'
  export default {
    data() {
      return {
        scrollTop:0

      }
    },
    components: {
      Search,
      HotSome,
      RightAd,
      calendar,
      articleTag,
      TaobaoAd
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll() {
        this.scrollTop=document.documentElement.scrollTop;
      },
    }
  }

</script>
<style lang="scss" scoped>
  .ad {
    width: 266px;
    height: 100%;

    .search-warp {
      height: 44px;
      margin-bottom: 16px;
    }

    .hot-some {
      height: 394px;
      margin-bottom: 16px;
    }

    .ad-msg {
      width: 226px;
      height: 90px;
    }

    .art-tag-warp {
      margin-top: 15px;

      width: 266px;

      .ad-msg-sticky {
        width: 226px;
        height: 90px;
        margin-bottom: 10px;

      }

    }
  }

</style>
