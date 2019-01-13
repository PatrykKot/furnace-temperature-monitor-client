import {PROXY_URL} from "../../proxy";

import SockJs from 'sockjs-client'
import {Stomp} from '@stomp/stompjs'
import RootStore from '../../store/RootStore'
import {UPDATE_SENSORS} from "../../store/modules/temperature/TemperatureStateModule";
import TemperatureService from "./TemperatureService";

class LiveTemperatureService {
    startDaemon() {
        this._runWebsocketDaemon();
        this.loadCurrentLatestByHttp()
    }

    loadCurrentLatestByHttp() {
        TemperatureService.getCurrentLatest()
            .then(temperatures => this.updateStore(temperatures))
    }

    _runWebsocketDaemon() {
        let sockJsClient = new SockJs(PROXY_URL + 'stomp');
        let stomp = Stomp.over(sockJsClient);
        stomp.connect({}, () => {
            stomp.subscribe('/topic/temperature/latest', message => {
                let temperatures = JSON.parse(message.body);
                this.updateStore(temperatures)
            })
        })
    }

    updateStore(temperatures) {
        RootStore.commit(UPDATE_SENSORS, {
            sensors: temperatures.map(temperature => {
                let sensor = temperature.sensor;

                return {
                    id: sensor.id,
                    name: sensor.name,
                    address: sensor.address,
                    isAlive: sensor.isAlive,
                    initialized: sensor.initialized,
                    alarmValue: sensor.alarmValue,
                    temperature: {
                        id: temperature.id,
                        value: temperature.value,
                        date: temperature.date
                    }
                }
            })
        })
    }
}

export default new LiveTemperatureService()
