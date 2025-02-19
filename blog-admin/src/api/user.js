import request from '@/utils/request'

// 登录接口
export function login(data) {
  return request({
    url: '/user/login',
    // 此处admin是代理
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

// 获取用户信息
export function getInfo(data) {
  return request({
    url: '/user/getUserInfo',
    // 此处admin是代理
    method: 'get',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    data
  })
}
