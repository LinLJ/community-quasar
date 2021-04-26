import request from '@/utils/request'

// 查询首页成果共享栏目下所有信息
export function getInfolinksByAchievements() {
  return request({
    url: '/community/infolinksByAchievements',
    method: 'get'
  })
}

// 查询首页广告位栏目下所有信息
export function getInfolinksByAdvertisings() {
  return request({
    url: '/community/infolinksByAdvertisings',
    method: 'get'
  })
}

// 查询栏目下所有信息
export function getInfolinks(id) {
  return request({
    url: `/community/infolinks?id=${id}`,
    method: 'get'
  })
}
/*
// 查询栏目下所有信息
export function getInfolinksOfIndexRecommend(id) {
  return request({
    url: `/community/infolinksOfIndexRecommend?id=${id}`,
    method: 'get'
  })
}*/

// 查询讨论组
export function getForumGroups() {
  return request({
    url: '/community/forumGroups',
    method: 'get'
  })
}

// 查询最新讨论帖
export function getNewestForums() {
  return request({
    url: '/community/forumPosts/newest',
    method: 'get'
  })
}

// 查询推荐博客
export function getRecommendBlogs() {
  return request({
    url: '/community/blogs/recommend',
    method: 'get'
  })
}

// 查询最新评论博客
export function getNewestBlogs() {
  return request({
    url: '/community/blogs/newestReply',
    method: 'get'
  })
}
