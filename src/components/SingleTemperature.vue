<template>
    <v-card @click.native="() => $emit('click')">
        <v-card-title class="title">{{temperature.sensor.name}}</v-card-title>
        <v-card-text class="display-2">
            <animate-number
                    ref="numberAnimator"
                    :from="temperature.value"
                    :to="temperature.value"
                    :from-color="getColorForTemperature(temperature.value)"
                    :to-color="getColorForTemperature(temperature.value)"
                    duration="900"
                    easing="easeInOutSine"
                    mode="manual"/>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: 'SingleTemperature',
        props: ['temperature'],

        watch: {
            temperature(currentTemperature, previousTemperature) {
                let previous = previousTemperature.value
                let current = currentTemperature.value

                this.$refs.numberAnimator.reset(previous, current,
                    this.getColorForTemperature(previous), this.getColorForTemperature(current))
                this.$refs.numberAnimator.start()
            }
        },

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
