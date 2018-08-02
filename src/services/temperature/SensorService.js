import {mapRandom, randomUuid, randomWord} from "./utils/RandomUtils";
import RootStore from "../../store/RootStore";
import {ADD_SENSORS, UPDATE_SENSOR} from "../../store/modules/temperature/TemperatureStateModule";
import {cloneObject} from "./utils/Utils";
import firestore from '../../database/firestore'

let temperatureState = RootStore.state.temperature

class SensorService {
    constructor() {
        this.sensorsCollection = firestore.collection('sensors')

        this.sensorsCollection.onSnapshot(querySnapshot => {
            querySnapshot.forEach(function (sensor) {
                console.log(sensor.id, " => ", sensor.data());
            });
        })
    }

    getSensors() {
        if (temperatureState.sensors.length == 0) {
            this._mockSensors()
        }

        return temperatureState.sensors
    }

    _mockSensors() {
        let mockedSensors = mapRandom(5, 6, () => ({
            uuid: randomUuid(),
            name: randomWord(),
            alarm: null,
            value: null
        }))

        RootStore.commit(ADD_SENSORS, {
            sensors: cloneObject(mockedSensors)
        })
    }

    updateSensor(payload) {
        RootStore.commit(UPDATE_SENSOR, payload)
    }
}

export default new SensorService()