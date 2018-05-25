<template>
    <div v-if="isLoaded">
        <div v-if="form.parent_name" class="headline pb-3">เพิ่มตัวเลือกย่อย {{form.parent_name}}</div>
        <div v-else class="headline pb-3">เพิ่มตัวเลือก</div>

        <v-layout column justify-center>
            <v-flex>
                <v-card class="mb-3">
                    <v-card-title>
                        <h2 class="title">รายละเอียด</h2>
                    </v-card-title>
                    <v-card-text>

                        <v-text-field label="ชื่อตัวเลือก (Unique)" v-model="form.name"
                                      :error-messages="error.errors.name"/>

                        <v-text-field label="ชื่อแสดง" v-model="form.display_name"
                                      :error-messages="error.errors.display_name"/>

                        <v-text-field label="รายละเอียด" v-model="form.description"
                                      :error-messages="error.errors.description"/>


                        <template v-if="parent">
                            <template v-for="(value,key) in parent.children_fields">
                                <v-text-field :label="value.display_name" v-if="value.type == 'text'"
                                              v-model="form.values[key]" type="text"/>
                                <v-text-field :label="value.display_name" v-if="value.type == 'number'"
                                              v-model="form.values[key]" type="number"/>

                                <choice-select v-if="value.type == 'ref'" @change="updateField($event,key)"
                                               :type="value"
                                               :value="form.values[key]"></choice-select>
                            </template>
                        </template>
                    </v-card-text>
                </v-card>
                <v-card class="mb-3">
                    <v-card-title>
                        <h2 class="title">ข้อมูลเพิ่มเติมตัวเลือกลูก</h2>
                    </v-card-title>
                    <v-card-text>
                        <div class="">
                            <table class="table table-striped">
                                <thead>
                                <tr>
                                    <th>Key</th>
                                    <th>Display Name</th>
                                    <th>Type</th>
                                    <th>To</th>
                                    <th>Show in Table</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(value,key) in form.children_fields">
                                    <td>{{key}}</td>
                                    <td>{{value.display_name}}</td>
                                    <td>{{value.type}}</td>
                                    <td>{{value.to}}</td>
                                    <td>{{value.showInTable}}</td>
                                    <td>
                                        <div class="btn-group">
                                            <button type="button" @click="removeChildren(key)" class="btn btn-danger">
                                                ลบ
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <v-text-field v-model="children_forms.key" label="Key" type="text"/>
                                    </td>
                                    <td>
                                        <v-text-field v-model="children_forms.display_name" label="Display Name"
                                                      type="text"/>
                                    </td>
                                    <td>
                                        <v-select
                                                :items="['text','number','ref']"
                                                v-model="children_forms.type"
                                                label="Type"
                                                single-line
                                        ></v-select>
                                    </td>
                                    <td>

                                        <v-text-field :disabled="children_forms.type != 'ref'"
                                                      v-model="children_forms.to" type="text"/>
                                    </td>
                                    <td>
                                        <v-switch
                                                v-model="children_forms.showInTable"
                                        ></v-switch>
                                    </td>
                                    <td>
                                        <v-btn color="primary" type="button" @click="addChildrenFields">
                                            เพิ่ม
                                        </v-btn>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <v-divider/>

                    </v-card-text>
                </v-card>

                <v-btn @click="save()" color="primary">Submit</v-btn>
                <v-btn @click="$router.go(-1)">Cancel</v-btn>
            </v-flex>
        </v-layout>
    </div>

</template>

<script>

    import Vue from 'vue'
    import {mapGetters, mapActions, mapState} from 'vuex'
    import Base from '@/components/Base'

    export default {
        extends: Base,
        data: () => ({
            parent: null,
            form: null,
            isLoaded: false,
            children_forms: {
                type: 'text'
            },
        }),
        computed: {
            ...mapGetters({}),
            ...mapState({})
        },

        methods: {
            ...mapActions({}),
            removeChildren: function (key) {
                Vue.delete(this.form.children_fields, key)
                console.log(key);
                console.log(this.form.children_fields)
            },
            addChildrenFields: function () {

                if (this.form.children_fields.length == 0) {
                    this.form.children_fields = {};
                }

                let form = this.children_forms;
                this.form.children_fields[form.key] = {
                    display_name: form.display_name,
                    type: form.type,
                    to: form.to,
                    showInTable: form.showInTable,
                };

                this.children_forms = {
                    type: 'text'
                }
            },
            updateField: function ($event, key) {
                console.log($event, key);
                this.form.values[key] = $event;
            },
            load: async function () {
                let parent_id = this.$route.params.id;

                if (this.$route.params.id) {
                    let result = await this.$store.dispatch('choices/getById', this.$route.params.id);
                    this.parent = result;
                    this.form = {
                        parent_name: null,
                        children_fields: {},
                        children: [],
                        values: {},
                    };
                    this.form.parent_name = this.parent.name
                } else {
                    this.form = {
                        parent_name: null,
                        children_fields: {},
                        children: [],
                        values: {},
                    }

                }

                this.isLoaded = true;

            },
            save: async function () {
                let result = await this.$store.dispatch('choices/save', this.form);
                if (result) {
                    if (this.parent && this.parent.hasOwnProperty('id')) {
                        this.$router.push({name: "choice-view", params: {id: this.parent.id}})
                    } else {
                        this.$router.push({name: "choice-home"})
                    }
                }

            }
        },
        mounted() {
            this.$store.dispatch('choices/resetForm');
            this.load()
        }
    }
</script>