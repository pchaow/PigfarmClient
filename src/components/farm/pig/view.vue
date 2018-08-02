<template>
    <v-layout column justify-center v-if="form">
        <v-flex>
            <h1 class="display-1 pb-3">ข้อมูลสุกร เบอร์ตี : {{form.pig_id}}</h1>

            <v-card class="mb-3">
                <v-toolbar card prominent>
                    <v-toolbar-title>ข้อมูลทั่วไป</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn flat :to="{ name: 'pig-edit', params: { id: form.id }}">แก้ไข</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <v-container grid-list-md fluid>

                        <v-layout row wrap>
                            <v-flex>
                                <label>เบอร์ตี</label>
                                <div>{{form.pig_id}}</div>
                            </v-flex>
                            <v-flex>
                                <label>เบอร์หู</label>
                                <div>{{form.pig_number}}</div>
                            </v-flex>
                            <v-flex>
                                <label>สายพันธุ์</label>
                                <div>{{form.blood_line? form.blood_line.display_name : '' }}</div>
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
                            <v-flex>
                                <label>สถานะ</label>
                                <div>{{form.status? form.status.display_name : '-'}}</div>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-flex>


        <v-flex>
            <v-btn class="box-greenFX  mr-6" @click="newCycle"><v-icon>mdi-library-plus</v-icon>&nbsp;<h3>{{text.head}}</h3></v-btn><br><br>
            <v-tabs v-if="form.cycles.length > 0" v-model="active" color="primary" dark slider-color="yellow">
                <div class="mrt-6" v-for="n in form.cycles" :key="n.id">
                    <v-tab @click.native="cycleStepChange(n.cycle_sequence)" ripple>
                        ลำดับท้องที่ {{n.cycle_sequence}}
                    </v-tab>
                </div>
                <v-tab-item v-for="cycle in form.cycles" :key="cycle.id" lazy>
                    <v-stepper v-model="pigStep" vertical>
                        <v-stepper-step editable :complete="pig.cycles[active].complete > 1" step="1">{{text.breeder}}
                        </v-stepper-step>
                        <v-stepper-items>
                            <v-stepper-content step="1" active>
                                <v-layout row>
                                    <Breeder :id="pig_id" :cycle="active"></Breeder>
                                </v-layout>


                            </v-stepper-content>
                            <v-stepper-step editable :complete="pig.cycles[active].complete  > 2" step="2">{{text.birth}}
                            </v-stepper-step>
                            <v-stepper-content step="2">
                                <v-layout row>
 
                                    <Birth :id="pig_id" :cycle="active"></Birth>
                                </v-layout>

                            </v-stepper-content>
                          <v-stepper-step editable :complete="pig.cycles[active].complete  > 3" step="3">{{text.feed}}
                            </v-stepper-step>
                            <v-stepper-content  step="3">
                       
                                      <Feed :id="pig_id" :cycle="active"></Feed>
                                
                               
                                <Feedout :id="pig_id" :cycle="active"></Feedout>
                            </v-stepper-content>
                            <v-stepper-step editable :complete="pig.cycles[active].complete  > 4" step="4">{{text.milk}}</v-stepper-step>
                            <v-stepper-content step="4">
                                <Milk :id="pig_id" :cycle="active"></Milk>
                            </v-stepper-content>

                        </v-stepper-items>
                    </v-stepper>
                </v-tab-item>
            </v-tabs>
        </v-flex>

    </v-layout>
</template>

<script>
    import ChoiceSelect from "@/components/admin/choice/choiceSelect";
    import Base from "@/components/Base";
    import Breeder from "@/components/farm/pig/cycles/breeder";
    import Birth from "@/components/farm/pig/cycles/birth";
    import Feed from "@/components/farm/pig/cycles/feed";
    import Feedout from "@/components/farm/pig/cycles/feedout";
    import Milk from "@/components/farm/pig/cycles/milk";
    import Vaccine from "@/components/farm/pig/cycles/vaccine";
    import {
        mapGetters,
        mapActions,
        mapState
    } from "vuex";

    export default {
        extends: Base,
        components: {
            ChoiceSelect,
            Breeder,
            Birth,
            Feed,
            Feedout,
            Milk,
            Vaccine
        },
        data() {
            return {

                i_step: 0,
                pig_id: null,
                pig_sequence: null,
                pigStep: 1,
                form: null,
                //tabs
                active: 0,
                dialog_date: null,
                currentDateModel: null,
                date: "",
                step: 0,
                text: {
                    head: "เพิ่มลำดับท้องใหม่",
                    confirm: "คุณแน่ใจหรือไม่ ว่าต้องการเพิ่มรอบการผสมใหม่",
                    breeder: "การผสม",
                    birth: "การคลอด",
                    feed: "การเลี้ยงลูก",
                    milk: "การหย่านม"
                }
            };
        },
        computed: {
            ...mapState({
                pig: state => state.cycles.pigData
            })
        },
        methods: {
         
            cycleStepChange(step) {
                this.pig_sequence = step;
                this.pigStep = this.cyclesData[step - 1].complete;
            },
            newCycle: async function () {
                if (confirm(this.text.confirm)) {
                    let cycle = await this.$store.dispatch(
                        "pigs/createCycle",
                        this.form.id
                    );
                    console.log("CYCLE", cycle);
                    this.form.cycles.push(cycle);
                    this.active = Number(this.form.cycles.indexOf(cycle));
                    console.log("Role is a" + this.active);
                    this.load();
                }
            },

            save: async function () {
                let pig = await this.$store.dispatch("pigs/updatePig", this.form);
                if (pig) {
                    this.$router.push({
                        name: "pig-home"
                    });
                }
            },
            load: async function () {
                let pig = await this.$store.dispatch(
                    "cycles/getById",
                    this.$route.params.id
                );
                try {
                    this.form = this.pig;
                    this.cyclesData = this.form.cycles;
                    this.pig_id = this.form.id;
                    this.pig_sequence = Number(this.form.cycles.length);
                    this.active = Number(this.form.cycles.length) - 1;

                    this.pigStep = this.cyclesData[this.active].complete;
                    this.i_step = this.pigStep;
                } catch (error) {
                    this.active = 0;
                    this.pigStep = 0;
                }


            }
        },
        mounted() {
            console.log("Pig Edit Component mounted.");
            this.load();
        }
    };
</script>
