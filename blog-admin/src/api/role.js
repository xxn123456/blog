import request from '@/utils/request.js'

// 获取所有用户权限列表
export function getQx(data) {
  return request({
    url: '/manage/api/role/getRoleListPage',
    // 此处admin是代理
    method: 'post',
    data
  })
}
// 根据id 查用户权限
export function getRoleById(data) {
  return request({
    url: '/manage/api/role/getRoleById',
    // 此处admin是代理
    method: 'post',
    data
  })
}
// 获取大屏所有权限选择项
export function getRoleSeclect() {
  return request({
    url: '/manage/api/bigScreen/getBigScreenList',
    // 此处admin是代理
    method: 'get'
  })
}
// 获取所有资源权限选项
export function getResSeclect() {
  return request({
    url: '/manage/api/resource/getResourceInfoList',
    // 此处admin是代理
    method: 'get'
  })
}
// 编辑权限
export function editQx(data) {
  return request({
    url: '/manage/api/role/updateRole',
    // 此处admin是代理
    method: 'post',
    data
  })
}
// 添加用户
export function addPeople(data) {
  return request({
    url: '/manage/api/role//insertRole',
    // 此处admin是代理
    method: 'post',
    data
  })
}
// 删除会员
export function removeRole(data) {
  return request({
    url: '/manage/api/role/deleteRole',
    // 此处admin是代理
    method: 'post',
    data
  })
}
// 获取用户目前拥有
export function getRolenow(data) {
  return request({
    url: '/manage/api/role/getBigScreenInfoByRoleId',
    // 此处admin是代理
    method: 'post',
    data
  })
}
// 分配权限

export function assignBigPermissions(data) {
  return request({
    url: '/manage/api/role/assignPermissions',
    // 此处admin是代理
    method: 'post',
    data
  })
}
// 用户目前对大屏分配的权限
export function bigPremissionNow(data) {
  return request({
    url: '/manage/api/role/getBigScreenInfoByRoleResourceId',
    // 此处admin是代理
    method: 'post',
    data
  })
}
