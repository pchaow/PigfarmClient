<template>
    <v-app id="inspire">
        <loading :active.sync="spinnerVisible"></loading>
        <navbar/>
        <menus/>

        <v-content>
            <v-container fluid>
                <router-view/>
            </v-container>

        </v-content>
        <v-footer color="indigo" app>
            <span class="white--text">&copy; 2017</span>
        </v-footer>
    </v-app>
</template>

<script>
    import Base from "@/components/Base"
    import Navbar from "./Navbars"
    import Menus from "./Menus"

    export default {
        name: "admin-home",
        extends : Base,
        components : {
            Navbar,Menus
        }
    }
</script>

<style scoped>

</style>