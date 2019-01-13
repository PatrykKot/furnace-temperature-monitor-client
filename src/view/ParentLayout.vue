<template>
    <v-app light>
        <div class="content-overflow">
            <router-view/>
        </div>
    </v-app>
</template>

<script>
    export default {
        name: "ParentLayout",
    }
</script>

<style scoped>
    .content-overflow {
        overflow: auto;
        max-height: 100%;
    }
</style>