import {PROXY_URL} from "../../proxy";
import axios from 'axios'

class TemperatureService {
    getCurrentLatest() {
        return axios.get(PROXY_URL + 'temperature/latest')
            .then(result => result.data)
    }

    getSimplifiedHistoryBetween(sensorId, from, to) {
        return axios
            .get(PROXY_URL + 'temperature/history/' + sensorId + '/between/' + from + '/' + to + '/simplified', {
                params: {
                    tolerance: 0.1
                }
            })
            .then(result => result.data)
    }
}

export default new TemperatureService()