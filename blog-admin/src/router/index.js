import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/redirect',
    component: () => import('@/layout/index.vue'),
    hidden: true,
    children: [{
      path: '/redirect/:path(.*)',
      component: () =>
        import('@/views/redirect/index')
    }]
  },
  {
    path: '/login',
    component: () =>
      import('@/views/login/login.vue'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () =>
      import('@/views/login/auth-redirect'),
    hidden: true
  },


  {
    path: '/blogCreate',
    component: () =>
      import('@/views/wangque/article/add.vue'),
    meta: {
      title: '发布一篇文章',
      icon: 'blog'
    },
    hidden: true
  },
  {
    path: '/blogEdit',
    component: () =>
      import('@/views/wangque/article/edit.vue'),
    meta: {
      title: '编辑一篇文章',
      icon: 'blog'
    },
    hidden: true
  },


  {
    path: '/jobCreate',
    component: () =>
      import('@/views/job/article/add.vue'),
    meta: {
      title: '发布作品',
      icon: 'blog'
    },
    hidden: true
  },
  {
    path: '/jobEdit',
    component: () =>
      import('@/views/job/article/edit.vue'),
    meta: {
      title: '编辑作品',
      icon: 'blog'
    },
    hidden: true
  },
  {
    path: '/blog',
    component: Layout,
    redirect: '/homeSwiper',
    meta: {
      title: '博客',
      icon: 'blog'
    },
    children: [
      // {
      //   path: 'dashboard',
      //   component: () =>
      //     import('@/views/wangque/asy/index.vue'),
      //   name: '首页',
      //   meta: {
      //     title: '数据分析',
      //     icon: 'asy',
      //     affix: true
      //   }
      // },

      // {
      //   path: 'role',
      //   component: () =>
      //     import('@/views/wangque/role/index.vue'),
      //   name: 'role',
      //   meta: {
      //     title: '角色管理',
      //     icon: 'set'
      //   }
      // },

      // {
      //   path: 'user',
      //   component: () =>
      //     import('@/views/wangque/user/index.vue'),
      //   name: 'user',
      //   meta: {
      //     title: '用户管理',
      //     icon: 'set'
      //   }
      // },
      {
        path: 'homeSwiper',
        component: () =>
          import('@/views/wangque/ad/index.vue'),
        name: 'homeSwiper',
        meta: {
          title: '首页轮播',
          icon: 'ad'
        }
      },
      // {
      //   path: 'msg',
      //   component: () =>
      //     import('@/views/wangque/msg/index.vue'),
      //   name: 'msg',
      //   meta: {
      //     title: '消息推送',
      //     icon: 'msg'
      //   }
      // },
      {
        path: 'articleType',
        component: () =>
          import('@/views/wangque/articleType/index.vue'),
        name: 'articleType',
        meta: {
          title: '归档',
          icon: 'type'
        }
      },
      {
        path: 'article',
        component: () =>
          import('@/views/wangque/article/index.vue'),
        name: 'article',
        meta: {
          title: '文章管理',
          icon: 'article'
        }
      },

      {
        path: 'music',
        component: () =>
          import('@/views/wangque/music/index.vue'),
        name: 'music',
        meta: {
          title: '背景音乐',
          icon: 'music'
        }
      },
      // {
      //   path: 'dan',
      //   component: () =>
      //     import('@/views/wangque/dan/index.vue'),
      //   name: 'dan',
      //   meta: {
      //     title: '弹幕管理',
      //     icon: 'dan'
      //   }
      // },
     

      // {
      //   path: 'sure',
      //   component: () =>
      //     import('@/views/wangque/sure/index.vue'),
      //   name: 'sure',
      //   meta: {
      //     title: '安全监控',
      //     icon: 'sure'
      //   }
      // }

    ]
  },
  {
    path: '/job',
    component: Layout,
    redirect: '/index',
    meta: {
      title: '简历系统',
      icon: 'blog'
    },
    children:[
      {
        path: 'index',
        component: () =>
          import('@/views/job/article/index.vue'),
        name: 'job_index',
        meta: {
          title: '作品',
          icon: 'article'
        }
      },
      {
        path: 'kill',
        component: () =>
          import('@/views/job/kill/index.vue'),
        name: 'job_kill',
        meta: {
          title: '技能',
          icon: 'article'
        }
      },
      {
        path: 'exp',
        component: () =>
          import('@/views/job/exp/index.vue'),
        name: 'job_exp',
        meta: {
          title: '工作经历',
          icon: 'article'
        }
      },

      {
        path: 'info',
        component: () =>
          import('@/views/job/info/index.vue'),
        name: 'job_info',
        meta: {
          title: '个人简介',
          icon: 'article'
        }
      },
    ]
    
  },
  {
    path: '/401',
    component: () =>
      import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/404',
    component: () =>
      import('@/views/error-page/404'),
    hidden: true
  },
]
/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  // 404 page must be placed at the end !!!
  // {
  //   path: '*',
  //   redirect: '/404',
  //   hidden: true
  // }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
