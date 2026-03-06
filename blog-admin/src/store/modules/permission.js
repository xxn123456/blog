import permission from '@/directive/permission'
import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

function formatterRouter(asyncRouter) {
  if (asyncRouter != null) {
    var filterRouters = asyncRouter.filter(r => {
      if (r.component) { r.component = require('@/' + r.component + '.vue').default }

      if (r.children && r.children.length) { r.children = formatterRouter(r.children) }
      return true
    })
    return filterRouters
  } else {
    filterRouters = []
    return filterRouters
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: [],
  permissionBtns: {}
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes)
  },
  SET_BTNS: (state, btns) => {
    state.permissionBtns = btns;
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      // 动态挂在 错误路由
      commit('SET_ROUTES',roles);
      resolve(roles)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
