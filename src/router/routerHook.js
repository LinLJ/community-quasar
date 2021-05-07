import router from './index'
import store from '@/store'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
import { login } from '@/utils/oauthLogin'
// import delDependencies from '@/utils/mdEditor'

// NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  // console.info("-----------------------")
  // console.info(to)
  // console.info(from)
  // console.info(next)


  //NProgress.start()
  // delDependencies(from.path) // 删除editor.md的依赖加载
  store.dispatch('UpdateIsLogin') // 由于多标签页，状态同步


  //debugger
  if (store.getters.isLogin) {
    if (to.path === '/ssologin') {
      next('/')
      // NProgress.done()
    } else {
      next()
    }
  } else if (to.meta.requireLogin) {
    login(to.fullPath) // 防止有query param
  } else if (window.location.search.includes('code') && window.location.search.includes('state')) {
    window.location.href = `/#/ssologin${window.location.search}`
  } else {
    next()
  }
})

router.afterEach(() => {
  //NProgress.done()
})
