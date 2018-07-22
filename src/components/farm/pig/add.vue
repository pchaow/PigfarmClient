<template>
    <v-layout column justify-center v-if="form">
        <v-flex>
            <h1 class="display-1 pb-3">เพิ่มสุกร</h1>

            <v-card class="mb-3">
                <v-card-text>
                    <h2 class="title">ข้อมูลทั่วไป</h2>
                    <v-container fluid grid-list-md>

                        <v-layout row wrap>
                            <v-flex lg6 xs12>
                                <v-text-field class="mr-3" label="เบอร์ตี" v-model="form.pig_id"
                                              :error-messages="error.errors.pig_id"/>
                            </v-flex>
                            <v-flex lg6 xs12>
                                <v-text-field label="เบอร์หู" v-model="form.pig_number"
                                              :error-messages="error.errors.pig_number"/>
                            </v-flex>

                            <v-flex lg6 xs12>
                                <v-menu
                                        ref="birthDateMenu"
                                        :close-on-content-click="false"
                                        v-model="birthDateMenu"
                                        :nudge-right="40"
                                        :return-value.sync="form.birth_date"
                                        lazy
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        min-width="290px"
                                >
                                    <v-text-field
                                            slot="activator"
                                            :value="form.birth_date|moment('LL')"
                                            label="วันเกิด"
                                            readonly
                                    ></v-text-field>
                                    <v-date-picker
                                            locale="th-th"
                                            v-model="form.birth_date"
                                            @input="$refs.birthDateMenu.save(form.birth_date)">
                                    </v-date-picker>
                                </v-menu>

                            </v-flex>

                            <v-flex lg6 xs12>

                                <v-menu
                                        ref="entryDateMenu"
                                        :close-on-content-click="false"
                                        v-model="entryDateMenu"
                                        :nudge-right="40"
                                        :return-value.sync="form.entry_date"
                                        lazy
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        min-width="290px"
                                >
                                    <v-text-field
                                            slot="activator"
                                            :value="form.entry_date|moment('LL')"
                                            label="วันเข้าฟาร์ม"
                                            readonly
                                    ></v-text-field>
                                    <v-date-picker locale="th-th" v-model="form.entry_date"
                                                   @input="$refs.entryDateMenu.save(form.entry_date)">
                                    </v-date-picker>
                                </v-menu>
                            </v-flex>

                            <v-flex lg6 xs12>
                                <v-text-field label="หมายเลขพ่อพันธุ์" v-model="form.male_breeder_pig_id"
                                              :error-messages="error.errors.male_breeder_pig_id"/>
                            </v-flex>

                            <v-flex lg6 xs12>
                                <v-text-field label="หมายเลขแม่พันธุ์" v-model="form.female_breeder_pig_id"
                                              :error-messages="error.errors.female_breeder_pig_id"/>
                            </v-flex>

                            <v-flex lg4 md6 xs12>
                                <choice-select label="สายพันธุ์" :type="{to:'BREED'}" :value="form.blood_line"
                                               @change="form.blood_line = $event"></choice-select>

                            </v-flex>

                            <v-flex lg4 md6 xs12>
                                <v-text-field type="number" label="เต้านม (ซ้าย)" v-model="form.left_breast"
                                              :error-messages="error.errors.left_breast"/>

                            </v-flex>

                            <v-flex lg4 md6 xs12>
                                <v-text-field type="number" label="เต้านม (ขวา)" v-model="form.right_breast"
                                              :error-messages="error.errors.right_breast"/>
                            </v-flex>

                            <v-flex lg4 md6 xs12>
                                <v-text-field label="แหล่งที่มา" v-model="form.source"
                                              :error-messages="error.errors.source"/>
                            </v-flex>
                            <v-flex lg4 md6 xs12>
                                <choice-select label="สถานะ" :type="{to:'PIGSTATUS'}" :value="form.status"
                                               @change="form.status = $event"></choice-select>
                            </v-flex>

                            <v-flex lg12 md12 xs12>
                                <v-textarea label="หมายเหตุ" v-model="form.remark"
                                              :error-messages="error.errors.remark"/>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
            </v-card>

            <v-btn @click="save()" color="primary">Submit</v-btn>
            <v-btn @click="$router.go(-1)">Cancel</v-btn>
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
                birthDateMenu: false,
                entryDateMenu: false,
                form: {
                    blood_line: {},
                },

            }
        },
        methods: {
            save: async function () {
                let pig = await this.$store.dispatch('pigs/save', this.form);
                if (pig) {
                    this.$router.push({name: 'pig-home'})
                }
            }
        },
        mounted() {
            console.log('Example Component mounted.')
        }
    }
</script>