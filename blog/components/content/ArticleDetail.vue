<template>
  <div class="main">
    <div class="detail">
      <div class="artcle-type">讨论</div>
      <h2>{{ blog.title }}</h2>
      <div
        class="detail-mian"
        :style="isOpen ? 'height: auto;' : 'height: 600px;'"
      >
        <client-only>
          <mavon-editor
            v-model="blog.content"
            codeStyle="tomorrow-night-eighties"
            :subfield="false"
            :toolbarsFlag="false"
            :preview="true"
            defaultOpen="preview"
            :boxShadow="false"
            previewBackground="#fff"
          >
          </mavon-editor>
        </client-only>
      </div>
    </div>
    <div class="open">
      <div @click="isOpen = !isOpen">展开</div>
    </div>
    <div class="apply">
      <div class="apply-title">评论（{{ replyTotal }}）</div>
      <div class="apply-cont">
        <div class="apply-item" v-for="item in reply" :key="item.id">
          <img
            class="apply-logo"
            v-if="item.user"
            :src="item.user.avatar"
            alt=""
          />{{ item.user.username }}回复：{{ item.comment }}
        </div>
      </div>
      <div class="login-state">
        <template v-if="nologin">
          状态：未登录
          <span style="color: #0088f5; cursor: pointer" @click="login"
            >登录</span
          >
        </template>
        <template v-else> 你好，{{ user.username }} </template>
      </div>
      <div class="apply-submit" v-show="!nologin">
        <input
          type="text"
          class="start-input"
          placeholder="评论内容(最多100个字)"
          v-model="applyCont"
        />
        <button class="start" @click="replyBlog">回复</button>
      </div>
    </div>
    <div class="share">
      <a href="#" v-for="share in shares" :key="share.index">
        <span class="iconfont" :class="`icon-${share.class}`"></span>
      </a>
    </div>
    <div class="about-artcle">
      <ul>
        <li>
          <div class="left-line"></div>
          <span>作者：{{ blog.username }}</span>
        </li>
        <li>
          <div class="left-line"></div>
          <span>本文于{{ blog.updatedAt }} 发布 </span>
        </li>
        <li>
          <div class="left-line"></div>
          <span> 当前浏览量 {{ blog.visitNum }}</span>
        </li>
        <li>
          <div class="left-line"></div>
          <span>标签:{{ blog.categoryName }}</span>
        </li>

        <li>
          <div class="left-line"></div>
          <span>文章地址:{{ articleUrl }}</span>
        </li>
        <li>
          <div class="left-line"></div>
          <span>版权声明:自由转载,请标明出处,禁止商业使用</span>
        </li>
      </ul>

      <div class="ewm">
        <div>手机扫码阅读</div>
        <img src="@/static/layout/ewm.png" alt="" />
      </div>
    </div>
    <el-dialog title="登录提示" :visible.sync="loginDialogVisible" width="30%">
      <div class="login-wrap">
        <el-input
          class="row-gap"
          v-model="loginForm.username"
          placeholder="账号"
        ></el-input>
        <el-input
          class="row-gap"
          v-model="loginForm.password"
          placeholder="密码"
        ></el-input>
        <div>
          暂无账号？<span
            style="color: #0088f5; cursor: pointer"
            @click="regitDialogVisible = true"
            >注册</span
          >
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="loginDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="loginClick">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="注册提示" :visible.sync="regitDialogVisible" width="30%">
      <div class="login-wrap">
        <el-input
          class="row-gap"
          v-model="regitForm.username"
          placeholder="账号"
        ></el-input>
        <el-input
          class="row-gap"
          v-model="regitForm.password"
          placeholder="密码"
        ></el-input>
        <div class="email row-gap">
          <el-input v-model="regitForm.email" placeholder="邮箱"></el-input>
          <el-button
            type="primary"
            style="margin-left: 10px"
            @click="sendCode"
            >{{ sendCodeText }}</el-button
          >
        </div>
        <el-input
          class="row-gap"
          v-model="regitForm.veryCode"
          placeholder="验证码"
        ></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="regitDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="regitClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getBlogDetail,
  queryBlogReply,
  login,
  getUserInfo,
  getSmsCode,
  eamilRegit,
  replyBlog,
} from "@/api/home.js";
import { getToken, setToken } from "@/utils/auth";
export default {
  data() {
    return {
      blog: {
        title: "文章标题",
        content: "",
      },
      isOpen: false,
      reply: [],
      replyTotal: 0,
      applyCont: "",
      user: {
        userId: null,
      },
      loginForm: {
        username: null,
        password: null,
      },
      loginDialogVisible: false,
      regitForm: {
        username: null,
        password: null,
        email: null,
        veryCode: null,
      },
      sendCodeText: "发送验证码",
      regitDialogVisible: false,
      shares: [
        {
          name: "微信",
          class: "weixin",
          url: () => `/partials/qrcode.html?url=${this.url}`,
        },
        {
          name: "微博",
          class: "weibo",
          url: () =>
            `https://service.weibo.com/share/share.php?url=${
              this.url
            }&title=${this.title()}&source=${this.url}&sourceUrl=${
              this.url
            }&content=${this.description()}`,
        },
        {
          name: "QQ空间",
          class: "qqkongjian",
          url: () =>
            `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${
              this.url
            }&title=${this.title()}&summary=${this.description()}&site=${
              this.url
            }`,
        },
        {
          name: "豆瓣",
          class: "douban",
          url: () =>
            `https://www.douban.com/recommend/?url=${
              this.url
            }&title=${this.title()}`,
        },
        {
          name: "有道笔记",
          class: "youdaoyunbiji",
          url: () =>
            `https://www.evernote.com/clip.action?url=${
              this.url
            }&title=${this.title()}`,
        },
      ],
    };
  },
  computed: {
    articleUrl() {
      let id = this.$route.query.id;
      let openUrl = `http://blog.shutiaogege.top/detail?id=${id}`;
      return openUrl;
    },
    blogDetail() {
      return this.blog;
    },
    nologin() {
      return !this.user.userId ? true : false;
    },
  },
  mounted() {
    this.get_BlogDetail();
    this.queryBlogReply();
    this.getUser();
  },
  methods: {
    get_BlogDetail() {
      let params = {
        id: this.$route.query.id,
      };
      getBlogDetail(params).then((res) => {
        let { code, data } = res;
        if (code == "200") {
          let username = "未知"
          if(data.user&&data.user.username){
            username = data.user.username
          }
          this.blog = {
            id: data.id,
            title: data.title,
            content: data.content,
            updatedAt: data.updatedAt,
            username: username,
            visitNum: data.visitNum,
            categoryName: data.categoryName,
          };
        }
      });
    },
    queryBlogReply() {
      let params = {
        article_id: this.$route.query.id,
      };
      queryBlogReply(params).then((res) => {
        let { code, data } = res;
        if (code == "200") {
          this.reply = data.rows;
          this.replyTotal = data.count;
        }
      });
    },
    login() {
      this.loginDialogVisible = true;
    },
    loginClick() {
      let params = {
        username: this.loginForm.username,
        password: this.loginForm.password,
      };
      login(params).then((res) => {
        let { code, token } = res;
        if (code == 200) {
          setToken(token);
          this.loginDialogVisible = false;
          this.getUser();
        } else {
          this.$alert(`登录失败:${res}`, "登录提示", {
            confirmButtonText: "确定",
            callback: (action) => {},
          });
        }
      });
    },
    async getUser() {
      let info = await getUserInfo();
      if (info.code == 200) {
        console.log("获取的用户信息", info);
        this.user = info.data;
      }
    },
    sendCode() {
      let params = {
        email: this.regitForm.email,
      };
      getSmsCode(params).then((res) => {
        let { code, data } = res;
        if (code == 200) {
          this.$alert(`发送成功`, "注册提示", {
            confirmButtonText: "确定",
            callback: (action) => {},
          });
        }
      });
    },
    regitClick() {
      let params = {
        username: this.regitForm.username,
        email: this.regitForm.email,
        veryCode: this.regitForm.veryCode,
        password: this.regitForm.password,
      };
      eamilRegit(params).then((res) => {
        let { code, data } = res;
        if (code == 200) {
          this.regitDialogVisible = false;
          this.$alert(`恭喜注册${this.regitForm.username}你成功`, "注册提示", {
            confirmButtonText: "确定",
            callback: (action) => {},
          });
        } else {
          this.$alert(`注册失败:${res.msg}`, "注册提示", {
            confirmButtonText: "确定",
            callback: (action) => {},
          });
        }
      });
    },
    replyBlog() {
      let params = {
        article_id: this.$route.query.id,
        comment: this.applyCont,
        user_id: this.user.userId,
      };
      replyBlog(params).then((res) => {
        let { code, data } = res;
        if (code == 200) {
          this.$alert(`评论成功,请刷新查看`, "操作提示", {
            confirmButtonText: "确定",
            callback: (action) => {},
          });
        } else {
          this.$alert(`评论失败${res}`, "操作提示", {
            confirmButtonText: "确定",
            callback: (action) => {},
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  height: auto;
  .detail {
    padding: 12px 24px;
    background-color: #fff;
    position: relative;
    overflow: hidden;
    /deep/ .v-note-wrapper {
      border: 0px;
      color: #555555;
      font-size: 14px;
    }
    .artcle-type {
      position: absolute;
      top: -20px;
      left: -35px;
      transform: rotate(-45deg);
      background-color: rgba(76, 175, 80, 0.8);
      width: 84px;
      height: 48px;
      padding-top: 12px;
      line-height: 48px;
      text-align: center;
      text-transform: uppercase;
      transform-origin: center;
      color: #fff;
      font-weight: 700;
      font-size: 12px;
    }
    h2 {
      text-align: center;
      font-weight: 700;
      font-size: 20px;
      color: #555555;
      margin-top: 20px;
      margin-bottom: 30px;
    }
    .detail-mian {
      width: 852px;
      font-size: 14px;
      color: #555555;
      font-weight: bold;
      position: relative;
      z-index: 10;
    }
  }
  .detail-ad {
    margin-top: 15px;
    height: 220px;
    background-color: #fff;
    padding: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .open {
    width: 100%;
    height: 40px;
    background: #fff;
    cursor: pointer;
  }
  .apply {
    width: 100%;
    min-height: 100px;
    background-color: #fff;
    margin-top: 10px;
    padding-left: 10px;
    box-sizing: border-box;
    .apply-title {
      width: 100%;
      height: 20px;
      padding-top: 5px;
      text-align: left;
    }
    .apply-cont {
      padding: 10px;
      .apply-item {
        width: 100%;
        min-height: 48px;
        text-align: left;
        font-size: 16px;
        line-height: 24px;
        .apply-logo {
          position: relative;
          top: 8px;
          width: 40px;
          height: 40px;
          margin-right: 10px;
        }
      }
    }
    .login-state {
      margin-top: 5px;
      margin-bottom: 5px;
    }
    .apply-submit {
      height: 50px;
      display: flex;
      flex-direction: row;
      border-radius: 4px;
      padding: 10px 30px;
      background: #fff;
      .start-input {
        flex: 1;
        height: 48px;
        padding-left: 6px;
        padding-right: 6px;
        border: 0px;
        background-color: #dfdfdf;
        color: #757575;
        outline: none;
      }
      .sms-input {
        width: 124px;
        border: 0px;
        background-color: #dfdfdf;
        color: #757575;
        outline: none;
        margin-left: 5px;
        margin-right: 5px;
      }
      .start {
        width: 124px;
        height: 50px;
        padding: 0px;
        border: 0px;
        background-color: #c3c3c3;
        cursor: pointer;
      }
    }
  }
  .share {
    margin-top: 15px;
    height: 60px;
    padding: 12px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    a {
      display: inline-block;
      width: 48px;
      height: 36px;
      text-decoration: none;
      background-color: rgb(238, 238, 238);
      span {
        display: inline-block;
        width: 100%;
        height: 100%;
        font-size: 20px;
        color: #555;
        text-align: center;
        line-height: 36px;
      }
    }
  }
  .about-artcle {
    margin-top: 15px;
    min-height: 120px;
    padding: 12px;
    background-color: #fff;
    ul {
      list-style: none;
      padding-left: 0px;
      li {
        width: 100%;
        display: flex;
        flex-direction: row;
        padding-bottom: 15px;
        .left-line {
          width: 8px;
          height: 20px;
          background-color: rgb(238, 238, 238);
        }
        span {
          display: inline-block;
          padding-left: 12px;
          font-size: 14px;
          color: #555555;
          font-weight: 500;
        }
      }
    }
    .ewm {
      width: 100%;
      height: 140px;
      text-align: center;
      img {
        width: 100px;
        height: 100px;
        margin: 10px auto;
      }
    }
  }
  .login-wrap {
    .email {
      display: flex;
      flex-direction: row;
    }
    .row-gap {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
}
</style>
