<template>
    <v-card @click.native="() => $emit('click')">
        <v-card-title class="title">
            <span>{{sensor.name}}</span>
            <div v-if="sensor && sensor.alarm && sensor.value > sensor.alarm"
                 class="alarm-icon"/>
        </v-card-title>
        <v-card-text class="display-2">
            <animated-number
                    :number="{
            value: sensor.value,
            color: getColorForTemperature(sensor.value)
            }"/>
        </v-card-text>
    </v-card>
</template>

<script>
    import AnimatedNumber from "./AnimatedNumber";

    export default {
        name: 'SingleTemperature',
        components: {AnimatedNumber},
        props: ['sensor'],

        methods: {
            getColorForTemperature(value) {
                let blue = this.normalizeColor(-51 / 4 * value + 765)
                let red = this.normalizeColor(51 / 4 * value - 510)
                return this.rgbToHex(red, 0, blue)
            },

            normalizeColor(value) {
                if (value < 0) {
                    return 0
                }

                if (value > 255) {
                    return 255
                }

                return value
            },

            rgbToHex(red, green, blue) {
                let rgb = blue | (green << 8) | (red << 16);
                return '#' + (0x1000000 + rgb).toString(16).slice(1)
            }
        }
    }
</script>

<style scoped>
    .alarm-icon {
        background-image: url("../assets/icon/fire.png");
        margin: 0 5px;
        height: 20px;
        width: 20px;
        background-size: 100%;
    }
</style>