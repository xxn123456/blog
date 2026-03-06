import store from '@/store'
import { Message } from 'element-ui'

export default {
  inserted(el, binding, vnode) {
    const {
      value
    } = binding;
    // console.log("绑定值",value)
    const userInfo = store.getters && store.getters.userInfo;
    const permission_btns = JSON.parse(userInfo.role.permission_btns)
    // console.log("权限",permission_btns.btns)
    if (value && value instanceof Array && value.length > 0) {
      const hasPermission = permission_btns.btns[value]
      if (!hasPermission) {
        let span_role = document.createElement('span');
        span_role.innerHTML = el.innerHTML;
        span_role.className = el.className;
        span_role.onclick = function () {
          Message.warning("暂无权限")
        };
        el.parentNode.appendChild(span_role)
        el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}
