<template>
  <v-toolbar
    fixed
    app
    class="blue"
    dark
    color="primary">
    <v-toolbar-side-icon @click="showDrawer"/>
    <span>{{title}}</span>
  </v-toolbar>
</template>

<script>
  import {TEMPERATURES_VIEW} from '../view/routes/TemperaturesView'
  import {SETTINGS_VIEW} from '../view/routes/SettingsView'
  import {TOGGLE_DRAWER} from "../store/modules/navigator/NavigatorStateModule";

  export default {
    name: "Toolbar",

    computed: {
      title() {
        switch (this.$route.name) {
          case TEMPERATURES_VIEW:
            return 'Pomiary'
          case SETTINGS_VIEW:
            return 'Ustawienia'
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
