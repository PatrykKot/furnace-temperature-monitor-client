import {TOGGLE_DRAWER} from "./NavigatorMutations";

export default {
  state: {
    showDrawer: false
  },

  mutations: {
    [TOGGLE_DRAWER](state) {
      state.showDrawer = !state.showDrawer
    }
  }
}
