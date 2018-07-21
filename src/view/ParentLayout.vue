<template>
  <v-app light>
    <navigation-drawer/>
    <toolbar/>
    <main-layout/>
  </v-app>
</template>

<script>
  import NavigationDrawer from "./NavigationDrawer";
  import Toolbar from "./Toolbar";
  import MainLayout from "./MainLayout";

  export default {
    name: "ParentLayout",
    components: {MainLayout, Toolbar, NavigationDrawer}
  }
</script>
