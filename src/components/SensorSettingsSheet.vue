<template>
    <v-bottom-sheet v-model="bottomSheet">
        <v-list>
            <v-list-tile>
                <v-list-tile-title @click="() => $emit('onEditClicked')">
                    Edytuj czujnik
                </v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-bottom-sheet>
</template>

<script>
    export default {
        name: "SensorSettingsSheet",

        props: ['value'],

        data() {
            return ({
                bottomSheet: false
            })
        },

        watch: {
            bottomSheet(value) {
                this.$emit('input', value)
            },

            value(val) {
                this.bottomSheet = val
            }
        }
    }
</script>
