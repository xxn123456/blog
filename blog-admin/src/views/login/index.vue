<template>
  <div class="login-container">
    <div class="web-about">
      <div class="web-msg">
        <h2>久别的博客管理系统</h2>
      </div>
    </div>
    <div class="login-wrap">
      <div class="reg">
        <div class="login">
          <div class="login-des">
            <span> 密码登录 </span>
            <br />
          </div>
          <div class="login-inputs">
            <div class="user">
              <span><i class="el-icon-user" /></span>
              <input
                v-model="loginForm.username"
                type="text"
                placeholder="用户名"
              />
            </div>
            <div class="password">
              <span><i class="el-icon-lock" /></span>
              <input
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="密码"
                @keyup.enter="handleLogin"
              />

              <span class="show-pwd" @click="showPwd">
                <svg-icon
                  :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
                />
              </span>
            </div>
            <span class="error-msg">{{ errorMsg }}</span>
          </div>

          <div class="login-btn" @click="handleLogin">
            登录<span v-show="loading == true">...</span>
          </div>
          <div class="vistor">演示账号：vistor</div>
        </div>
      </div>
    </div>
    <div class="about-link">
      <div class="some-link">
        <ul>
          <li>
            <span @click="toNuxt">博客主页</span>
          </li>
          <li @click="toWork"><span>作品简介</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "vistor",
        password: "123456",
      },
      passwordType: "password",
      loading: false,
      errorMsg: "",
      showDialog: false,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    },
    handleLogin() {
      if (this.loginForm.username != "" || this.loginForm.password != "") {
        this.loading = true;
        this.$store
          .dispatch("user/login", this.loginForm)
          .then((error) => {
            this.loading = false;
            this.$router.push({
              path: "/auth/user" || "/",
            });
            this.$store.dispatch("user/getInfo");
          })
          .catch(() => {
            this.loading = false;
          });
      } else {
        this.$message("用户名或者密码不能为空");
      }
    },
    toNuxt() {
      window.open("http://blog.shutiaogege.top/");
    },
    toWork() {
      window.open("http://work.shutiaogege.top/");
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  min-width: 1200px;
  background-position: center;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;

  .web-about {
    width: 100%;
    height: 90px;
    background-color: #fff;

    .web-msg {
      width: 1050px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      span {
        font-size: 12px;
        color: #555555;
      }
    }
  }

  .login-wrap {
    width: 100%;
    height: 600px;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        135deg,
        rgba(68, 82, 213, 0.7) 0%,
        rgba(106, 126, 230, 0.5) 100%
      );
      z-index: 1;
    }

    .reg {
      position: relative;
      z-index: 2;
      width: 1050px;
      height: 600px;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;

      .login {
        width: 350px;
        height: 350px;
        background-color: #ffffff;
        border-radius: 2px;
        padding: 20px 20px 50px 20px;
        display: flex;
        flex-direction: column;
        opacity: 0.94;

        .error-msg {
          font-size: 12px;
          color: #c71d24;
          margin-left: 10px;
        }

        .remember-password {
          padding-left: 40px;
          font-size: 12px;
          margin-bottom: 30px;
        }

        .login-des {
          margin-bottom: 30px;
          font-size: 24px;
        }

        .login-inputs {
          width: 100%;
          height: 150px;
          display: flex;
          flex-direction: column;
          margin-top: 10px;

          .user {
            width: 100%;
            height: 40px;
            margin-bottom: 40px;
            border: 1px solid #efefef;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;

            input {
              width: calc(100% - 80px);
              height: 38px;
              border: 0px;
              outline: 0px;
            }

            span {
              display: inline-flex;
              justify-content: center;
              align-items: center;
              width: 40px;
              height: 38px;
            }
          }

          .password {
            width: 100%;
            height: 40px;
            margin-bottom: 40px;
            border: 1px solid #efefef;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;

            input {
              width: calc(100% - 80px);
              height: 38px;
              border: 0px;
              outline: 0px;
            }

            span {
              display: inline-flex;
              justify-content: center;
              align-items: center;
              width: 40px;
              height: 38px;
            }

            .show-pwd {
              width: 40px;
              height: 40px;
            }
          }
        }

        .login-btn {
          width: 60%;
          height: 40px;
          line-height: 40px;
          font-size: 20px;
          text-align: center;
          color: #fff;
          margin: 0 auto;
          margin-top: 15px;
          background-color: #4452d5;
          border-radius: 5px;
          cursor: pointer;
        }
        .vistor {
          margin-top: 30px;
          font-size: 14px;
          color: #333333;
        }
      }
    }
  }

  .about-link {
    width: 100%;
    min-height: 100px;

    .some-link {
      width: 1050px;
      margin: 60px auto;
      cursor: pointer;

      ul {
        padding-left: 0px;
        list-style: none;

        li {
          font-size: 14px;
          color: #555555;
          font-weight: 500;
          font-size: 12px;
          border-right: 1px solid #efefef;
          float: left;
          padding: 0 15px;
        }
      }
    }
  }
}
</style>
