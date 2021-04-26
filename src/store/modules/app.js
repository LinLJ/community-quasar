const app = {
  state: {
    device: 'desktop' // desktop mobile min-mobile
  },
  mutations: {
    SET_DEVICE: (state, device) => {
      state.device = device
    }
  },
  actions: {
    ToggleDevice: ({ commit }, device) => {
      commit('SET_DEVICE', device)
    }
  }
}
export default app
