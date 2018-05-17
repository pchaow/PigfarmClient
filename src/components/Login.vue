<template>
    <v-app id="inspire">
        <loading :active.sync="spinnerVisible"></loading>

        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-flex xs-12 pb-3>
                            <v-alert type="error" :value="error.message">
                                {{error.message}}
                            </v-alert>
                        </v-flex>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Login form</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <v-form @keyup.native.enter="login()" v-on:submit.default="login()">
                                    <v-text-field
                                            :error-messages="error.errors.email"
                                            v-model="form.email" prepend-icon="person" name="login" label="Login"
                                            type="text"></v-text-field>
                                    <v-text-field v-model="form.password" prepend-icon="lock" name="password"
                                                  label="Password" id="password" type="password"></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click="login()" color="primary">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import Base from './Base';

    export default {
        name: "Login",
        extends: Base,
        components: {
            Loading,
        },
        data() {
            return {
                form: {
                    email: "",
                    password: "",
                },
                source: "null",

            }
        },
        computed: {
        }
        ,
        methods: {
            login: async function () {

                axios.defaults.headers.common['Authorization'] = null;

                let user = await this.$store.dispatch('login/login', this.form);
                if (user != null) {
                    let roles = user.roles;
                    if (roles != null) {
                        this.$router.push(roles[0].name)
                    } else {
                        this.$router.push("/home")
                    }
                }
            }
        }
        ,
        mounted() {
            console.log('Login Component mounted.');
            localStorage.user = null;
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
