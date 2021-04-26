import request from '@/utils/request'

// 查询所有商品
export function getCommodities() {
  return request({
    url: '/community/shops',
    method: 'get'
  })
}

// 通过id获取商品信息
export function getInfoById(id) {
  return request({
    url: '/community/shop',
    method: 'get',
    params: {
      id
    }
  })
}

// 购买商品
export function buy(commodityId, orderNum) {
  return request({
    url: '/user/shop',
    method: 'put',
    params: {
      commodityId,
      orderNum
    }
  })
}
