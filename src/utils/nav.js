import { validateNull } from './validate'
import { navRouter } from '@/router'

/**
 * 通过路由表获取导航栏菜单
 * @param  {Boolean} isLogin 登录状态
 * @return {Array} 菜单数组
 */
export function getNav(isLogin) {
  const nav = []
  const routes = navRouter[0].children // 只有navRouter的/的子集为导航
  const roleMap = JSON.parse(window.localStorage.getItem("userRoleTest"))

/*  if (!validateNull(routes)) {
    routes.forEach(item => {
      const { path, name, meta } = item
      if (!validateNull(meta)) {
        if (!isLogin && meta.requireLogin) {
          if(roleMap==1){
            nav.push({ path, name, meta })
          }else {
            return
          }


        }
        nav.push({ path, name, meta })

      }
    })
  }*/

  if (!validateNull(routes)) {
    routes.forEach(item => {
      const { path, name, meta } = item
      if (!validateNull(meta)) {
        if (!isLogin && meta.requireLogin) {
          return;
        }
        if(roleMap!=1 && meta.requireAdmin){
          return;
        }
        nav.push({ path, name, meta })

      }

    })
  }


  return nav
}
