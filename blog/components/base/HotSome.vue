<template>
  <div class="search">
    <div class="title">
      <span class="Icon"> <span class="iconfont icon-huo Icon"></span></span>
      <span>{{title}}</span>
    </div>
    <div class="hot-article" v-if="hots.length>0">
      <ul>
        <li v-for="(hot,index) in hots" :key="hot.index">
          <nuxt-link :to="'/detail?id='+hot.id">
            <span class="hot">{{index+1}}</span><span>{{hot.title}}</span>
          </nuxt-link>
        </li>
      </ul>
    </div>

    <div class="hot-article-skeion" v-else>
      <ul>
        <li v-for="hot in hotSome" :key="hot.index">
          <nuxt-link :to="'/detail?id=' + hot.id">
            <span class="ske-item">{{ hot.title }}</span>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getBlogList } from "@/api/home.js";
export default {
  props:{
     title:{
      type:String,
      default:"群贤必至"
     }
  },
  data() {
    return {
      hots: [],
      hotSome: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    };
  },
  mounted() {
    this.get_Blog();
  },
  methods: {
    get_Blog() {
      let msg = JSON.stringify({
        currentPage: 1,
        pageSize: 10,
        recommend: 1,
      });
      getBlogList(msg).then((res) => {
        let { code, data } = res;
        if (code == "200") {
           setTimeout(()=>{
            this.hots = data.rows.slice(0, 9);
           },500)
        }
      });
    },
  },
};
</script>

<style>
@keyframes loading {
  to {
    background-position-x: -20%;
  }
}
</style>
<style lang="scss" scoped>
.search {
  width: 100%;
  height: 100%;
  font-size: 14px;
  font-weight: bold;
  color: #555555;
  background-color: #fff;

  .title {
    height: 40px;
    padding-left: 12px;
    padding-right: 12px;
    line-height: 40px;
    border-bottom: 1px dashed #dadada;

    .Icon {
      margin-right: 5px;
      color: rgba(255, 87, 34, 0.6);
    }
  }

  .hot-article {
    width: 100%;

    height: 332px;
    padding-top: 8px;
    font-weight: 500;

    ul {
      padding-left: 0px;

      li {
        list-style: none;
        font-size: 14px;
        padding-left: 12px;
        padding-right: 12px;
        padding-bottom: 8px;

        a {
          display: inline-block;
          height: 26px;
          text-decoration: none;
          color: #333333;
          font-weight: normal;

          .hot {
            display: inline-block;
            width: 20px;
            font-size: 12px;
            height: 20px;
            line-height: 20px;
            text-align: center;

            background-color: #e8e8e8;
            color: #666666;

            margin-right: 10px;
          }
        }
      }

      li:first-of-type {
        .hot {
          background-color: #7cc0f7;
          color: #fff;
        }
      }

      li:nth-of-type(2) {
        .hot {
          background-color: rgba(76, 175, 80, 0.6);
          color: #fff;
        }
      }
      li:nth-of-type(3) {
        .hot {
          background-color: rgba(255, 87, 34, 0.6);
          color: #fff;
        }
      }
    }
  }
  .hot-article-skeion {
    width: 100%;

    height: 332px;
    padding-top: 8px;
    font-weight: 500;

    ul {
      padding-left: 0px;

      li {
        list-style: none;
        font-size: 14px;
        padding-left: 12px;
        padding-right: 12px;
        padding-bottom: 8px;

        a {
          width: 100%;
          display: inline-block;
          height: 26px;
          text-decoration: none;
          color: #333333;
          font-weight: normal;

          .ske-item {
            display: inline-block;
            width: 100%;
            font-size: 12px;
            height: 20px;
            line-height: 20px;
            text-align: center;

            margin-right: 10px;

            background-color: #ededed;
            background: linear-gradient(
                120deg,
                rgba(255, 255, 255, 0) 40%,
                rgba(255, 255, 255, 0.5) 50%,
                rgba(255, 255, 255, 0) 60%
              )
              #ededed;
            background-size: 200% 100%;
            background-position-x: 180%;
            animation: 0.5s loading ease-in-out infinite;
            border-radius: 4px;
          }
        }
      }
    }
  }
}
</style>
