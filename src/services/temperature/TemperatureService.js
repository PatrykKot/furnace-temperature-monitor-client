import {PROXY_URL} from "../../proxy";
import axios from 'axios'

class TemperatureService {
    getCurrentLatest() {
        return axios.get(PROXY_URL + 'temperature/latest')
            .then(result => result.data)
    }
}

export default new TemperatureService()