<template>
    <v-dialog :value="true"
              @input="onInput"
              full-width
              lazy
              persistent
              width="290px">
        <v-date-picker locale="pl"
                       scrollable
                       v-model="picker">
            <v-spacer/>
            <v-btn @click="$emit('hide')" color="primary"
                   flat>
                Zamknij
            </v-btn>
            <v-btn @click="$emit('showhistory', picker)" color="primary"
                   flat>
                Pokaż historię
            </v-btn>
        </v-date-picker>
    </v-dialog>
</template>

<script>
    import moment from 'moment'

    export default {
        name: "DatePickerDialog",

        data: () => ({
            picker: moment().format('YYYY-MM-DD')
        }),

        methods: {
            onInput(value) {
                if (value == false) {
                    this.$emit('hide')
                }
            }
        }
    }
</script>