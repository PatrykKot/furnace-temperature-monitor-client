export const TOGGLE_DRAWER = 'toggleDrawer'

export default {
  state: {
    showDrawer: false
  },

  mutations: {
    [TOGGLE_DRAWER](state, payload) {
      state.showDrawer = payload.show
    }
  }
}
