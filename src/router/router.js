import Vue from 'vue'
import Router from 'vue-router'
import TemperaturesView from '../view/routes/TemperaturesView'
import SensorSettingsView from '../view/routes/SensorSettingsView'
import SensorInitializationView from "../view/routes/SensorInitializationView";
import {SENSOR_INITIALIZATION_VIEW, SENSOR_SETTINGS_VIEW, TEMPERATURE_HISTORY, TEMPERATURES_VIEW} from "./routeNames";
import HistoryView from "../view/routes/HistoryView";

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: TEMPERATURES_VIEW,
        component: TemperaturesView
    }, {
        path: '/sensor/initialization',
        name: SENSOR_INITIALIZATION_VIEW,
        component: SensorInitializationView
    }, {
        path: '/sensor/settings/:id',
        name: SENSOR_SETTINGS_VIEW,
        component: SensorSettingsView,
        props: true
    }, {
        path: '/sensor/history/:id/:date',
        name: TEMPERATURE_HISTORY,
        component: HistoryView,
        props: true
    }]
})
