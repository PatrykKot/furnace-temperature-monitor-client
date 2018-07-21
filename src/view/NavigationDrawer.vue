<template>
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
</template>

<script>
  import {TOGGLE_DRAWER} from "../store/modules/navigator/NavigatorStateModule";

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

    methods: {
      navigateTo(item) {
        this.$router.push(item.route)
        this.hideDrawer()
      },

      hideDrawer() {
        this.$store.commit(TOGGLE_DRAWER, {
          show: false
        })
      }
    }
  }
</script>
