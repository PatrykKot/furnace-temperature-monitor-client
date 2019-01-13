import RootStore from "../../store/RootStore";
import {ADD_SENSORS, UPDATE_SENSOR} from "../../store/modules/temperature/TemperatureStateModule";
import {cloneObject} from "../../utils/objectUtils";

let temperatureState = RootStore.state.temperature;

class SensorService {
    getSensors() {
        if (temperatureState.sensors.length == 0) {
            this._mockSensors()
        }

        return temperatureState.sensors
    }

    _mockSensors() {
        let mockedSensors = []

        RootStore.commit(ADD_SENSORS, {
            sensors: cloneObject(mockedSensors)
        })
    }

    updateSensor(payload) {
        RootStore.commit(UPDATE_SENSOR, payload)
    }
}

export default new SensorService()