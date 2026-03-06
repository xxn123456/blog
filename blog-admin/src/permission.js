import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { del } from 'vue'

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist



const fixRouter = function (arr) {
  if (arr instanceof Array) {
    arr.forEach((item) => {
      if (item.component&&item.children) {
        fixRouter(item.children)
        item.component = loadView(item.component,true)
      }else{
        item.component = loadView(item.component,false)
      }
    })
  }
}

const loadView = (view,isFirst) => {
  if(isFirst){
    return (resolve) => require([`@/layout${view}.vue`], resolve)
  }else{
    return (resolve) => require([`@/views${view}.vue`], resolve)
  }
}

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  document.title = getPageTitle(to.meta.title);
  const hasToken = getToken();
  if (hasToken) {
    if (to.path == '/login' || to.path == '/') {
      next({
        path: '/auth/user'
      })
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        next()
      } else {
        try {
          const { role } = await store.dispatch('user/getInfo');
          const role_router = JSON.parse(role.routers)
          fixRouter(role_router)
          const accessRoutes = await store.dispatch('permission/generateRoutes', role_router);
          router.addRoutes(accessRoutes);
          next({
            ...to,
            replace: true
          })

        } catch (error) {

          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()


        }


      }
    }


  } else {

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }

  }
})
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
