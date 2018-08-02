<template>
    <v-container>
        <v-snackbar
                v-model="snackbar"
                :color="snackbarSuccess ? 'green' : 'red'">
            {{snackbarMessage}}
        </v-snackbar>
        <v-btn
                absolute dark fab top right color="pink"
                @click="onSaveClicked">
            <v-icon>save</v-icon>
        </v-btn>
        <v-form>
            <v-text-field
                    label="Nazwa czujnika"
                    v-model="sensorName"/>
            <v-text-field
                    label="Adres czujnika"
                    :value="sensor.uuid"
                    disabled/>
            <v-checkbox
                    label="Alarm"
                    v-model="enableAlarm"/>
            <v-text-field
                    v-if="enableAlarm"
                    label="Wartość alarmu"
                    type="number"
                    v-model="alarm"/>
            <single-temperature :sensor="sensor"/>
        </v-form>
    </v-container>
</template>

<script>
    import {VTextField} from "vuetify/es5/components/VTextField";
    import SingleTemperature from "../../components/SingleTemperature";
    import SensorService from '../../services/temperature/SensorService'

    export const SENSOR_SETTINGS_VIEW = "SensorSettingsView"

    export default {
        name: 'SensorSettingsView',
        components: {SingleTemperature, VTextField},
        props: ['uuid'],

        computed: {
            sensor() {
                let me = this
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
                let me = this
                SensorService.updateSensor({
                    uuid: me.uuid,
                    sensorSettings: {
                        name: me.sensorName,
                        alarm: me.enableAlarm ? Number(me.alarm) : null
                    }
                })

                this.showSnackbar(true, 'Konfiguracja została zapisana')
            },

            showSnackbar(success, message) {
                this.snackbarMessage = message
                this.snackbarSuccess = success
                this.snackbar = true
            }
        }
    }
</script>
