<template>
    <v-bottom-sheet v-model="bottomSheet">
        <v-list>
            <v-list-tile @click="$emit('historyclicked')">
                <v-list-tile-avatar>
                    <v-icon>history</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>
                    Pokaż historię
                </v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="$emit('editclicked')">
                <v-list-tile-avatar>
                    <v-icon>settings</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>
                    Edytuj czujnik
                </v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="$emit('deleteclicked')">
                <v-list-tile-avatar>
                    <v-icon>delete</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>
                    Usuń czujnik
                </v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-bottom-sheet>
</template>

<script>
    export default {
        name: "SensorSettingsBottomPopup",

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
