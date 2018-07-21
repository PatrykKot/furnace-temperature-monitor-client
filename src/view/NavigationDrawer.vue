<template>
  <v-navigation-drawer
    enable-resize-watcher
    app
    @input="drawerToggled"
    :value="drawer">
    <v-list>
      <v-list-tile
        v-for="(item, index) in items"
        :key="index"
        @click="navigateTo(item)">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import {TOGGLE_DRAWER} from "../store/modules/navigator/NavigatorMutations";

  export default {
    name: "NavigationDrawer",

    data() {
      return {
        items: [{
          title: 'Pomiary',
          icon: 'done',
          route: '/'
        }, {
          title: 'Ustawienia',
          icon: 'settings',
          route: '/settings'
        }]
      }
    },

    created() {
      if (this.isWindowLarge()) {
        this.toggleDrawer()
      }
    },

    computed: {
      drawer() {
        return this.$store.state.navigator.showDrawer
      },
    },

    methods: {
      drawerToggled(value) {
        if (value != this.$store.state.navigator.showDrawer) {
          this.toggleDrawer()
        }
      },

      navigateTo(item) {
        this.$router.push(item.route)
        if (!this.isWindowLarge()) {
          this.toggleDrawer()
        }
      },

      isWindowLarge() {
        return window.innerWidth > 1000
      },

      toggleDrawer() {
        this.$store.commit(TOGGLE_DRAWER)
      }
    }
  }
</script>
