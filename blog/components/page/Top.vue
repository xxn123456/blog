<template>
  <div class="head-cont">
    <div class="logo" @click="tohome" role="button" aria-label="返回首页">
      <img src="@/static/layout/logo.jpg" alt="博客Logo" />
      <span>久别的博客</span>
    </div>
    <div class="player" v-show="musicLists.length > 0">
      <div class="handle-btns">
        <span
          class="iconfont icon-houtui Icon"
          @click="prev"
          role="button"
          aria-label="上一曲"
        ></span>
        <span
          class="iconfont icon-bofang Icon"
          @click="play"
          v-if="isPlay"
          role="button"
          aria-label="播放"
        ></span>
        <span
          class="iconfont icon-zanting Icon"
          @click="play"
          v-else
          role="button"
          aria-label="暂停"
        ></span>
        <span
          class="iconfont icon-qianjin Icon"
          @click="next"
          role="button"
          aria-label="下一曲"
        ></span>
        <span
          class="iconfont icon-jingyin Icon"
          @click="toggleMute"
          role="button"
          aria-label="切换静音"
        ></span>
      </div>
      <div class="music-des">{{ bgText }}</div>
      <audio
        ref="players"
        :src="bgMusic"
        controls="controls"
        class="play-controls"
      >
        您的浏览器不支持音频播放
      </audio>
    </div>
  </div>
</template>
<script>
import { queryWebSet } from "@/api/home.js";
export default {
  data() {
    return {
      musicLists: [],
      bgIndex: 0,
      bgMusic: "",
      bgText: "",
      isPlay: true, // true 表示暂停状态，false 表示播放状态
      isMuted: false, // 静音状态
    };
  },
  computed: {
    currentMusic() {
      if (this.musicLists.length > 0 && this.musicLists[this.bgIndex]) {
        return this.musicLists[this.bgIndex];
      }
      return null;
    },
  },
  mounted() {
    this.queryWebSet();
  },
  methods: {
    tohome() {
      this.$router.push("/");
    },
    queryWebSet() {
      queryWebSet({
        name: "bg-music",
        pageSize: 1,
        currentPage: 1,
      })
        .then((res) => {
          let { data } = res;
          if (res.code == 200 && data.rows && data.rows.length > 0) {
            try {
              this.musicLists = JSON.parse(data.rows[0].configs);
              if (this.musicLists.length > 0) {
                this.bgText = this.musicLists[0].bgText;
                this.bgMusic = this.musicLists[0].bgMusic;
              }
            } catch (error) {
              console.error("解析音乐配置失败:", error);
            }
          }
        })
        .catch((error) => {
          console.error("查询网站配置失败:", error);
        });
    },
    switchMusic(index) {
      // 切换音乐的公共方法
      if (!this.$refs.players) {
        console.error("音频播放器未初始化");
        return;
      }
      this.bgIndex = index;
      this.$refs.players.pause();
      this.bgMusic = this.musicLists[this.bgIndex].bgMusic;
      this.bgText = this.musicLists[this.bgIndex].bgText;
      setTimeout(() => {
        if (this.$refs.players) {
          this.$refs.players.play();
          this.isPlay = false; // 播放中
        }
      }, 300);
    },
    prev() {
      let newIndex = this.bgIndex - 1;
      if (newIndex < 0) {
        newIndex = this.musicLists.length - 1;
      }
      this.switchMusic(newIndex);
    },
    next() {
      let newIndex = this.bgIndex + 1;
      if (newIndex >= this.musicLists.length) {
        newIndex = 0;
      }
      this.switchMusic(newIndex);
    },
    play() {
      if (!this.$refs.players) return;

      if (this.isPlay) {
        // 当前是暂停状态，开始播放
        this.$refs.players.play();
      } else {
        // 当前是播放状态，暂停
        this.$refs.players.pause();
      }
      this.isPlay = !this.isPlay;
    },
    toggleMute() {
      if (!this.$refs.players) return;
      this.isMuted = !this.isMuted;
      this.$refs.players.muted = this.isMuted;
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