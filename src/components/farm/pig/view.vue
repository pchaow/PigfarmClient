<template>
    <v-layout column justify-center v-if="form">
        <v-flex>
            <h1 class="display-1 pb-3">ข้อมูลสุกร : {{form.pig_id}}</h1>

            <v-card class="mb-3">
                <v-card-text>
                    <h2 class="title">ข้อมูลทั่วไป</h2>
                    <v-container grid-list-md fluid>

                        <v-layout row wrap>
                            <v-flex>
                                <label>เบอร์แม่พันธุ์</label>
                                <div>{{form.pig_number}}</div>
                            </v-flex>
                            <v-flex>
                                <label>สายพันธุ์</label>
                                <div>{{form.blood_line.display_name}}</div>
                            </v-flex>
                            <v-flex>
                                <label>วันที่เข้าฟาร์ม</label>
                                <div>{{form.entry_date}}</div>
                            </v-flex>
                            <v-flex>
                                <label>แหล่งที่มา</label>
                                <div>{{form.source}}</div>
                            </v-flex>
                            <v-flex>
                                <label>พ่อพันธุ์</label>
                                <div>{{form.male_breeder_pig_id}}</div>
                            </v-flex>
                            <v-flex>
                                <label>แม่พันธุ์</label>
                                <div>{{form.female_breeder_pig_id}}</div>
                            </v-flex>
                            <v-flex>
                                <label>วันเกิด</label>
                                <div>{{form.birth_date}}</div>
                            </v-flex>
                            <v-flex>
                                <label>เต้านม</label>
                                <div>{{form.left_breast}}/{{form.right_breast}}</div>
                            </v-flex>
                        </v-layout>


                    </v-container>
                </v-card-text>
            </v-card>
        </v-flex>


        <v-flex>

            <v-btn color="success" @click="newPigBreed">เพิ่มรอบการผสมใหม่</v-btn>

            <v-dialog
                    ref="dialog"
                    v-model="dialog"
                    :return-value.sync="dialog_date"
                    persistent
                    lazy
                    full-width
                    width="290px"
            >
                <v-date-picker v-model="dialog_date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="saveDialog(dialog_date)">OK</v-btn>
                </v-date-picker>
            </v-dialog>
            <v-tabs v-if="form.pig_breeds.length > 0" v-model="active" color="primary" dark slider-color="yellow">
                <v-tab v-for="n in form.pig_breeds" :key="n.id" ripple>
                    รอบการผสมที่ {{n.id}}
                </v-tab>
                <v-tab-item v-for="n in form.pig_breeds" :key="n.id">
                    <v-card flat>
                        <v-card-text>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <div class="title pb-3">
                                        การผสมพันธุ์
                                    </div>
                                    <v-container fluid grid-list-md>
                                        <v-layout row wrap>
                                            <v-flex xs2>
                                                <v-text-field
                                                        slot="activator"
                                                        v-model="n.breed_date"
                                                        label="วันที่ผสม"
                                                        prepend-icon="event"
                                                        readonly
                                                        v-on:focus="
                                                        openDialog((date,week,delivery)=>{n.delivery_date = delivery;n.breed_date = date; n.breed_week = week})"
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs1>
                                                <v-text-field v-model="n.breed_week" label="ชุดผสม"
                                                              readonly=""></v-text-field>
                                            </v-flex>
                                            <v-flex xs2>
                                                <v-text-field v-model="n.breeder_1_id"
                                                              label="พ่อพันธุ์ 1"></v-text-field>
                                            </v-flex>
                                            <v-flex xs2>
                                                <v-text-field v-model="n.breeder_2_id"
                                                              label="พ่อพันธุ์ 2"></v-text-field>
                                            </v-flex>
                                            <v-flex xs2>
                                                <v-text-field v-model="n.breeder_3_id"
                                                              label="พ่อพันธุ์ 3"></v-text-field>
                                            </v-flex>
                                            <v-flex xs2>
                                                <v-text-field v-model="n.delivery_date" label="กำหนดคลอด"
                                                              readonly=""></v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-flex>
    </v-layout>
</template>

<script>
    import ChoiceSelect from "@/components/admin/choice/choiceSelect";
    import Base from '@/components/Base'

    export default {
        extends: Base,
        components: {ChoiceSelect},
        data() {
            return {
                form: null,
                //tabs
                active: null,
                lastid: 0,
                dialog: false,
                dialog_date: null,
                currentDateModel: null,
            }
        },
        methods: {
            openDialog: function (func) {
                this.currentDateModel = func;
                this.dialog = true
            },
            closeDialog: function () {
                this.currentDateModel = null;
                this.dialog_date = null;
                this.dialog = false;
            },
            saveDialog: function (date) {
                let week = this.$moment(date).week();
                let delivery = this.$moment(date).add(144,'days').format('YYYY-MM-DD');
                this.currentDateModel(date, week,delivery);
                this.closeDialog();
            },
            newPigBreed: function () {
                let newpb = {
                    id: ++this.lastid,
                    breed_date: null,
                };
                this.form.pig_breeds.push(newpb)
            },
            save: async function () {
                let pig = await this.$store.dispatch('pigs/updatePig', this.form);
                if (pig) {
                    this.$router.push({name: 'pig-home'})
                }
            },
            load: async function () {
                let pig = await this.$store.dispatch('pigs/getById',
                    {
                        id: this.$route.params.id,
                        form: {with: "pigBreeds"}
                    });
                this.form = pig
            }
        },
        mounted() {
            console.log('Pig Edit Component mounted.')
            this.load();
        }
    }
</script>