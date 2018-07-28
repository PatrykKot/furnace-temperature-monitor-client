<template>
  <v-toolbar
    fixed
    app
    class="blue"
    dark
    color="primary">
    <v-toolbar-side-icon @click="showDrawer"/>
    <v-toolbar-title class="white--text">{{title}}</v-toolbar-title>
  </v-toolbar>
</template>

<script>
    import {TEMPERATURES_VIEW} from '../view/routes/TemperaturesView'
    import {SETTINGS_VIEW} from '../view/routes/SettingsView'
    import {TOGGLE_DRAWER} from "../store/modules/navigator/NavigatorStateModule";
    import {SENSOR_SETTINGS_VIEW} from '../view/routes/SensorSettingsView'

    export default {
    name: "Toolbar",

    computed: {
      title() {
        switch (this.$route.name) {
          case TEMPERATURES_VIEW:
            return 'Pomiary'
          case SETTINGS_VIEW:
            return 'Ustawienia'
            case SENSOR_SETTINGS_VIEW:
                return 'Ustawienia czujnika'
        }
      }
    },

    methods: {
      showDrawer() {
        this.$store.commit(TOGGLE_DRAWER, {
          show: true
        })
      }
    }
  }
</script>
