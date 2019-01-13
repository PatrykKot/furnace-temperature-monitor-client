<template>
    <div>
        <v-toolbar color="primary"
                   dark
                   extended
                   extension-height="7">
            <v-toolbar-title>
                Temperatury
            </v-toolbar-title>
            <template v-if="hasUninitializedSensors">
                <v-spacer/>
                <v-btn @click="openInitializationView"
                       icon>
                    <v-icon>
                        add
                    </v-icon>
                </v-btn>
            </template>
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
                                            @click="onTemperatureClick(sensor)"/>
                    </v-flex>
                </v-layout>
                <sensor-settings-bottom-popup @onEditClicked="onSensorEditClicked"
                                              v-model="bottomSheet"/>
            </v-container>
        </v-content>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import SingleTemperature from "../../components/SingleTemperature";
    import SensorSettingsBottomPopup from "../../components/SensorSettingsBottomPopup";
    import {SENSOR_INITIALIZATION_VIEW, SENSOR_SETTINGS_VIEW} from "../../router/routeNames";

    export default {
        name: "TemperaturesView",

        components: {SensorSettingsBottomPopup, SingleTemperature},

        computed: {
            ...mapState({
                stateSensors: state => state.temperature.sensors
            }),

            sensors() {
                return this.stateSensors.filter(sensor => sensor.initialized)
            },

            hasUninitializedSensors() {
                return this.stateSensors.filter(sensor => !sensor.initialized).length > 0
            }
        },

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
                            id: me.selectedSensor.id
                        }
                    })
                }, 200)
            },

            openInitializationView() {
                this.$router.push({
                    name: SENSOR_INITIALIZATION_VIEW
                })
            },

            onTemperatureClick(sensor) {
                this.selectedSensor = sensor;
                this.bottomSheet = true;
            }
        }
    }
</script>
