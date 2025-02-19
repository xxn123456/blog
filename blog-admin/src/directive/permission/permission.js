import store from '@/store'
import {
  Message
} from 'element-ui'

export default {
  inserted(el, binding, vnode) {
    const {
      value
    } = binding
    const roles = store.getters && store.getters.roles

    if (value && value instanceof Array && value.length > 0) {
      
      const permissionRoles = value

      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })

      if (!hasPermission) {

        let span_role = document.createElement('span');
        span_role.innerHTML = el.innerHTML;
        span_role.className = el.className;
        span_role.onclick = function () {
          Message.warning("暂无权限")
           
        };

        el.parentNode.appendChild(span_role)


        el.parentNode.removeChild(el)


        // el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}
