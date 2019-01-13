import axios from 'axios'
import {PROXY_URL} from "../../../proxy";

class SensorService {
    getAll() {
        return axios
            .get(PROXY_URL + 'temperature/sensor')
            .then(result => result.data)
    }

    initialize(sensorId) {
        return axios
            .post(PROXY_URL + 'temperature/sensor/initialize/' + sensorId)
    }

    reset(sensorId) {
        return axios
            .post(PROXY_URL + 'temperature/sensor/reset/' + sensorId)
    }

    get(id) {
        return axios
            .get(PROXY_URL + 'temperature/sensor/' + id)
            .then(result => result.data)
    }

    update(sensor) {
        return axios
            .post(PROXY_URL + 'temperature/sensor', sensor)
    }
}

export default new SensorService()