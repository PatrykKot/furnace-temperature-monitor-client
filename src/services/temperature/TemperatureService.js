import RootStore from '../../store/RootStore'
import {UPDATE_TEMPERATURES} from "../../store/modules/temperature/TemperatureStateModule";
import uuid from 'uuid/v1'
import loremIpsum from 'lorem-ipsum'

class TemperatureService {
    constructor() {
        this.cachedSensors = null
        this.cachedTemperatures = null
    }

    start() {
        this.reloadTemperatures()
        setInterval(() => this.reloadTemperatures(), 1000)
    }

    reloadTemperatures() {
        if (!this.cachedSensors) {
            this._mockSensors()
        }

        let temperatures = this._mockTemperatures()
        RootStore.commit(UPDATE_TEMPERATURES, {
            temperatures: this._clone(temperatures)
        })
    }

    getSensors() {
        if (!this.cachedSensors) {
            this._mockSensors()
        }

        return this.cachedSensors
    }

    _mockSensors() {
        this.cachedSensors = this._mapRandom(5, 6, () => ({
            uuid: this._randomUuid(),
            name: this._randomWord()
        }))
    }

    _mockTemperatures() {
        if (!this.cachedTemperatures) {
            this.cachedTemperatures = this.cachedSensors.map(sensor => ({
                sensor,
                value: this._randomRange(40, 60)
            }))

            return this.cachedTemperatures
        }
        else {
            return this.cachedTemperatures.map(temperature => {
                temperature.value += this._randomRange(-2, 2)
                return temperature
            })
        }
    }

    _mapRandom(min, max, call) {
        let result = []
        let count = this._randomRange(min, max)
        for (let i = 0; i < count; i++) {
            result.push(call())
        }

        return result
    }

    _randomRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    _randomUuid() {
        return uuid()
    }

    _randomWord() {
        let word = loremIpsum({
            count: 1,
            units: 'words'
        })

        word = word.toLowerCase()
        word = word.charAt(0).toUpperCase() + word.slice(1)

        return word
    }

    _clone(object) {
        return JSON.parse(JSON.stringify(object))
    }
}

export default new TemperatureService()
