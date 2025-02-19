import request from '@/utils/request'

// 搜索分页
export function findAll(data) {
  return request({
    url: '/other/findAll',
    // 此处admin是代理
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}




