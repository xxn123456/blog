import request from '@/utils/request'

// 获取所有文章类别
export function getCateName(data) {
  return request({
    url: '/navType/findAllnavType',
    // 此处admin是代理
    method: 'post',
    data
  })
}

// 获取文章列表
export function getBlog(data) {
  return request({
    url: '/blog/findAllRecommend',
    // 此处admin是代理
    method: 'post',
    data
  })
}



export function getBlogList(data) {
  return request({
    url: '/blog/findAllBlog',
    // 此处admin是代理
    method: 'post',
    data
  })
}


export function getBlogDetail(data) {
  return request({
    url: '/blog/findOne',
    // 此处admin是代理
    method: 'post',
    data
  })
}

// 更新阅读量
export function updataBlogSee(data) {
  return request({
    url: '/blog/updateSee',
    // 此处admin是代理
    method: 'post',
    data
  })
}


// 获取所有分页
export function getCarousel(data) {
  return request({
    url: '/carousel/findAllCarousel',
    // 此处admin是代理
    method: 'post',
    data
  })
}


// 获取所有分页
export function queryWebSet(data) {
  return request({
    url: '/webSet/findAllwebSet',
    // 此处admin是代理
    method: 'post',
    data
  })
}

export function queryWorks(data) {
  return request({
    url: '/works/findAllworks',
    // 此处admin是代理
    method: 'post',
    data
  })
}


export function queryWorkDetail(data) {
  return request({
    url: '/works/findOne',
    // 此处admin是代理
    method: 'post',
    data
  })
}






