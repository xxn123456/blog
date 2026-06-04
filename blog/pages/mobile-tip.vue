<template>
  <div class="mobile-tip">
    <div class="tip-content">
      <div class="icon-wrapper">
        <span class="iconfont icon-shouji"></span>
      </div>
      <h1 class="title">移动端访问提示</h1>
      <p class="desc">
        您好!当前网站主要针对桌面端优化,<br />
        建议使用电脑浏览器访问以获得最佳体验。
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MobileTip',
  methods: {
    continueVisit() {
      // 保存用户选择，24小时内不再提示
      localStorage.setItem('mobileTipDismiss', Date.now().toString());
      // 跳转回首页
      this.$router.push('/');
    }
  },
};
</script>

<style lang="scss" scoped>
.mobile-tip {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  box-sizing: border-box;

  .tip-content {
    background: #fff;
    border-radius: 20px;
    padding: 40px 30px;
    max-width: 500px;
    width: 100%;
    text-align: center;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

    .icon-wrapper {
      width: 80px;
      height: 80px;
      margin: 0 auto 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      .iconfont {
        font-size: 40px;
        color: #fff;
      }
    }

    .title {
      font-size: 28px;
      color: #333;
      margin: 0 0 15px;
      font-weight: 600;
    }

    .desc {
      font-size: 16px;
      color: #666;
      line-height: 1.8;
      margin: 0 0 30px;
    }

    .btn-group {
      display: flex;
      gap: 15px;
      margin-bottom: 25px;

      .btn {
        flex: 1;
        padding: 14px 24px;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s;
        font-weight: 500;
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;

        &.btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;

          &:active {
            transform: scale(0.98);
            box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
          }
        }

        &.btn-secondary {
          background: #f5f5f5;
          color: #666;

          &:active {
            background: #e8e8e8;
            transform: scale(0.98);
          }
        }
      }
    }

    .tips {
      padding: 15px;
      background: #fff9e6;
      border-radius: 8px;
      border-left: 4px solid #ffd700;

      p {
        margin: 0;
        font-size: 14px;
        color: #666;
        line-height: 1.6;
      }
    }
  }
}

// 平板设备适配 (768px - 1024px)
@media screen and (max-width: 1024px) {
  .mobile-tip {
    padding: 30px 20px;

    .tip-content {
      max-width: 600px;
      padding: 35px 30px;

      .title {
        font-size: 26px;
      }

      .desc {
        font-size: 15px;
      }
    }
  }
}

// 手机设备适配 (最大 768px)
@media screen and (max-width: 768px) {
  .mobile-tip {
    padding: 20px 15px;
    align-items: flex-start;
    padding-top: 10vh;

    .tip-content {
      padding: 30px 20px;
      border-radius: 16px;
      max-width: 100%;

      .icon-wrapper {
        width: 70px;
        height: 70px;
        margin-bottom: 15px;

        .iconfont {
          font-size: 35px;
        }
      }

      .title {
        font-size: 22px;
        margin-bottom: 12px;
      }

      .desc {
        font-size: 14px;
        line-height: 1.6;
        margin-bottom: 25px;
      }

      .btn-group {
        flex-direction: column;
        gap: 12px;
        margin-bottom: 20px;

        .btn {
          padding: 12px 20px;
          font-size: 15px;
          width: 100%;
        }
      }

      .tips {
        padding: 12px;

        p {
          font-size: 13px;
        }
      }
    }
  }
}

// 小屏手机适配 (最大 480px)
@media screen and (max-width: 480px) {
  .mobile-tip {
    padding: 15px 10px;
    padding-top: 8vh;

    .tip-content {
      padding: 25px 15px;
      border-radius: 12px;

      .icon-wrapper {
        width: 60px;
        height: 60px;
        margin-bottom: 12px;

        .iconfont {
          font-size: 30px;
        }
      }

      .title {
        font-size: 20px;
        margin-bottom: 10px;
      }

      .desc {
        font-size: 13px;
        line-height: 1.5;
        margin-bottom: 20px;
      }

      .btn-group {
        gap: 10px;
        margin-bottom: 15px;

        .btn {
          padding: 11px 18px;
          font-size: 14px;
        }
      }

      .tips {
        padding: 10px;

        p {
          font-size: 12px;
        }
      }
    }
  }
}

// 横屏模式适配
@media screen and (orientation: landscape) and (max-height: 500px) {
  .mobile-tip {
    align-items: center;
    padding: 10px 20px;

    .tip-content {
      padding: 20px 25px;
      max-height: 90vh;
      overflow-y: auto;

      .icon-wrapper {
        width: 50px;
        height: 50px;
        margin-bottom: 10px;

        .iconfont {
          font-size: 25px;
        }
      }

      .title {
        font-size: 18px;
        margin-bottom: 8px;
      }

      .desc {
        font-size: 12px;
        margin-bottom: 15px;
      }

      .btn-group {
        flex-direction: row;
        gap: 10px;
        margin-bottom: 12px;

        .btn {
          padding: 8px 16px;
          font-size: 13px;
        }
      }

      .tips {
        padding: 8px;

        p {
          font-size: 11px;
        }
      }
    }
  }
}
</style>
