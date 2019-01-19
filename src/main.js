import '@babel/polyfill'

import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'

import router from './router/router'
import store from './store/RootStore'

import DrawerLayout from 'vue-drawer-layout'
import VueAnimateNumber from 'vue-animate-number'

import './registerServiceWorker'

import LiveTemperatureService from "./services/temperature/LiveTemperatureService"

import 'vuetify/dist/vuetify.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import moment from 'moment'

Vue.config.productionTip = false

Vue.use(DrawerLayout)
Vue.use(Vuetify)
Vue.use(VueAnimateNumber)

moment.locale('pl')

new Vue({
    router,
    store,
    render: h => h(App),
    created: () => LiveTemperatureService.startDaemon()
}).$mount('#app')