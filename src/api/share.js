import request from '@/utils/request'

// 获取所有栏目的id
export function getSorts() {
  return request({
    url: '/community/infosorts',
    method: 'get'
  })
}

// 通过id获取栏目下数据
export function getLinks(id) {
  return request({
    url: '/community/infolinks',
    method: 'get',
    params: {
      id
    }
  })
}

// 通过id获取查看页面具体数据
export function getInfoLink(id) {
  return request({
    url: '/community/infolink',
    method: 'get',
    params: {
      id
    }
  })
}
