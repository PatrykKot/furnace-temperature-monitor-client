<template>
    <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
            <v-flex xs6 md2 :key="index" v-for="(sensor, index) in sensors">
                <single-temperature @click="selectedSensor = sensor; bottomSheet = true" :sensor="sensor"/>
            </v-flex>
        </v-layout>
        <sensor-settings-sheet v-model="bottomSheet" @onEditClicked="onSensorEditClicked"/>
    </v-container>
</template>

<script>
    import {mapState} from 'vuex'
    import SingleTemperature from "../../components/SingleTemperature";
    import SensorSettingsSheet from "../../components/SensorSettingsSheet";
    import {SENSOR_SETTINGS_VIEW} from './SensorSettingsView'

    export const TEMPERATURES_VIEW = 'TemperaturesView'

    export default {
        name: "TemperaturesView",

        components: {SensorSettingsSheet, SingleTemperature},

        computed: mapState({
            sensors: state => state.temperature.sensors
        }),

        data() {
            return ({
                bottomSheet: false,
                selectedSensor: null
            })
        },

        methods: {
            onSensorEditClicked() {
                let me = this
                me.bottomSheet = false
                setTimeout(() => {
                    this.$router.push({
                        name: SENSOR_SETTINGS_VIEW,
                        params: {
                            uuid: me.selectedSensor.uuid
                        }
                    })
                }, 250)
            }
        }
    }
</script>
