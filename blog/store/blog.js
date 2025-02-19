export const state = () => ({
  scrollTop: 0,
  //  左侧激活
  leftNav: 1,
  //  当前栏目
  cateNameId: 0,
  menu: [],
  article:{
    total:"-"
  }
})
export const mutations = {
  SETSCROLLTOP(state, data) {
    state.scrollTop = data;
  },
  CHANGLEFT(state, data) {
    state.leftNav = data;
  },
  SETCARENAME(state, data) {
    state.cateNameId = data;
  },
  SETMENUN(state, data) {
    state.menu = data;
  },
  SETARTICLETOTAL(state, data){
    state.article.total = data;
  }
}
export const actions = {
  setScrollTop(context, data) {
    context.commit('SETSCROLLTOP', data)
  },
  changeLeft(context, data) {
    context.commit('CHANGLEFT', data)
  },
  setCateName(context, data) {
    context.commit('SETCARENAME', data)
  }
}
