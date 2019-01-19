<template>
    <div>
        <v-toolbar color="primary"
                   dark
                   extended
                   extension-height="7">
            <v-toolbar-title>
                Dodawanie czujników
            </v-toolbar-title>
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
            <v-card>
                <v-list :subheader="noSensors"
                        two-line>
                    <v-subheader class="text-xs-center"
                                 v-if="noSensors">
                        Nie znaleziono nowych czujników
                    </v-subheader>
                    <v-list-tile
                            :key="sensor.id"
                            v-for="sensor in sensors">
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ sensor.name }}
                            </v-list-tile-title>
                            <v-list-tile-sub-title>
                                {{ formatDate(sensor.added) }}
                            </v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-btn @click="initializeSensor(sensor)"
                                   icon
                                   ripple>
                                <v-icon>
                                    add
                                </v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-card>
        </v-content>
    </div>
</template>

<script>
    import SensorService from "../../services/temperature/sensor/SensorService";
    import {clearArray} from "../../utils/arrayUtil";
    import {formatAddedDate} from "../../utils/dateFormat";

    export default {
        name: "SensorInitializationView",

        data: () => ({
            sensors: [],

            snackbar: false,
            snackbarMessage: '',
            snackbarSuccess: true,
            progress: false
        }),

        computed: {
            noSensors() {
                return this.sensors.length == 0 && this.progress == false
            }
        },

        created() {
            this.reloadSensors()
        },

        methods: {
            initializeSensor(sensor) {
                if (!this.progress) {
                    SensorService.initialize(sensor.id)
                        .then(() => this.showSnackbar(true, 'Czujnik został dodany'))
                        .catch(() => this.showSnackbar(false, 'Wystąpił błąd podczas dodawania czujnika'))
                        .finally(() => this.reloadSensors())
                }
            },

            reloadSensors() {
                this.progress = true
                SensorService.getAll()
                    .then(sensors => {
                        clearArray(this.sensors);
                        sensors
                            .filter(sensor => !sensor.initialized)
                            .forEach(sensor => this.sensors.push(sensor))
                    })
                    .finally(() => this.progress = false)
            },

            showSnackbar(success, message) {
                this.snackbarMessage = message
                this.snackbarSuccess = success
                this.snackbar = true
            },

            formatDate(date) {
                return formatAddedDate(date)
            }
        }
    }
</script>