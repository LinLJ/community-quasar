import axios from 'axios'
import globalFunc from '@/global'
import { setToken,getToken} from './token'
import { validateNull } from './validate'//import { Message } from 'element-ui'
import { login, refreshToken} from './oauthLogin'
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE,
  timeout: globalFunc('HTTP_TIMEOUT')
})
service.interceptors.request.use(
  async config => {
    // 后端服务jwt token信息
    console.info("进入request.use")
    if (getToken()) {
      var tmpToken = getToken();
      console.info("tmpToken",tmpToken)
      if (tmpToken.refresh_token &&
        tmpToken.create_timestamp + tmpToken.expires_in * 1000 - 20000 < new Date().getTime()) {
        console.info("进入刷新token阶段")
        // 如果支持刷新token,并且距离tokeny已经，并且在可刷新时间内提前20秒过期前尝试内自动刷新token
        var refreshResponse = await refreshToken(tmpToken.refresh_token)
        //console.log("refreshresponse",refreshResponse)
        tmpToken = refreshResponse.data
        if (tmpToken instanceof Object) {
          // 如果是通过统一认证服务登录
          tmpToken.create_timestamp = new Date().getTime()// 时间戳，精确到了毫秒
        } else {
          tmpToken = { 'access_token': tmpToken, 'create_timestamp': new Date().getTime() }
        }
        setToken(tmpToken)
      }else {
        console.info("refreshToken过期");
      }
      config.headers['Authorization'] = 'Bearer ' + tmpToken.access_token
    }
    //console.info(config)
  return config
}, error => {
    console.info("进入request error")
  console.log(JSON.stringify(error)) // for debug
  Promise.reject(error)
})

/**
 * code 1成功 0错误 3需要登录
 */
service.interceptors.response.use(
  response => { // http status为2xx的进入
    const data = response.data
    console.info("data.code",data.code)
    if (!validateNull(data.code) && data.code !== 200) {

      switch (data.code) {
        case 3: {
          document.cookie = 'access_token = ""'
          document.cookie = 'JSESSIONID = ""'
          login(window.location.hash.slice(1))
          break
        }
        default: {
          //TODO 这里把错误信息注释了
/*          Message({
            message: data.message,
            type: 'error'
          })*/
        }
      }
      return Promise.reject(data.message)
    } else {
      console.info("code=200时，data值：",data)
      return data
    }
  },
/*  error => { // http status不是2xx的视为error
    debugger
    console.info("进入response error1")
    console.info("进入response error1:{}",error.response.data.message)
    window.location.href = "/"
    //console.info(error.response)
    //debugger
    if(error.response.data.message.indexOf("Jwt expired") != -1){
      console.info("request-error")
      //如果错误信息中包含JWt。。。 则为token过期错误
      //TODO 这种实现方式不太好，后期应该改后端代码，对于token过期错误定义一个错误码
      const token = getToken()
      if(token){
       // debugger
        removeToken()
        //TODO 重定向到首页
        // debugger
        // window.location.href = "/"
      }
      //debugger
    }
    //console.log(JSON.stringify(error.response)) // for debug
    //
/!*    Message({
      message: '响应异常或请求已超时，请稍后重试',
      type: 'error'
    })*!/
    return Promise.reject(error)
  }*/
)

export default service
