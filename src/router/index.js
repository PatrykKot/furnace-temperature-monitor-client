import Vue from 'vue'
import Router from 'vue-router'
import TemperaturesView, {TEMPERATURES_VIEW} from '../view/routes/TemperaturesView'
import SensorSettingsView, {SENSOR_SETTINGS_VIEW} from '../view/routes/SensorSettingsView'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: TEMPERATURES_VIEW,
        component: TemperaturesView
    }, {
        path: '/sensor/settings/:uuid',
        name: SENSOR_SETTINGS_VIEW,
        component: SensorSettingsView,
        props: true
    }]
})
