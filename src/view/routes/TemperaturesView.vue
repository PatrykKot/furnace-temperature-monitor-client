<template>
    <div>
        <v-toolbar color="primary"
                   dark
                   extended
                   extension-height="7">
            <v-toolbar-title>
                TODO tytuł
            </v-toolbar-title>
            <v-progress-linear :indeterminate="true"
                               class="ma-0"
                               color="white"
                               slot="extension"
                               v-if="false"/>
        </v-toolbar>
        <v-content>
            <v-container grid-list-xl text-xs-center>
                <v-layout row wrap>
                    <v-flex :key="index" md2 v-for="(sensor, index) in sensors" xs6>
                        <single-temperature :sensor="sensor"
                                            @click="selectedSensor = sensor; bottomSheet = true"/>
                    </v-flex>
                </v-layout>
                <sensor-settings-sheet @onEditClicked="onSensorEditClicked"
                                       v-model="bottomSheet"/>
            </v-container>
        </v-content>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import SingleTemperature from "../../components/SingleTemperature";
    import SensorSettingsSheet from "../../components/SensorSettingsSheet";
    import {SENSOR_SETTINGS_VIEW} from './SensorSettingsView'

    export const TEMPERATURES_VIEW = 'TemperaturesView';

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
                let me = this;
                me.bottomSheet = false;
                setTimeout(() => {
                    this.$router.push({
                        name: SENSOR_SETTINGS_VIEW,
                        params: {
                            uuid: me.selectedSensor.uuid
                        }
                    })
                }, 200)
            }
        }
    }
</script>
