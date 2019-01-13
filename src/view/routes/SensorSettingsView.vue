<template>
    <div>
        <v-toolbar color="primary"
                   dark
                   extended
                   extension-height="7">
            <v-toolbar-title>
                Konfiguracja czujnika
            </v-toolbar-title>
            <v-progress-linear :indeterminate="true"
                               class="ma-0"
                               color="white"
                               slot="extension"
                               v-if="progress"/>
        </v-toolbar>
        <v-content>
            <v-container>
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
                            v-model="name"/>
                    <v-text-field
                            :value="address"
                            disabled
                            label="Adres czujnika"/>
                    <v-text-field
                            :value="added"
                            disabled
                            label="Pierwsze podłączenie"/>
                    <v-checkbox
                            label="Alarm"
                            v-model="enableAlarm"/>
                    <v-text-field
                            label="Wartość alarmu"
                            type="number"
                            v-if="enableAlarm"
                            v-model="alarmValue"/>
                    <v-btn @click="resetSensor"
                           block
                           color="error">
                        Usuń
                    </v-btn>
                </v-form>
            </v-container>
        </v-content>
    </div>
</template>

<script>
    import {VTextField} from "vuetify/es5/components/VTextField";
    import SingleTemperature from "../../components/SingleTemperature";
    import SensorService from "../../services/temperature/sensor/SensorService";
    import {formatAddedDate} from "../../utils/dateFormat";


    export default {
        name: 'SensorSettingsView',
        components: {SingleTemperature, VTextField},
        props: ['id'],

        data: () => ({
            address: '',
            name: '',
            enableAlarm: false,
            alarmValue: 0,
            added: '',

            snackbar: false,
            snackbarMessage: '',
            snackbarSuccess: true,
            progress: false
        }),

        created() {
            this.reloadSensor()
        },

        methods: {
            reloadSensor() {
                SensorService.get(this.id)
                    .then(sensor => {
                        this.name = sensor.name
                        this.address = sensor.address
                        this.enableAlarm = !!sensor.alarmValue
                        this.alarmValue = sensor.alarmValue
                        this.added = formatAddedDate(sensor.added)
                    })
            },

            onSaveClicked() {
                this.progress = true
                SensorService.update({
                    id: this.id,
                    name: this.name,
                    alarmValue: this.enableAlarm ? this.alarmValue : null
                })
                    .then(() => this.showSnackbar(true, 'Konfiguracja została zapisana'))
                    .catch(() => this.showSnackbar(false, 'Wystąpił błąd przy zapisywaniu'))
                    .finally(() => {
                        this.progress = false
                        this.reloadSensor()
                    })
            },

            resetSensor() {
                this.progress = true
                SensorService.reset(this.id)
                    .then(() => this.$router.back())
                    .catch(() => this.showSnackbar(false, 'Wystąpił błąd przy usuwaniu'))
                    .finally(() => this.progress = false)
            },

            showSnackbar(success, message) {
                this.snackbarMessage = message
                this.snackbarSuccess = success
                this.snackbar = true
            }
        }
    }
</script>
