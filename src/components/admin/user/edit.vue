<template>
    <v-layout column justify-center v-if="form">
        <v-flex>
            <h1 class="display-1 pb-3">เพิ่มผู้ใช้</h1>

            <v-card class="mb-3">
                <v-card-title>
                    <h2 class="title">ข้อมูลทั่วไป</h2>
                </v-card-title>
                <v-card-text>
                    <v-text-field label="ชื่อ-นามสกุล" v-model="form.name"
                                  :error-messages="error.errors.name"/>
                    <v-text-field label="ชื่อผู้ใช้" v-model="form.username"
                                  :error-messages="error.errors.username"/>
                    <v-text-field label="อีเมล์" v-model="form.email"
                                  :error-messages="error.errors.email"/>
                    <v-text-field label="รหัสผ่าน" v-model="form.password" type="password"
                                  :error-messages="error.errors.password"/>
                    <v-text-field label="ยืนยันรหัสผ่าน" v-model="form.password_confirmation" type="password"/>
                </v-card-text>
            </v-card>
            <v-card class="mb-3">
                <v-card-title>
                    <h2 class="title">สิทธิ์การใช้งาน</h2>
                </v-card-title>
                <v-card-text>
                    <role-checkbox
                            v-bind:value="form.roles"
                            @change="updateRoles"
                    ></role-checkbox>
                </v-card-text>
            </v-card>

            <v-btn @click="save()" color="primary">Submit</v-btn>
            <v-btn @click="$router.go(-1)">Cancel</v-btn>

        </v-flex>
    </v-layout>
</template>

<script>
    import RoleCheckbox from "../role/roleCheckbox";
    import {mapGetters, mapActions, mapState} from 'vuex'
    import Base from '../../Base'

    export default {
        extends: Base,
        components: {
            RoleCheckbox
        },
        data: () => ({
            form: null,
        }),

        computed: {
            ...mapGetters({}),
            ...mapState(({}))
        },
        methods: {
            updateRoles: function ($event) {
                let roles = this.form.roles
                let i = roles.indexOf($event)
                if (i == -1) {
                    roles.push($event)
                } else {
                    roles.splice(i, 1);
                }
            },
            save: async function () {
                let user = await this.$store.dispatch('users/updateUser', this.form)
                if (user) {
                    this.$router.push({name: 'user-home'})
                }
            }, load: async function () {
                let user = await this.$store.dispatch('users/getById',this.$route.params.id)
                this.form = user
            }
        },
        created() {
            this.load();
        },
        mounted() {
            console.log('Example Component mounted.')
        }
    }
</script>