<template>
    <div>
        <v-toolbar color="primary"
                   dark
                   extended
                   extension-height="7">
            <v-toolbar-title>
                Temperatury
            </v-toolbar-title>
            <v-spacer/>
            <v-btn @click="openInitializationView"
                   icon>
                <v-icon>
                    add
                </v-icon>
            </v-btn>
            <v-progress-linear :indeterminate="true"
                               class="ma-0"
                               color="white"
                               slot="extension"
                               v-if="progress"/>
        </v-toolbar>
        <v-content>
            <v-snackbar
                    :color="snackbarSuccess ? 'green' : 'red'"
                    v-model="snackbar">
                {{snackbarMessage}}
            </v-snackbar>
            <v-container grid-list-xl text-xs-center>
                <v-layout row wrap>
                    <template v-if="sensors.length > 0">
                        <v-flex :key="index"
                                md2
                                v-for="(sensor, index) in sensors"
                                xs6>
                            <single-temperature :key="sensor.id"
                                                :sensor="sensor"
                                                @click="onTemperatureClick(sensor)"/>
                        </v-flex>
                    </template>
                    <v-flex v-else
                            xs12>
                        <p class="text-xs-center">
                            Nie dodano żadnych czujników
                        </p>
                    </v-flex>
                </v-layout>
                <sensor-settings-bottom-popup @deleteclicked="onSensorDeleteClick"
                                              @editclicked="onSensorEditClick"
                                              @historyclicked="onSensorHistoryClick"
                                              v-model="bottomSheet"/>
                <date-picker-dialog @hide="datePickerDialog = false"
                                    @showhistory="onHistoryDatePicked"
                                    v-if="datePickerDialog"/>
            </v-container>
        </v-content>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import SingleTemperature from "../../components/SingleTemperature";
    import SensorSettingsBottomPopup from "../../components/SensorSettingsBottomPopup";
    import {SENSOR_INITIALIZATION_VIEW, SENSOR_SETTINGS_VIEW, TEMPERATURE_HISTORY} from "../../router/routeNames";
    import SensorService from "../../services/temperature/sensor/SensorService";
    import DatePickerDialog from "../../components/DatePickerDialog";

    export default {
        name: "TemperaturesView",

        components: {DatePickerDialog, SensorSettingsBottomPopup, SingleTemperature},

        data: () => ({
            selectedSensor: null,

            snackbar: false,
            snackbarMessage: '',
            snackbarSuccess: true,
            progress: false,
            bottomSheet: false,

            datePickerDialog: false
        }),

        computed: {
            ...mapState({
                stateSensors: state => state.temperature.sensors
            }),

            sensors() {
                return this.stateSensors.filter(sensor => sensor.initialized)
            }
        },

        methods: {
            onSensorEditClick() {
                let me = this
                this.bottomSheet = false

                setTimeout(() => {
                    this.$router.push({
                        name: SENSOR_SETTINGS_VIEW,
                        params: {
                            id: me.selectedSensor.id
                        }
                    })
                }, 200)
            },

            onSensorDeleteClick() {
                this.progress = true
                SensorService.reset(this.selectedSensor.id)
                    .catch(() => this.showSnackbar(false, 'Wystąpił błąd przy usuwaniu'))
                    .finally(() => {
                        this.progress = false
                        this.bottomSheet = false
                    })
            },

            onSensorHistoryClick() {
                this.datePickerDialog = true
                this.bottomSheet = false
            },

            onHistoryDatePicked(date) {
                this.$router.push({
                    name: TEMPERATURE_HISTORY,
                    params: {
                        id: this.selectedSensor.id,
                        date
                    }
                })
            },

            openInitializationView() {
                this.$router.push({
                    name: SENSOR_INITIALIZATION_VIEW
                })
            },

            onTemperatureClick(sensor) {
                this.selectedSensor = sensor;
                this.bottomSheet = true
            },

            showSnackbar(success, message) {
                this.snackbarMessage = message
                this.snackbarSuccess = success
                this.snackbar = true
            }
        }
    }
</script>
