import request from '@/utils/request'

// 积分排行
export function getPoint() {
  return request({
    url: '/community/ranking/point',
    method: 'get'
  })
}

// 博客排行——评论数
export function getBlogReply() {
  return request({
    url: '/community/ranking/blog/reply',
    method: 'get'
  })
}

// 博客排行——收藏数
export function getBlogCollect() {
  return request({
    url: '/community/ranking/blog/collect',
    method: 'get'
  })
}

// 博客排行——访问量
export function getBlogVisit() {
  return request({
    url: '/community/ranking/blog/visit',
    method: 'get'
  })
}

// 博客排行——热度
export function getBlogHeat() {
  return request({
    url: '/community/ranking/blog/heat',
    method: 'get'
  })
}

// 热帖排行——评论数
export function getPostReply() {
  return request({
    url: '/community/ranking/post/reply',
    method: 'get'
  })
}

// 热帖排行——收藏数
export function getPostCollect() {
  return request({
    url: '/community/ranking/post/collect',
    method: 'get'
  })
}

// 热帖排行——访问量
export function getPostVisit() {
  return request({
    url: '/community/ranking/post/visit',
    method: 'get'
  })
}

// 热帖排行——热度
export function getPostHeat() {
  return request({
    url: '/community/ranking/post/heat',
    method: 'get'
  })
}
