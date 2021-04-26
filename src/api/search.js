import request from '@/utils/request'

// 全局搜索
export function getSearch(params) {
  return request({
    url: '/community/search',
    method: 'get',
    params
  })
}
