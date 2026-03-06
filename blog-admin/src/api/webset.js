import request from '@/utils/request'

// 搜索分页
export function findAll(data) {
  return request({
    url: '/webSet/findAll',
    // 此处admin是代理
    method: 'post',
    data
  })
}

// 创建文章类别
export function create(data) {
    return request({
      url: '/webSet/create',
      // 此处admin是代理
      method: 'post',
      data
    })
  }
// 修改文章类别
export function updata(data) {
    return request({
      url: '/webSet/update',
      // 此处admin是代理
      method: 'post',
      data
    })
  }

// 删除文章类别

export function del(data) {
    return request({
      url: '/webSet/del',
      // 此处admin是代理
      method: 'post',
      data
    })
  }

  // 批量删除文章类别

export function batchDel(data) {
  return request({
    url: '/webSet/batchDel',
    // 此处admin是代理
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}



