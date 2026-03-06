import request from '@/utils/request'
// 获取所有文章类别
export function getCateName(data) {
  return request({
    url: '/navType/findAll',
    method: 'post',
    data
  })
}
// 获取文章列表
export function getBlog(data) {
  return request({
    url: '/blog/findAll',
    method: 'post',
    data
  })
}
// 博客统计分析
export function getBlogAsy(params) {
  return request({
    url: '/open/blog/articleAsy',
    method: 'get',
    params
  })
}

export function getBlogList(data) {
  return request({
    url: '/blog/findAll',
    method: 'post',
    data
  })
}
// 获取博客详情
export function getBlogDetail(data) {
  return request({
    url: '/blog/findOne',
    method: 'post',
    data
  })
}
// 更新阅读量
export function updataBlogSee(data) {
  return request({
    url: '/blog/updateSee',
    method: 'post',
    data
  })
}
// 获取所有分页
export function getCarousel(data) {
  return request({
    url: '/carousel/findAll',
    method: 'post',
    data
  })
}
// 获取所有分页
export function queryWebSet(data) {
  return request({
    url: '/webSet/findAll',
    method: 'post',
    data
  })
}
// 获取作品集
export function queryWorks(data) {
  return request({
    url: '/works/findAll',
    // 此处admin是代理
    method: 'post',
    data
  })
}
// 获取作品集详情
export function queryWorkDetail(data) {
  return request({
    url: '/works/findOne',
    // 此处admin是代理
    method: 'post',
    data
  })
}

// 查询博客评论
export function queryBlogReply(data) {
  return request({
    url: '/open/reply/findAll',
    // 此处admin是代理
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/user/login',
    // 此处admin是代理
    method: 'post',
    data
  })
}
// 查询用户信息 
export function getUserInfo(params) {
  return request({
    url: '/user/getUserInfo',
    // 此处admin是代理
    method: 'get',
    params
  })
}
// 注册 
export function eamilRegit(data) {
  return request({
    url: '/open/user/regist',
    // 此处admin是代理
    method: 'post',
    data
  })
}
// 获取邮箱验证码
export function getSmsCode(params) {
  return request({
    url: '/open/user/sendVeryCode',
    // 此处admin是代理
    method: 'get',
    params
  })
}

// 创建评论
export function replyBlog(data) {
  return request({
    url: '/reply/create',
    // 此处admin是代理
    method: 'post',
    data
  })
}


// 查询天气
export function queryAdcodeByIp(params) {
  return request({
    url: '/sdk/queryAdcodeByIp',
    method: 'get',
    params
  })
}






