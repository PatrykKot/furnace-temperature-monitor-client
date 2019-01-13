import '@babel/polyfill'

import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'

import router from './router'
import store from './store/RootStore'

import DrawerLayout from 'vue-drawer-layout'
import VueAnimateNumber from 'vue-animate-number'

import './registerServiceWorker'

import TemperatureService from "./services/temperature/TemperatureService";

import 'vuetify/dist/vuetify.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false;

Vue.use(DrawerLayout);
Vue.use(Vuetify);
Vue.use(VueAnimateNumber);

new Vue({
    router,
    store,
    render: h => h(App),
    created: () => TemperatureService.start()
}).$mount('#app');