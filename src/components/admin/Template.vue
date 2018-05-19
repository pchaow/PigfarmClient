<template>
    <v-app id="inspire">
        <loading :active.sync="spinnerVisible"></loading>
        <v-snackbar
                :timeout="6000"
                :color="'error'"
                :multi-line="true"
                :vertical="true"
                v-model="showError">
            {{ error.message }}
            <v-btn dark flat @click.native="$store.dispatch('error/toggleError',false)">Close</v-btn>
        </v-snackbar>
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
        name: "admin-template",
        extends : Base,
        components : {
            Navbar,Menus
        }
    }
</script>

<style scoped>

</style>