import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import nav from './modules/nav'
import user from './modules/user'
import getters from './getters';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    seckills: { // 秒杀
      deadline: {
        hours: 0,
        minute: 0,
        seconds: 0
      },
      goodsList: []
    },
  },
  modules: {
    app,
    nav,
    user
  },
  getters
})
