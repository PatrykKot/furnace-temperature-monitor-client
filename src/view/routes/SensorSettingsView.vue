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
            <v-snackbar
                    :color="snackbarSuccess ? 'green' : 'red'"
                    v-model="snackbar">
                {{snackbarMessage}}
            </v-snackbar>
            <v-btn
                    @click="onSaveClicked" absolute color="pink" dark fab right
                    top>
                <v-icon>save</v-icon>
            </v-btn>
            <v-form>
                <v-text-field
                        label="Nazwa czujnika"
                        v-model="sensorName"/>
                <v-text-field
                        :value="sensor.uuid"
                        disabled
                        label="Adres czujnika"/>
                <v-checkbox
                        label="Alarm"
                        v-model="enableAlarm"/>
                <v-text-field
                        label="Wartość alarmu"
                        type="number"
                        v-if="enableAlarm"
                        v-model="alarm"/>
                <single-temperature :sensor="sensor"/>
            </v-form>
        </v-content>
    </div>
</template>

<script>
    import {VTextField} from "vuetify/es5/components/VTextField";
    import SingleTemperature from "../../components/SingleTemperature";
    // import SensorService from '../../services/temperature/SensorService'

    export const SENSOR_SETTINGS_VIEW = "SensorSettingsView";

    export default {
        name: 'SensorSettingsView',
        components: {SingleTemperature, VTextField},
        props: ['uuid'],

        computed: {
            sensor() {
                let me = this;
                return this.$store.state.temperature.sensors.find(sensor => sensor.uuid == me.uuid)
            },

            temperature() {
                return this.$store.state.temperature.sensors
                    .find(sensor => sensor.uuid == this.uuid)

            }
        },

        data: () => ({
            sensorName: '',
            enableAlarm: false,
            alarm: 0,
            snackbar: false,
            snackbarMessage: '',
            snackbarSuccess: true
        }),

        created() {
            this.sensorName = (' ' + this.sensor.name).slice(1)
        },

        methods: {
            onSaveClicked() {
                let me = this;
                // SensorService.updateSensor({
                //     uuid: me.uuid,
                //     sensorSettings: {
                //         name: me.sensorName,
                //         alarm: me.enableAlarm ? Number(me.alarm) : null
                //     }
                // });

                this.showSnackbar(true, 'Konfiguracja została zapisana')
            },

            showSnackbar(success, message) {
                this.snackbarMessage = message;
                this.snackbarSuccess = success;
                this.snackbar = true
            }
        }
    }
</script>
