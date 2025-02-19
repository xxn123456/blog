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
    <div class="art-tag-warp" style="position: sticky; top: 100px;">
      <div class="ad-msg" v-show="scroolTop>='500'">
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
   import {mapState} from 'vuex';
  export default {
    data() {
      return {

      }
    },
     computed: {
      ...mapState({
        scroolTop: state => state.blog.scrollTop 
      })
    },
    components: {
      Search,
      HotSome,
      RightAd,
      calendar,
      articleTag
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
      color: #333333;

      .ad-msg {
        width: 226px;
        height: 90px;
        margin-bottom: 15px;
      }

    }
  }

</style>
