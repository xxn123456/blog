import request from '@/utils/request'

// 登录接口
export function login(data) {
  return request({
    url: '/user/login',
    // 此处admin是代理
    method: 'post',
    data
  })
}

// 获取用户信息
export function getInfo(data) {
  return request({
    url: '/user/getUserInfo',
    // 此处admin是代理
    method: 'get',
    data
  })
}

// 创建文章类别
export function create(data) {
  return request({
    url: '/user/regist',
    // 此处admin是代理
    method: 'post',
    data
  })
}

export function findAll(data) {
  return request({
    url: '/user/findAll',
    // 此处admin是代理
    method: 'post',
    data
  })
}
export function updata(data) {
  return request({
    url: '/user/update',
    // 此处admin是代理
    method: 'post',
    data
  })
}


// 删除文章类别

export function del(data) {
  return request({
    url: '/user/del',
    // 此处admin是代理
    method: 'post',
    data
  })
}

 // 批量删除文章类别

 export function batchDel(data) {
  return request({
    url: '/user/batchDel',
    // 此处admin是代理
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

// 搜索分页
export function findAllRole(data) {
  return request({
    url: '/role/findAll',
    // 此处admin是代理
    method: 'post',
    data
  })
}