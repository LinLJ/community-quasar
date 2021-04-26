import request from '@/utils/request'

// 获取博客
export function getBlog(id) {
  return request({
    url: '/community/blog',
    method: 'get',
    params: {
      id
    }
  })
}
// 获取博客评论
export function getBlogComment(params) {
  return request({
    url: '/community/blogComment',
    method: 'get',
    params
  })
}
// 分页查询博客，用于搜索框搜索博客
export function getBlogList(params) {
  return request({
    url: '/community/blogs',
    method: 'get',
    params
  })
}
// 分页查询标签
export function getTags(page) {
  return request({
    url: '/community/tags',
    method: 'get',
    params: {
      page
    }
  })
}

// 查询最新评论
export function getLastReply() {
  return request({
    url: '/community/blogs/newestReply',
    method: 'get'
  })
}
// 获取友情链接
export function getFriendHref() {
  return request({
    url: '/community/blog/friendHref',
    method: 'get'
  })
}
// 查询博客推荐
export function getRecomment() {
  return request({
    url: '/community/blogs/recommend',
    method: 'get'
  })
}
// 评论
export function addComment(data) {
  return request({
    url: '/user/blogComment',
    method: 'post',
    data
  })
}
// 发表博客
export function addBlog(data) {
  return request({
    url: '/user/blog',
    method: 'post',
    data
  })
}

// 发布草稿
export function addBlogDraft(data) {
  return request({
    url: '/user/blogDraft',
    method: 'post',
    data
  })
}
// 删除博客
export function delBlog(id) {
  return request({
    url: '/user/blog',
    method: 'delete',
    params: {
      id
    }
  })
}
// 删除草稿
export function delBlogDraft(id) {
  return request({
    url: '/user/blogDraft',
    method: 'delete',
    params: {
      id
    }
  })
}
// 获取草稿
export function getDrafts() {
  return request({
    url: '/personal/draftBlogs',
    method: 'get'
  })
}
// 是否是作者
export function isAuthor(blogId) {
  return request({
    url: '/personal/blog/author',
    method: 'get',
    params: {
      blogId
    }
  })
}
// 收藏
export function collect(params) {
  return request({
    url: '/user/fave',
    method: 'put',
    params
  })
}
// 点赞
export function thumbup(params) {
  return request({
    url: '/user/blog/thumbUp',
    method: 'put',
    params
  })
}
// 删除评论
export function delComment(params) {
  return request({
    url: '/user/blogComment',
    method: 'delete',
    params
  })
}
