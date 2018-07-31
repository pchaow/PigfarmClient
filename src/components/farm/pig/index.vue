<template>
    <v-layout column justify-center v-if="pigs">
        <v-flex>
            <h1 class="display-1 pb-3">ค้นหาสุกร</h1>


            <v-layout row class="pb-3">
                <v-flex md6>
                    <v-btn :to="{name:'pig-add'}" class="primary"><v-icon>mdi-plus-circle</v-icon>&nbsp;เพิ่มสุกร</v-btn>
                      <v-btn :to="{ name: 'pig-gen'}" @click="qrPass()" class="yellow"><v-icon>mdi-qrcode-scan</v-icon>&nbsp; สร้าง qr code</v-btn>
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
                        :disable-initial-sort="true"
                        :headers="headers"
                        :items="pigs"
                        hide-actions>

                    <template slot="items" slot-scope="props">
                        <td> <v-checkbox :label="asd" :value="props.item.pig_id" v-model="pigAdd"></v-checkbox></td>
                        <td>{{props.item.pig_id}}</td>
                        <td>{{props.item.pig_number}}</td>
                        <td>{{props.item.birth_date}}</td>
                        <td>{{props.item.entry_date}}</td>
                        <td>{{props.item.source}}</td>
                        <td>{{props.item.created_at}}</td>

                        <td>
                            <v-btn icon class="mx-0" :to="{ name: 'pig-view', params: { id: props.item.id }}">
                                <v-icon color="primary">mdi-eye</v-icon>
                            </v-btn>

                            <v-btn icon class="mx-0" :to="{ name: 'pig-edit', params: { id: props.item.id }}">
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
        data: () => ({
          asd:'',
               pigAdd:[],
        }),
        computed: {
            ...mapGetters({}),
            ...mapState(({
                pigs: state => state.pigs.pigs,
                form: state => state.pigs.form,
                headers: state => state.pigs.headers,
                paginate: state => state.pigs.paginate,
            }))
        },
        methods: {
            qrPass(){
                    this.$store.dispatch('cycles/qrPass', this.pigAdd);


            },
            changePage: function (page) {
                this.form.page = page
                this.load();
            },
            search: function () {
                this.form.page = 1;
                this.load();
            },
            load: function () {
                this.$store.dispatch('pigs/getPaginate', this.form)
            },
            destroy: async function (pig) {
                if(confirm("Delete pig : " +  pig.pig_id)){
                    let result = await this.$store.dispatch('pigs/destroy', pig.id);
                    this.load();
                }
            }
        },
        mounted() {
            console.log('Role Home Component mounted.');
            this.load();
            this.$store.dispatch('pigs/resetForm');
        }
    }
</script>
