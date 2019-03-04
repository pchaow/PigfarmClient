<template>
    <v-layout column justify-center v-if="form">
        <v-flex>
            <h1 class="display-1 pb-3">แก้ไขเป้าหมาย</h1>

            <v-card class="mb-3">
                <v-card-title>
                    <h2 class="title">ข้อมูลเป้าหมาย</h2>
                </v-card-title>
                <v-card-text>
                    <v-select
                            v-model="form.report_type"
                            :items="report_type"
                            label="ประเภทป้าหมาย"
                    ></v-select>


                    <v-menu
                            ref="report_date_menu"
                            v-model="report_date_menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="form.report_date"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    v-model="form.report_date"
                                    label="วันที่กำหนดเป้าหมาย"
                                    readonly
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="form.report_date" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="report_date_menu = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.report_date_menu.save(form.report_date)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>


                    <v-text-field label="จำนวนแม่พันธุ์ใช้งาน" v-model="form.active_breeder"
                                  :error-messages="error.errors.active_breeder"/>

                    <v-text-field label="จำนวนแม่ผสม" v-model="form.breeded_breeder"
                                  :error-messages="error.errors.breeded_breeder"/>

                    <v-text-field label="จำนวนแม่คลอด" v-model="form.delivery_breeder"
                                  :error-messages="error.errors.delivery_breeder"/>

                    <v-text-field label="อัตราเข้าคลอด/ชุดผสม" v-model="form.delivery_ratio"
                                  :error-messages="error.errors.delivery_ratio"/>

                    <v-text-field label="เปอร์เซ็นต์สูญเสียลูกสุกรแรกคลอด" v-model="form.pig_delivered_died_percent"
                                  :error-messages="error.errors.pig_delivered_died_percent"/>

                    <v-text-field label="จำนวนลูกแรกคลอดมีชีวิตต่อครอก" v-model="form.pig_delivered_success_avg"
                                  :error-messages="error.errors.pig_delivered_success_avg"/>

                    <v-text-field label="เฉลี่ยน้ำหนักแรกคลอด/ตัว" v-model="form.pig_delivered_weight"
                                  :error-messages="error.errors.pig_delivered_weight"/>

                    <v-text-field label="เปอร์เซ็นต์สูญเสียลูกสุกรก่อนหย่านม" v-model="form.pig_raising_failed_perent"
                                  :error-messages="error.errors.pig_raising_failed_perent"/>

                    <v-text-field label="จำนวนแม่หย่านม" v-model="form.ween_breeder"
                                  :error-messages="error.errors.ween_breeder"/>

                    <v-text-field label="จำนวนลูกหย่านมทั้งหมด" v-model="form.pig_ween_number"
                                  :error-messages="error.errors.pig_ween_number"/>

                    <v-text-field label="จำนวนลูกหย่านม/ครอก" v-model="form.pig_ween_rate"
                                  :error-messages="error.errors.pig_ween_rate"/>

                    <v-text-field label="เฉลี่ยน้ำหนักหย่านม/ตัว" v-model="form.pig_ween_weight_avg"
                                  :error-messages="error.errors.pig_ween_weight_avg"/>

                    <v-text-field label="จำนวนครอก/แม่/ปี" v-model="form.delivered_breeder_rate"
                                  :error-messages="error.errors.delivered_breeder_rate"/>

                    <v-text-field label="จำนวนลูกลูกหย่านม/แม่/ปี (PSY)" v-model="form.pig_ween_breeder_rate"
                                  :error-messages="error.errors.pig_ween_breeder_rate"/>

                    <v-text-field label="% สุกรสาวทดแทน" v-model="form.breeder_replace_number"
                                  :error-messages="error.errors.breeder_replace_number"/>

                    <v-text-field label="% แม่สุกรคัดทิ้ง" v-model="form.breeder_drop_percent"
                                  :error-messages="error.errors.breeder_drop_percent"/>

                    <v-text-field label="+/- แม่ทดแทนกับแม่คัดทิ้ง" v-model="form.breeder_replace_drop_sum"
                                  :error-messages="error.errors.breeder_replace_drop_sum"/>

                </v-card-text>
            </v-card>

            <v-btn @click="save()" color="primary">Submit</v-btn>
            <v-btn @click="$router.go(-1)">Cancel</v-btn>

        </v-flex>
    </v-layout>
</template>

<script>
    import {get, sync, call, callOne } from 'vuex-pathify'
    import Base from "../../Base"

    export default {
        extends: Base,
        components: {},
        data: () => ({
            form: null,
            report_date_menu : false,
        }),
        computed : {
            report_type : sync("goals/reportType")
        },
        methods: {
            load: async function () {
                let id = this.$route.params.id;
                let goal = await this.$store.dispatch('goals/getById', id);
                this.form = goal
            },
            save: async function () {
                let goal = await this.$store.dispatch('goals/updateGoal',this.form)
                if(goal){
                    this.$router.push({name : 'report-home'})
                }
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