<template>
  <v-toolbar
    fixed
    app
    class="blue"
    dark
    color="primary">
    <v-toolbar-side-icon @click="drawerToggleClicked"/>
    <span>{{title}}</span>
  </v-toolbar>
</template>

<script>
  import {TOGGLE_DRAWER} from "../store/modules/navigator/NavigatorMutations";
  import {TEMPERATURES_VIEW} from '../view/routes/TemperaturesView'
  import {SETTINGS_VIEW} from '../view/routes/SettingsView'

  export default {
    name: "Toolbar",

    computed: {
      title() {
        debugger

        switch (this.$route.name) {
          case TEMPERATURES_VIEW:
            return 'Pomiary'
          case SETTINGS_VIEW:
            return 'Ustawienia'
        }
      }
    },

    methods: {
      drawerToggleClicked() {
        this.$store.commit(TOGGLE_DRAWER)
      }
    }
  }
</script>
