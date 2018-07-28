import * as Vuex from 'vuex'
import NavigatorStateModule from './modules/navigator/NavigatorStateModule'
import Vue from 'vue'
import TemperatureStateModule from "./modules/temperature/TemperatureStateModule";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
      navigator: NavigatorStateModule,
      temperature: TemperatureStateModule
  }
})
