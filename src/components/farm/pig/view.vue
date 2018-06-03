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

                form: null,

            }
        },
        methods: {
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
                        form: {with:"pigBreeds"}
                    })
                this.form = pig
            }
        },
        mounted() {
            console.log('Pig Edit Component mounted.')
            this.load();
        }
    }
</script>