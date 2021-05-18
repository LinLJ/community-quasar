<template>
  <div />
</template>

<script>
import { login, getToken, getUserInfo, bindTDFUaaUser, getUserRole, setLoginMessage, filterTest } from '@/utils/oauthLogin'
import { setToken } from '@/utils/token'

export default {
  name: 'Ssologin',
  created() {
    const code = this.$route.query.code
    if (code) {
      this.ssologin(code)
    } else {
      login()
    }
  },
  methods: {
    async ssologin(code) {
      try {
        const tokenRes = await getToken(code)
        const userRes = await getUserInfo(tokenRes.data.access_token)
        await filterTest(userRes.data,)
        await bindTDFUaaUser(userRes.data)
        this.getUserRoleAfterBindUser()
        setLoginMessage()
        
        if (tokenRes.data instanceof Object) {
          // 如果是通过统一认证服务登录
          tokenRes.data.create_timestamp = new Date().getTime()// 时间戳，精确到了毫秒
        } else {
          tokenRes.data = { 'access_token': tokenRes.data, 'create_timestamp': new Date().getTime() }
        }
        setToken(tokenRes.data)
        const redirectPath = window.sessionStorage.getItem('redirectPath')
        if (redirectPath) {
          this.$router.replace(redirectPath)
        } else {
          this.$router.replace('/')
        }
      } catch(err) {
        console.log(err)
      }
    },
    getUserRoleAfterBindUser(){

      getUserRole().then(response => {
        localStorage.setItem("userRoleTest", JSON.stringify(response.data))
        this.tags.push(...response.data)
        })
      //localStorage.setItem("userRoleTest", JSON.stringify("34124"))
    }


  }
}
</script>
