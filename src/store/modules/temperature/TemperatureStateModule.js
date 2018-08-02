export const UPDATE_TEMPERATURE = 'updateTemperatures'
export const UPDATE_SENSOR = 'updateSensors'
export const ADD_SENSORS = 'addSensors'

export default {
    state: {
        sensors: []
    },

    mutations: {
        [ADD_SENSORS](state, payload) {
            payload.sensors.forEach(sensor => {
                state.sensors.push({
                    uuid: sensor.uuid,
                    name: sensor.name,
                    alarm: sensor.alarm,
                    value: 0
                })
            })
        },

        [UPDATE_TEMPERATURE](state, payload) {
            let stateSensor = state.sensors.find(item => item.uuid === payload.uuid)
            if (stateSensor) {
                stateSensor.value = payload.value
            }
            else {
                console.log('Cannot find sensor with uuid ' + payload.uuid)
            }
        },

        [UPDATE_SENSOR](state, payload) {
            let uuid = payload.uuid
            let sensorSettings = payload.sensorSettings

            let foundSensor = state.sensors.find(sensor => sensor.uuid == uuid)
            foundSensor.alarm = sensorSettings.alarm
            foundSensor.name = sensorSettings.name
        }
    }
}
