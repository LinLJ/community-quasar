// import { getToken } from '@/utils/token'

const user = {
  state: {
    isLogin: false
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin
    }
  },
  actions: {
    UpdateIsLogin({ commit, state, dispatch }) {
      const token = "getToken()"
      if (state.isLogin && !token) { // 登录变成未登录
        commit('SET_IS_LOGIN', false)
        dispatch('UpdateNav', false, { root: true })
      } else if (!state.isLogin && token) { // 未登录变成登录
        commit('SET_IS_LOGIN', true)
        dispatch('UpdateNav', true, { root: true })
      }
    }
  }
}

export default user
