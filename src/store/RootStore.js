import * as Vuex from 'vuex'
import NavigatorStateModule from './modules/navigator/NavigatorStateModule'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    navigator: NavigatorStateModule
  }
})
