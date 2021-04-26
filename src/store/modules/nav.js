import { getNav } from '@/utils/nav'

const nav = {
  state: {
    navigation: []
  },
  mutations: {
    SET_NAVIGATION: (state, navigation) => {
      state.navigation = navigation
    }
  },
  actions: {
    UpdateNav({ commit }, isLogin) {
      // console.info("登陆相关")
      const navigation = getNav(isLogin)
      commit('SET_NAVIGATION', navigation)
    }
  }
}

export default nav
