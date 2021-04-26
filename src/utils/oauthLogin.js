import qs from 'qs'
import { Base64 } from 'js-base64'
import axios from 'axios'
import request from './request'
import { removeToken } from './token'

/**
 * 跳转到统一认证服务地址获取授权码
 * hack方法，接受参数为登录成功后重定向地址，缺省时重定向首页
 */
export function login(redirectPath) {
  console.info("重定向地址：",redirectPath)
  if (redirectPath) {
    window.sessionStorage.setItem('redirectPath', redirectPath)
  }
  const param = qs.stringify({
    client_id: process.env.VUE_APP_clientId,
    response_type: process.env.VUE_APP_responseType,
    scope: process.env.VUE_APP_scope,
    state: process.env.VUE_APP_state,
    redirect_uri: process.env.VUE_APP_redirectUri
  })
  window.location.href = `${process.env.VUE_APP_userAuthorizationUri}?${param}`
}

/**
 * 通过code获取token
 * @param  {String} code 授权码
 * @return {Promise Object}
 */
export function getToken(code) {
  const oauthKey = Base64.encode(`${process.env.VUE_APP_clientId}:${process.env.VUE_APP_clientSecret}`)
  const param = qs.stringify({
    client_id: process.env.VUE_APP_clientId,
    client_secret: process.env.VUE_APP_clientSecret,
    code,
    grant_type: process.env.VUE_APP_grantType
  })
  // redirect_uri不放在qs中序列化，转码导致请求400，所以放在下面拼接
  return axios.post(`${process.env.VUE_APP_accessTokenUri}?${param}&redirect_uri=${process.env.VUE_APP_redirectUri}`, null, {
    headers: {
      Accept: 'application/json',
      Authorization: 'Basic ' + oauthKey
    }
  })
}

/**
 * 根据token获取统一认证用户信息
 * @param  {String} token
 * @return {Promise Object}
 */
export function getUserInfo(token) {
  return axios({
    url: `${process.env.VUE_APP_userInfoUri}?access_token=${token}`,
    headers: { 'Accept': 'application/json' }
  })
}

/**
 * 绑定用户
 * @param  {Object} data 统一认证用户信息
 * @return {Promise Object}
 */
export function bindTDFUaaUser(data) {
  return request({
    url: `/bindTDFUaaUserCommunity`,
    method: 'post',
    data
  })
}

/*export function bindTDFUaaUser(data,token) {
  return request({
    url: `/bindTDFUaaUserCommunity?token=${token}`,
    method: 'post',
    data
  })
}*/
/*export function bindTDFUaaUser(data,token) {
  return request({
    url: `/bindTDFUaaUser?token=${token}`,
    method: 'post',
    data
  })
}*/

export function filterTest(data) {
  return request({
    url: `/filterTest`,
    method: 'post',
    data
  })
}

/**
 * 获取用户权限
 */
export function getUserRole() {
  return request({
    url: '/system/user/findUserRoleForBackToVue',
    method: 'get'
  })
}



/**
 * 记录用户登陆过程
 * @return {Promise Object}
 */
export function setLoginMessage() {
  return request({
    url: '/user/login',
    method: 'get'
  })
}

/**
 * 注销
 * @return {Promise Object}
 */
/*export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}*/

/**
 * 注销
 * @return {Promise Object}
 */
export function logout() {
  // 1. 调用认证中心退出接口
  return axios.get(`${process.env.VUE_APP_logoutUri}`, {
    withCredentials: true //正确写法
    // headers: {'withCredentials': 'true'} //错误写法
  }).then((data ) => {
    if (data.data.success) {
      // 2. 删除access_token
      removeToken()
      window.location.reload()
    } else {
      alert("退出失败："+JSON.stringify(data))
    }
  })
}


export function refreshToken(refresh_token) {
  const oauthKey = Base64.encode(process.env.VUE_APP_clientId + ':' + process.env.VUE_APP_clientSecret)
  // redirect_uri不放在qs中序列化，转码导致请求400，所以放在下面拼接
  const refreshTokenUrlParam = '?' + 'refresh_token=' + refresh_token +
    '&' + 'grant_type=refresh_token'



  //解决refresh token过期问题
  const refreshTokenReturn = axios.post(process.env.VUE_APP_accessTokenUri + refreshTokenUrlParam
    , null, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Basic ' + oauthKey
      }
    }).then(data=>{
      return data
  },error => { // http status不是2xx的视为error
    console.log("error",error)
    removeToken()
    //重定向到首页
    window.location.href = "/"
  })
  return refreshTokenReturn

/*  return axios.post(process.env.VUE_APP_accessTokenUri + refreshTokenUrlParam
    , null, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Basic ' + oauthKey
      }
    }, error =>{
      console.log("error",error)
      removeToken()
      //重定向到首页
      window.location.href = "/"
    })*/

  //可以解决token过期问题
/*  return axios.post(process.env.VUE_APP_accessTokenUri + refreshTokenUrlParam
    , null, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Basic ' + oauthKey
      }
    },)*/
}

