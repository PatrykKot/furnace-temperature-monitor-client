<template>
    <v-container>
        <v-btn absolute
               dark
               fab
               top
               right
               color="pink">
            <v-icon>save</v-icon>
        </v-btn>
        <v-form>
            <v-text-field
                    label="Nazwa czujnika"
                    v-model="sensorName"/>
            <v-text-field
                    label="Adres czujnika"
                    :value="this.sensor.uuid"
                    disabled/>
            <single-temperature
                    :temperature="temperature"/>
        </v-form>
    </v-container>
</template>

<script>
    import TemperatureService from "../../services/temperature/TemperatureService";
    import {VTextField} from "vuetify/es5/components/VTextField";
    import SingleTemperature from "../../components/SingleTemperature";

    export const SENSOR_SETTINGS_VIEW = "SensorSettingsView"

    export default {
        name: 'SensorSettingsView',
        components: {SingleTemperature, VTextField},
        props: ['uuid'],

        computed: {
            sensor() {
                let me = this
                return TemperatureService.getSensors().find(sensor => sensor.uuid == me.uuid)
            },
            temperature() {
                return this.$store.state.temperature.currentTemperatures
                    .find(temperature => temperature.sensor.uuid == this.uuid)

            }
        },

        data() {
            return ({
                sensorName: ''
            })
        },

        created() {
            this.sensorName = (' ' + this.sensor.name).slice(1)
        }
    }
</script>
