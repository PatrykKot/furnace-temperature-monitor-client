import RootStore from '../../store/RootStore'
import {UPDATE_TEMPERATURE} from "../../store/modules/temperature/TemperatureStateModule";
import SensorService from "./SensorService";

class TemperatureService {
    start() {
        this.reloadTemperatures();
        setInterval(() => this.reloadTemperatures(), 1000)
    }

    reloadTemperatures() {
        let sensors = SensorService.getSensors();
        sensors.forEach(sensor => {
            RootStore.commit(UPDATE_TEMPERATURE, {
                uuid: sensor.uuid,
                value: 0
            })
        })
    }
}

export default new TemperatureService()
