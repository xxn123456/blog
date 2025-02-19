import request from '@/utils/request'

// 搜索分页
export function findAll(data) {
  return request({
    url: '/job/findAll',
    // 此处admin是代理
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

// 查找文章详情
export function findOne(data) {
  return request({
    url: '/job/findOne',
    // 此处admin是代理
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

// 创建文章类别
export function create(data) {
    return request({
      url: '/job/create',
      // 此处admin是代理
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data
    })
  }
// 修改文章类别
export function update(data) {
    return request({
      url: '/job/update',
      // 此处admin是代理
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data
    })
  }

// 删除文章类别

export function del(data) {
    return request({
      url: '/job/del',
      // 此处admin是代理
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data
    })
  }

  // 批量删除文章类别

export function batchDel(data) {
  return request({
    url: '/job/batchDel',
    // 此处admin是代理
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

export function upBook(data) {
  return request({
    url: '/job/upload',
    // 此处admin是代理
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

export function upload(data) {
  return request({
    url: '/job/upload',
    // 此处admin是代理
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}





