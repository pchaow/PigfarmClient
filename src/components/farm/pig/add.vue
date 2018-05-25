<template>
    <v-layout column justify-center v-if="form">
        <v-flex>
            <v-card>
                <v-card-title>
                    <div class="headline">เพิ่มสุกร</div>
                </v-card-title>
                <v-card-text>
                    <h2 class="title">ข้อมูลทั่วไป</h2>
                    <v-container grid-list-md text-xs-center>

                        <v-layout row wrap>
                            <v-flex lg6 xs12>
                                <v-text-field class="mr-3" label="PIGID" v-model="form.pig_id"
                                              :error-messages="error.errors.pig_id"/>
                            </v-flex>
                            <v-flex lg6 xs12>
                                <v-text-field label="เบอร์แม่พันธุ์" v-model="form.pig_number"
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
                                            prepend-icon="event"
                                            readonly
                                    ></v-text-field>
                                    <v-date-picker
                                            locale="th-th"
                                            v-model="form.birth_date"  @input="$refs.birthDateMenu.save(form.birth_date)">
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
                                            prepend-icon="event"
                                            readonly
                                    ></v-text-field>
                                    <v-date-picker locale="th-th" v-model="form.entry_date"  @input="$refs.entryDateMenu.save(form.entry_date)">
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
                                <v-text-field label="สถานะ" v-model="form.status"
                                              :error-messages="error.errors.status"/>

                            </v-flex>

                        </v-layout>

                    </v-container>




                </v-card-text>
                <v-card-actions>
                    <v-btn @click="save()" color="primary">Submit</v-btn>
                    <v-btn @click="$router.go(-1)" color="default">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import ChoiceSelect from "@/components/admin/choice/choiceSelect";

    export default {
        components: {ChoiceSelect},
        data() {
            return {
                birthDateMenu : false,
                entryDateMenu : false,
                form: {
                    blood_line: {},
                },
                error: {
                    errors: {},
                    message: null,
                },
            }
        },
        methods: {
            save: async function () {
                let user = await this.$store.dispatch('pigs/save', this.form);
                if (user) {
                    this.$router.push({name: 'pig-home'})
                }
            }
        },
        mounted() {
            console.log('Example Component mounted.')
        }
    }
</script>