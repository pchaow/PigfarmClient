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
                                <v-form v-on:submit.default="login()">
                                    <v-text-field
                                            :index-messages="error.errors.email"
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
    import {mapState, mapGetters, mapActions} from 'vuex'
    import Loading from 'vue-loading-overlay';

    export default {
        name: "Login",
        components: {
            Loading,
        },
        data() {
            return {
                form: {
                    email: "",
                    password: "",
                },
                spinnerVisible: false,
                source: "null",

            }
        },
        computed: mapGetters({
            error : 'getError'
        }),
        methods: {
            showSpinner() {
                console.log('show spinner');
                this.spinnerVisible = true;
            },
            hideSpinner() {
                console.log('hide spinner');
                this.spinnerVisible = false;
            },
            login: function () {
                this.showSpinner();
                axios.defaults.headers.common['Authorization'] = null;

                console.log(this.form.email);


                axios.post("/api/auth/login", {
                    email: this.form.email,
                    password: this.form.password,
                })
                    .then((response) => {
                        console.log(response.data)
                        localStorage.user = JSON.stringify(response.data)
                        localStorage.accessToken = response.data.accessToken

                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.accessToken;

                        this.$router.push("/home")
                        this.hideSpinner();

                    })
                    .catch((error) => {
                        console.log(error.response.data)
                        this.hideSpinner();

                        this.$store.commit('setError',error.response.data)

                    })
            }
        },
        mounted() {
            console.log('Login Component mounted.')
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
