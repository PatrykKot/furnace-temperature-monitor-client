import * as Vuex from 'vuex'
import Vue from 'vue'
import TemperatureStateModule from "./modules/temperature/TemperatureStateModule";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        temperature: TemperatureStateModule
    }
})
