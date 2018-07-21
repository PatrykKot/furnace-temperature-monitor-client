import Vue from 'vue'
import router from './router'
import Vuetify from 'vuetify'
import DrawerLayout from 'vue-drawer-layout'
import RootStore from './store/RootStore'

Vue.use(DrawerLayout)
Vue.use(Vuetify)
Vue.config.productionTip = false

import App from './App'

import 'vuetify/dist/vuetify.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

new Vue({
  el: '#app',
  router,
  store: RootStore,
  template: '<App/>',
  components: {App}
})
