import request from '@/utils/request'

// 查询个人信息
export function getPersonalInfo() {
  return request({
    url: '/personal/info',
    method: 'get'
  })
}

// 查询兑换历史记录
export function getOrders() {
  return request({
    url: '/personal/orders',
    method: 'get'
  })
}

// 根据用户id查询用户个人信息
export function getPersonInfoById(id) {
  return request({
    url: '/community/userSpace',
    method: 'get',
    params: {
      userId: id
    }
  })
}

// 根据用户id查询用户博客
export function getBlogsByUser(id, page) {
  return request({
    url: '/community/blogs/user',
    method: 'get',
    params: {
      id,
      page
    }
  })
}

// 关注用户
export function addFollowerInfo(userId) {
  return request({
    url: '/user/addFollowerInfo',
    method: 'put',
    params: {
      userId
    }
  })
}

// 取关用户
export function deleteFollowerInfo(userId) {
  return request({
    url: '/user/deleteFollowerInfo',
    method: 'put',
    params: {
      userId
    }
  })
}

// 查询个人博客信息
export function getBlogs(params) {
  return request({
    url: '/personal/blogs',
    method: 'get',
    params
  })
}

// 查询个人收藏信息
export function getFavorites(params) {
  return request({
    url: '/personal/favorites',
    method: 'get',
    params
  })
}

// 查询个人粉丝信息
export function getFollowdes(params) {
  return request({
    url: '/personal/followedes',
    method: 'get',
    params
  })
}

// 查询个人关注信息
export function getFollowers(params) {
  return request({
    url: '/personal/followers',
    method: 'get',
    params
  })
}

// 查询个人讨论组信息
export function getForumGroups() {
  return request({
    url: '/personal/forumGroups',
    method: 'get'
  })
}

// 查询个人帖子信息
export function getForumPosts(params) {
  return request({
    url: '/personal/forumPosts',
    method: 'get',
    params
  })
}

// 查询个人未读消息信息
export function getUnreads(params) {
  return request({
    url: '/personal/notifyUnreads',
    method: 'get',
    params
  })
}

// 消息已读
export function notifyRead(id) {
  return request({
    url: '/user/notifyRead',
    method: 'put',
    params: {
      id
    }
  })
}

// 查询个人消息信息
export function geNotifyes(params) {
  return request({
    url: '/personal/notifyes',
    method: 'get',
    params
  })
}

// 查询个人积分信息
export function getScoreInfos(params) {
  return request({
    url: '/personal/scoreInfoes',
    method: 'get',
    params
  })
}

// 查询个人设置信息
export function getSettingInfo() {
  return request({
    url: '/personal/settingInfo',
    method: 'get'
  })
}

// 修改用户设置
export function userSetting(data) {
  return request({
    url: '/user/setting',
    method:'put',
    data
  })
}

// 修改用户头像
export function userAvatar(data) {
  return request({
    url: '/user/avatar',
    method: 'post',
    data
  })
}

// 查询个人我的问
export function getMyQuestion(params) {
  return request({
    url: '/personal/questions',
    method: 'get',
    params
  })
}

// 查询个人我的问
export function getMyAnswer(params) {
  return request({
    url: '/personal/answers',
    method: 'get',
    params
  })
}

// 查询个人我的问
export function getMyQuestionFollow(params) {
  return request({
    url: '/personal/viewQuestions',
    method: 'get',
    params
  })
}
