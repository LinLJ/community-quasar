import router from './index'

router.beforeEach((to, from, next) => {
  // console.log('路由跳转，从：', from, '至:', to)
  NProgress.start()
  next()
  // NProgress.start()
  // delDependencies(from.path) // 删除editor.md的依赖加载
  // store.dispatch('UpdateIsLogin') // 由于多标签页，状态同步

  // if (store.getters.isLogin) {
  //   if (to.path === '/ssologin') {
  //     next('/')
  //     // NProgress.done()
  //   } else {
  //     next()
  //   }
  // } else if (to.meta.requireLogin) {
  //   login(to.fullPath) // 防止有query param
  // } else if (window.location.search.includes('code') && window.location.search.includes('state')) {
  //   window.location.href = `/#/ssologin${window.location.search}`
  // } else {
  //   next()
  // }
})

router.afterEach(() => {
  NProgress.done()
})
