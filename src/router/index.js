import Vue from 'vue'
import Router from 'vue-router'
import TemperaturesView, {TEMPERATURES_VIEW} from '../view/routes/TemperaturesView'
import SettingsView, {SETTINGS_VIEW} from '../view/routes/SettingsView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: TEMPERATURES_VIEW,
      component: TemperaturesView
    },
    {
      path: '/settings',
      name: SETTINGS_VIEW,
      component: SettingsView
    }
  ]
})
