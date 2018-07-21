import Vue from 'vue'
import router from './router'
import Vuetify from 'vuetify'
import App from './App'
import RootStore from './store/RootStore'

import 'vuetify/dist/vuetify.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store: RootStore,
  template: '<App/>',
  components: {App}
})
