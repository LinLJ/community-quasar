import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import nav from './modules/nav'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    nav,
    user
  },
  getters
})
