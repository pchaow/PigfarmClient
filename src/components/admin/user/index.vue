<template>
    <v-layout column justify-center v-if="users">
        <v-flex>
            <h1 class="display-1 pb-3">การจัดการผู้ใช้</h1>


            <v-layout row class="pb-3">
                <v-flex md6>
                    <v-btn :to="{name:'user-add'}" class="primary">เพิ่มผู้ใช้</v-btn>
                </v-flex>
                <v-flex md6>
                    <v-form v-on:submit.default="search()">
                        <v-text-field
                                append-icon="search"
                                label="ค้นหา"
                                single-line
                                hide-details
                                v-model="form.keyword"
                        ></v-text-field>
                    </v-form>
                </v-flex>
            </v-layout>

            <v-card>
                <v-data-table
                        :headers="headers"
                        :items="users"
                        hide-actions>

                    <template slot="items" slot-scope="props">

                        <td>{{props.item.name}}</td>
                        <td>{{props.item.username}}</td>
                        <td>{{props.item.email}}</td>
                        <td>
                            <template v-for="role in props.item.roles">
                                {{role.name}}
                            </template>
                        </td>
                        <td>

                            <v-btn icon class="mx-0" :to="{ name: 'user-edit', params: { id: props.item.id }}">
                                <v-icon color="teal">edit</v-icon>
                            </v-btn>
                            <v-btn icon class="mx-0" v-on:click="destroy(props.item)">
                                <v-icon color="pink">delete</v-icon>
                            </v-btn>
                        </td>
                    </template>

                    <template slot="no-data">
                        <v-alert :value="true" color="error" icon="warning">
                            Sorry, nothing to display here :(
                        </v-alert>
                    </template>

                </v-data-table>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-pagination @input="changePage" :length="paginate.last_page" v-model="form.page"></v-pagination>

                </v-card-actions>
            </v-card>

        </v-flex>
    </v-layout>

</template>

<script>

    import {mapGetters, mapActions, mapState} from 'vuex'
    import Base from '@/components/Base'


    export default {
        extends: Base,
        data: () => ({}),
        computed: {
            ...mapGetters({}),
            ...mapState(({
                users: state => state.users.users,
                form: state => state.users.form,
                headers: state => state.users.headers,
                paginate: state => state.users.paginate,
            }))
        },
        methods: {
            changePage: function (page) {
                this.form.page = page
                this.load();
            },
            search: function () {
                this.form.page = 1;
                this.load();
            },
            load: function () {
                this.$store.dispatch('users/getPaginate', this.form)
            },
            destroy: async function (user) {
                if(confirm("Delete user : " +  user.id)){
                    let result = await this.$store.dispatch('users/destroyById', user.id);
                    this.load();
                }
            }
        },
        mounted() {
            console.log('Role Home Component mounted.')
            this.load()
        }
    }
</script>