<template>
    <v-layout column justify-center>
        <v-flex>
            <h1 class="display-1 pb-3">ตั้งค่าเป้าหมาย</h1>
            <v-layout row class="pb-3">

                <v-flex offset-md6 md6>
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

            <v-card v-if="paginate">
                <v-data-table style="font-size: larger;"
                              :headers="headers"
                              :items="reportGoals"
                              hide-actions>

                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.report_type }}</td>
                        <td>{{ props.item.report_date}}</td>
                        <td class="layout px-0">
                            <v-btn icon class="mx-0">
                                <v-icon color="teal">edit</v-icon>
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

    import {get, sync, call,dispatch} from 'vuex-pathify'
    import Base from '@/components/Base'

    export default {
        extends: Base,
        data: () => ({}),
        computed: {
            ...sync('goals/*')
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
                dispatch('goals/getPaginate',this.form)

            }
        },
        mounted() {

            this.load();

        }
    }
</script>