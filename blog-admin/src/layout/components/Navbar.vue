<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
      
      
         <div class="avatar-wrapper errLog-container right-menu-item hover-effect">
          <img :src="userLogo" class="user-avatar">
        
        </div>

          <div class="errLog-container logout" @click="logout">注销</div>
       
       

      </template>
    </div>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import {
  mapState
} from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'

// 配置预览图片

import imgUrl from '@/utils/setDeafult.js'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ]),
    ...mapState({
      userPic: state => state.user.userInfo.avatar,
      menuId: state => state.tagsView.menuId
    }),
    userLogo() {
      return this.userPic
    }
  },
  data() {
    return {
      userId: ''
    }
  },
  mounted() {
    this.userId = localStorage.getItem('id')
  },
  methods: {
    toMark() {
      this.$router.push({
        path: '/packBoard',
        // 传递参数到
        query: {
          userId: this.userId,
          menuId: this.menuId
        }
      })
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      this.$store.dispatch('user/logout');
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}

</script>

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      width:200px;
      float: right;
      height: 100%;
      line-height: 50px;
      font-size: 16px;
      color: #555555;
      text-align: right;
      padding-right: 10px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .user-avatar {
            cursor: pointer;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            margin-top: 7px;
          }
      .logout{
          cursor: pointer;
        font-size: 14px;
      }

    }
  }

</style>
