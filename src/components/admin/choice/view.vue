<template>
    <div v-if="form">
        <v-layout column justify-center>
            <v-flex>
                <h1 class="display-1 pb-3">รายละเอียดตัวเลือก</h1>

                <v-card pb-3 mb-3>
                    <v-card-title class="title">ชื่อตัวเลือก (Unique) : {{ form.name }}</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>

                        <v-layout row mb-3>
                            <v-flex md3 class="title">ชื่อแสดง</v-flex>
                            <v-flex>{{form.display_name}}</v-flex>
                        </v-layout>
                        <v-layout row mb-3>
                            <v-flex md3 class="title">รายละเอียด</v-flex>
                            <v-flex>{{form.description}}</v-flex>
                        </v-layout>

                    </v-card-text>
                </v-card>


                <h1 class="headline pt-3 pb-3">รายการตัวเลือกย่อย</h1>

                <v-layout row class="pb-3">
                    <v-flex md6>
                        <v-btn :to="{ name: 'choice-children-add',params : {id :form.id}}" class="primary">
                            เพิ่มตัวเลือกย่อย
                        </v-btn>
                    </v-flex>

                </v-layout>

                <v-card mb-3>
                    <v-data-table
                            :headers="headers"
                            :items="form.children"
                            hide-actions>

                        <template slot="items" slot-scope="props">

                            <td>{{props.item.name}}</td>
                            <td>{{props.item.display_name}}</td>
                            <td>{{props.item.description}}</td>

                            <template v-for="(value,key) in form.children_fields">
                                <td v-if="value.showInTable">
                                    <template
                                            v-if="props.item.values && props.item.values[key] && props.item.values.hasOwnProperty(key) && value.type=='ref'">
                                        {{props.item.values[key].display_name}}
                                    </template>
                                    <template v-else>
                                        <template v-if="props.item.values && props.item.values.hasOwnProperty(key)">
                                            {{props.item.values[key]}}
                                        </template>
                                    </template>
                                </td>
                            </template>

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
                </v-card>
            </v-flex>
        </v-layout>
    </div>

</template>

<script>

    import _ from 'lodash'
    import {mapGetters, mapActions, mapState} from 'vuex'
    import Base from '@/components/Base'

    export default {
        extends: Base,
        data: () => ({
            form: null,
            headers: {}
        }),
        computed: {
            ...mapGetters({
                masterHeaders: 'choices/getHeaders'

            }),
            ...mapState({})
        },
        watch: {
            '$route'(to, from) {
                // Whatever you need to change route
                this.load();
            }
        },
        methods: {
            syncHeader: function () {
                console.log(this.form.children_fields);
                for (var key in this.form.children_fields) {
                    let x = this.form.children_fields[key]
                    if (x.showInTable){
                        let y = this.headers.length;
                        this.headers.splice(y-1,0,{text: x.display_name, value: key})
                    }
                }
            },
            load: async function () {
                let result = await this.$store.dispatch('choices/getById', this.$route.params.id);
                if (result) {
                    console.log(result);
                    this.form = result;
                    this.parent = this.form.parent;
                    this.syncHeader();
                }
            },
            destroy: async function (item) {
                if (confirm("Do you want to delete this choice?")) {
                    let result = await this.$store.dispatch('choices/destroy', item.id);
                    if (result) {
                        this.load();
                    }
                }
            }
        },
        created() {
            this.headers = _.cloneDeep(this.masterHeaders)
        },
        mounted() {
            this.load();
        }
    }
</script>