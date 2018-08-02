import RootStore from '../../store/RootStore'
import {UPDATE_TEMPERATURE} from "../../store/modules/temperature/TemperatureStateModule";
import {randomRange} from "./utils/RandomUtils";
import SensorService from "./SensorService";

class TemperatureService {
    start() {
        this.reloadTemperatures()
        setInterval(() => this.reloadTemperatures(), 1000)
    }

    reloadTemperatures() {
        let sensors = SensorService.getSensors()
        sensors.forEach(sensor => {
            RootStore.commit(UPDATE_TEMPERATURE, {
                uuid: sensor.uuid,
                value: sensor.value ? sensor.value + randomRange(-2, 2) : randomRange(40, 60)
            })
        })
    }
}

export default new TemperatureService()
