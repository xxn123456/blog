
<template>
  <div class="head-cont">
    <div class="logo" @click="tohome">
      <img src="@/static/layout/logo.jpg" alt="" />
      <span>久别的博客</span>
    </div>
    <div class="player" v-show="musicLists.length>0">
      <div class="handle-btns">
        <span class="iconfont icon-houtui Icon" @click="prev"></span>
        <span
          class="iconfont icon-bofang Icon"
          @click="play"
          v-if="isPlay"
        ></span>
        <span class="iconfont icon-zanting Icon" @click="play" v-else></span>
        <span class="iconfont icon-qianjin Icon" @click="next"></span>
        <span class="iconfont icon-jingyin Icon"></span>
      </div>
      <div class="music-des">{{ bgText }}</div>
      <audio
        v-if="musicLists.length>0"
        ref="players"
        :src="bgMusic"
        controls="controls"
        class="play-controls"
      >
        替代内容
      </audio>
    </div>
  </div>
</template>
<script>
import { queryWebSet } from "@/api/home.js";
export default {
  data() {
    return {
      musicLists: [
  
      ],
      bgIndex: 0,
      bgMusic:"",
      bgText: "",
      isPlay: true,
    };
  },
  mounted() {
    this.queryWebSet();
  },
  methods: {
    tohome(){
      const origin = window.location.origin;
      window.location.replace(origin);
    },
    queryWebSet() {
      let msg = JSON.stringify({
        name: "bg-music",
        pageSize: "1",
        currentPage: "1",
      });
      queryWebSet(msg).then((res) => {
        let { data } = res;
        if (res.code == 200 && data.rows) {
          this.musicLists = JSON.parse(data.rows[0].configs);
          this.bgText =this.musicLists[0].bgText;
          this.bgMusic =this.musicLists[0].bgMusic;
        }
      });
    },
    prev() {
      console.log("设置上一曲")
      this.bgIndex = this.bgIndex - 1;
      if (this.bgIndex < 0) {
        this.bgIndex = this.musicLists.length - 1;
      }
      this.$refs.players.pause();
      this.bgMusic = this.musicLists[this.bgIndex].bgMusic;
      this.bgText = this.musicLists[this.bgIndex].bgText;
      setTimeout(() => {
        this.$refs.players.play();
        this.isPlay = false;
      }, 300);
    },
    next() {
      console.log("设置下一曲")
      this.bgIndex = this.bgIndex + 1;
      if (this.bgIndex >= this.musicLists.length) {
        this.bgIndex = 0;
      }
      this.$refs.players.pause();
      this.bgMusic = this.musicLists[this.bgIndex].bgMusic;
      this.bgText = this.musicLists[this.bgIndex].bgText;
      setTimeout(() => {
        this.$refs.players.play();
        this.isPlay = false;
      }, 300);
    },
    play() {
      if (this.isPlay) {
        this.$refs.players.play();
      } else {
        this.$refs.players.pause();
      }
      this.isPlay = !this.isPlay;
    },
  },
};
</script>
<style lang="scss" scoped>
.head-cont {
  width: 1020px;
  height: 100%;
  padding-left: 15px;
  padding-right: 15px;
  .logo {
    width: 406px;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    float: left;
    cursor: pointer;

    img {
      height: 30px;
      margin-right: 20px;
    }
    span {
      display: inline-block;
      height: 20px;
      line-height: 20px;
      color: #0088f5;
      font-size: 18px;
      font-weight: 550;
    }
  }
  .player {
    width: 300px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    color: #333333;
    opacity: 0.8;
    cursor: pointer;
    position: relative;
    float: right;
    .handle-btns {
      height: 22px;
      display: flex;
      flex-direction: row;

      span {
        font-size: 12px;
        margin-right: 15px;
      }
    }
    .music-des {
      width: 100%;
      height: 16px;
      font-size: 12px;
      text-align: right;
    }
    .play-controls {
      position: absolute;
      z-index: -1;
      opacity: 0;
    }
  }
}
</style>