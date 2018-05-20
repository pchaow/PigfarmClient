<template>
    <div>
        <v-layout column justify-center>
            <v-flex>
                <h1 class="display-1 pb-3">การจัดการตัวเลือก</h1>
                <v-layout row class="pb-3">
                    <v-flex md6>
                        <v-btn :to="{name:'user-add'}" class="primary">เพิ่มตัวเลือก</v-btn>
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
                            :items="choices"
                            hide-actions>

                        <template slot="items" slot-scope="props">

                            <td>{{props.item.name}}</td>
                            <td>{{props.item.display_name}}</td>
                            <td>{{props.item.description}}</td>

                            <td>

                                <v-btn icon class="mx-0" :to="{ name: 'choice-view', params: { id: props.item.id }}">
                                    <v-icon color="primary">mdi-eye</v-icon>
                                </v-btn>

                                <v-btn icon class="mx-0" :to="{ name: 'choice-edit', params: { id: props.item.id }}">
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
                        <v-pagination @input="changePage" :length="paginate.last_page"
                                      v-model="form.page"></v-pagination>

                    </v-card-actions>
                </v-card>


            </v-flex>
        </v-layout>
    </div>

</template>

<script>

    import {mapGetters, mapActions, mapState} from 'vuex'
    import Base from '@/components/Base'

    export default {
        extends: Base,
        data: () => ({}),
        computed: {
            ...mapGetters({
            }),
            ...mapState({
                choices: state => state.choices.choices,
                form: state => state.choices.form,

                headers: state => state.choices.headers,
                paginate: state => state.choices.paginate,
            })
        },

        methods: {
            ...mapActions({}),
            changePage: function (page) {
                this.form.page = page;
                this.load();
            },
            load: async function () {
                let result = await this.$store.dispatch('choices/getPaginate', this.form);
            },
            search: async function () {
                let result = await this.$store.dispatch('choices/getPaginate', this.form);
            },
        },
        mounted() {
            this.$store.dispatch('choices/resetForm');
            this.load()
        }
    }
</script>