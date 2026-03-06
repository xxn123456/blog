import request from '@/utils/request'

// 搜索分页
export function findAll(data) {
  return request({
    url: '/works/findAll',
    // 此处admin是代理
    method: 'post',
    data
  })
}

// 查找文章详情
export function findOne(data) {
  return request({
    url: '/works/findOne',
    // 此处admin是代理
    method: 'post',
    data
  })
}

// 创建文章类别
export function create(data) {
    return request({
      url: '/works/create',
      // 此处admin是代理
      method: 'post',
      data
    })
  }
// 修改文章类别
export function updata(data) {
    return request({
      url: '/works/update',
      // 此处admin是代理
      method: 'post',
      data
    })
  }

// 删除文章类别

export function del(data) {
    return request({
      url: '/works/del',
      // 此处admin是代理
      method: 'post',
      data
    })
  }

  // 批量删除文章类别

export function batchDel(data) {
  return request({
    url: '/works/batchDel',
    // 此处admin是代理
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}


export function upload(data) {
  return request({
    url: '/upload/oss',
    // 此处admin是代理
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}
export function upBook(data) {
  return request({
    url: '/works/upBook',
    // 此处admin是代理
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}




