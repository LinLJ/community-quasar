import request from '@/utils/request'

// 新建/编辑问题
export function questionPublish(data) {
  return request({
    url: '/user/question',
    method: 'post',
    data
  })
}
//获取标签
export function getTags(page) {
  return request({
    url: '/community/tagsq',
    method: 'get',
    params: {
      page
    }
  })
}
// 查询问题
export function getQuestions(params) {
  return request({
    url: '/community/questions',
    method: 'get',
    params
  })
}
// 查询问题
export function getQuestion(id) {
  return request({
    url: '/community/question',
    method: 'get',
    params: {
      id
    }
  })
}
// 个人信息
export function getPersonInfo() {
  return request({
    url: '/personal/questionInfo/',
    method: 'get'
  })
}
// 获取评论
export function getAnswers(params) {
  return request({
    url: '/community/answers',
    method: 'get',
    params
  })
}
// 新建/编辑回答
export function addAnswer(data) {
  return request({
    url: '/user/answer',
    method: 'post',
    data
  })
}
// 删除回答
export function delAnswer(id) {
  return request({
    url: '/user/answer',
    method: 'delete',
    params: {
      id
    }
  })
}
// 删除问题
export function delQuestion(id) {
  return request({
    url: '/user/question',
    method: 'delete',
    params: {
      id
    }
  })
}
// 是否是作者
export function isAuthor(questionId) {
  return request({
    url: '/user/question/author',
    method: 'get',
    params: {
      questionId
    }
  })
}
// 查询最新文章
export function getNewQues() {
  return request({
    url: '/community/questions/newest',
    method: 'get'
  })
}
// 关注
export function follow(params) {
  return request({
    url: '/user/view',
    method: 'put',
    params
  })
}
// 采纳/取消采纳
export function adopt(params) {
  return request({
    url: 'user/answer/take',
    method: 'put',
    params
  })
}
// 赞/踩
export function thumbup(params) {
  return request({
    url: '/user/question/ticket',
    method: 'put',
    params
  })
}
// 获取回复
export function getReply(params) {
  return request({
    url: 'community/replys',
    method: 'get',
    params
  })
}
// 新增回复
export function addReply(data) {
  return request({
    url: '/user/answerReply',
    method: 'post',
    data
  })
}
// 删除回复
export function delReply(id) {
  return request({
    url: '/user/answerReply',
    method: 'delete',
    params: {
      id
    }
  })
}
