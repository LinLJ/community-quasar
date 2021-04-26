import request from '@/utils/request'

// 查询最新讨论帖
export function getLastForum() {
  return request({
    url: '/community/forumPosts/newest',
    method: 'get'
  })
}

// 获取讨论组
export function getForumGroups() {
  return request({
    url: '/community/forumGroupsByCategory',
    method: 'get'
  })
}
// 查询讨论组下帖子
export function getForumPosts(params) {
  return request({
    url: '/community/forumPosts',
    method: 'get',
    params
  })
}
// 查询讨论组下所有成员
export function getForumMembers(forumGroupId) {
  return request({
    url: '/community/forumGroupMembers',
    method: 'get',
    params: {
      forumGroupId
    }
  })
}
// 获取讨论组信息
export function getForumInfo(id) {
  return request({
    url: '/community/forumGroup',
    method: 'get',
    params: {
      id
    }
  })
}
// 判断当前用户是否属于当前讨论组
export function isBelongToFurom(forumGroupId) {
  return request({
    url: '/personal/forumGroupMember',
    method: 'get',
    params: {
      forumGroupId
    }
  })
}
// 加入讨论组
export function joinForum(forumGroupId) {
  return request({
    url: '/user/forum/userAdd',
    method: 'post',
    params: {
      forumGroupId
    }
  })
}
// 退出讨论组
export function quitForum(forumGroupId) {
  return request({
    url: '/user/forum/userDelete',
    method: 'post',
    params: {
      forumGroupId
    }
  })
}
// 删除帖子
export function delForumPost(id) {
  return request({
    url: '/user/forumPost',
    method: 'delete',
    params: {
      id
    }
  })
}
// 帖子加精
export function setBestPost(params) {
  return request({
    url: '/user/forumPost/gootPost',
    method: 'put',
    params
  })
}
// 帖子置顶
export function setTopPost(params) {
  return request({
    url: '/user/forumPost/stick',
    method: 'put',
    params
  })
}
// 发表帖子
export function postPublish(data) {
  return request({
    url: '/user/forumPost',
    method: 'post',
    data
  })
}
// 获取帖子
export function getPost(id) {
  return request({
    url: '/community/forumPost',
    method: 'get',
    params: {
      id
    }
  })
}
// 获取帖子评论
export function getPostComment(id) {
  return request({
    url: '/community/forumPostComments',
    method: 'get',
    params: {
      id
    }
  })
}
// 新增帖子评论
export function addPostComment(data) {
  return request({
    url: '/user/forumPostComment',
    method: 'post',
    data
  })
}
// 获取最新评论贴
export function getLastReplyPost() {
  return request({
    url: '/community/forumPosts/newestReply',
    method: 'get'
  })
}
// 删除回帖
export function delReply(id) {
  return request({
    url: '/user/forumPostComment',
    method: 'delete',
    params: {
      id
    }
  })
}
// 删除帖子
export function delPost(id) {
  return request({
    url: '/user/forumPost',
    method: 'delete',
    params: {
      id
    }
  })
}
// 判断是否是当前帖子作者
export function isCurrentPostAuthor(forumPostId) {
  return request({
    url: '/personal/forumPost/author',
    method: 'get',
    params: {
      forumPostId
    }
  })
}
