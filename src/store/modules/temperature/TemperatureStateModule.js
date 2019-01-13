import {clearArray} from "../../../utils/arrayUtil";

export const UPDATE_SENSORS = 'addSensors'

export default {
    state: {
        sensors: []
    },

    mutations: {
        [UPDATE_SENSORS](state, payload) {
            clearArray(state.sensors)
            payload.sensors.forEach(sensor => {
                state.sensors.push({
                    id: sensor.id,
                    name: sensor.name,
                    address: sensor.address,
                    alarmValue: sensor.alarmValue,
                    isAlive: sensor.isAlive,
                    initialized: sensor.initialized,
                    temperature: {
                        id: sensor.temperature.id,
                        date: sensor.temperature.date,
                        value: sensor.temperature.value
                    }
                })
            })
        },
    }
}
