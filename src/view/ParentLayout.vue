<template>
  <v-app light>
    <vue-drawer-layout
            ref="drawer"
            :backdrop-opacity-range="[0.0,0.1]"
            @mask-click="toggleDrawer(false)"
            @slide-end="handleSlideEnd">
      <div slot="drawer" class="drawer">
        <navigation-drawer/>
      </div>
      <div slot="content" class="content-overflow">
        <toolbar/>
        <main-layout/>
      </div>
    </vue-drawer-layout>
  </v-app>
</template>

<script>
    import NavigationDrawer from "./NavigationDrawer";
    import Toolbar from "./Toolbar";
    import MainLayout from "./MainLayout";
    import {mapState} from 'vuex'
    import {TOGGLE_DRAWER} from "../store/modules/navigator/NavigatorStateModule";

    export default {
    name: "ParentLayout",
    components: {MainLayout, Toolbar, NavigationDrawer},

        computed: mapState({
            stateDrawer: state => state.navigator.showDrawer
        }),

    watch: {
      stateDrawer(value) {
        this.toggleDrawer(value)
      }
    },

    methods: {
      handleSlideEnd(show) {
        this.toggleDrawer(show)
      },

      toggleDrawer(show) {
        if (this.$refs.drawer.visible != show) {
          this.$refs.drawer.toggle(show)
        }

        this.$store.commit(TOGGLE_DRAWER, {show})
      }
    }
  }
</script>

<style scoped>
  .drawer {
    background-color: white;
    bottom: 0;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
  }

  .content-overflow {
    overflow: auto;
    max-height: 100%;
  }
</style>
