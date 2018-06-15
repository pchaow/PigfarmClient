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

            <v-btn color="success" @click="newCycle">เพิ่มรอบการผสมใหม่</v-btn>

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
            <v-tabs v-if="form.cycles.length > 0" v-model="active" color="primary" dark slider-color="yellow">
                <v-tab v-for="n in form.cycles" :key="n.id" ripple>
                    รอบการผสมที่ {{n.cycle_sequence}}
                </v-tab>
                <v-tab-item v-for="cycle in form.cycles" :key="cycle.id" lazy>
                    <v-card flat>
                        <v-card-text>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-btn color="info" @click="saveCycle(cycle)">บันทึกข้อมูลรอบ</v-btn>
                                </v-flex>
                                <v-flex xs12>
                                    <div class="title pb-3">
                                        การผสมพันธุ์
                                        <v-btn small @click="addBreeder($event,cycle)" fab color="primary">
                                            <v-icon>mdi-plus</v-icon>
                                        </v-btn>

                                    </div>

                                    <v-layout row wrap :key="$index" v-for="(breeder,$index) in cycle.breeders">
                                        <v-flex xs2>
                                            <v-text-field
                                                    slot="activator"
                                                    v-model="breeder.breed_date"
                                                    label="วันที่ผสม"
                                                    prepend-icon="event"
                                                    readonly
                                                    v-on:focus="
                                                        openDialog((date,week,delivery)=>{breeder.delivery_date = delivery;breeder.breed_date = date; breeder.breed_week = week})"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs1>
                                            <v-text-field v-model="breeder.breed_week" label="ชุดผสม"
                                                          readonly=""></v-text-field>
                                        </v-flex>
                                        <v-flex xs2>
                                            <v-text-field v-model="breeder.breeder_id"
                                                          :label="'พ่อพันธุ์ ' + ($index+1)"></v-text-field>
                                        </v-flex>
                                        <v-flex xs2>
                                            <v-text-field v-model="breeder.delivery_date" label="กำหนดคลอด"
                                                          readonly=""></v-text-field>
                                        </v-flex>
                                        <v-flex xs2>
                                            <choice-select binding="name" label="สถานะ" :type="{to:'BREEDING'}" :value="breeder.status" @change="breeder.status = $event"></choice-select>
                                        </v-flex>
                                        <v-flex xs2>
                                            <v-btn fab @click="removeBreeder(cycle,breeder)" flat color="red">
                                                <v-icon>mdi-delete</v-icon>
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>

                                    <div class="title pb-3">
                                        การคลอด
                                        <v-btn small @click.stop="dialogBirth=true" fab color="primary">
                                            <v-icon>mdi-plus</v-icon>
                                        </v-btn>
                                    </div>
                                    <v-dialog v-model="dialogBirth" max-width="1500px" max-height="1500px">
                                            <v-card>
                                              <v-card-title>
                                                <span>การคลอด</span>
                                                <v-spacer></v-spacer>
                                              </v-card-title>
                                              <v-card-text>
                                                <layout>
                                                  <v-flex xs12>
                                                    <v-text-field
                                                       id="testing"
                                                       name="input-1"
                                                       label="จำนวนการคลอด"
                                                     ></v-text-field>
                                                  </v-flex>

                                              <v-container grid-list-md text-xs-center>
                                              <v-layout row wrap>
                                                  <v-flex xs3>
                                                    <v-text-field
                                                       id="testing"
                                                       name="input-1"
                                                       label="มีชีวิต"
                                                       type="number"
                                                       v-model.number="pigBirthStstus.life"
                                                     ></v-text-field>
                                                     <ul>
                                                       <li v-for="input in loopText(pigBirthStstus.life)">
                                                       <p>หมูตัวที่ :{{input}}</p>
                                                       <v-text-field
                                                            id="testing"
                                                            name="input-1"
                                                            label="น้ำหนัก"
                                                            type="number"
                                                            v-model.number="inputy[input-1]"
                                                          ></v-text-field>
                                                       </li>
                                                     </ul>

                                                  </v-flex>
                                                  <v-flex xs3  color="purple">
                                                    <v-text-field

                                                       id="testing"
                                                       name="input-1"
                                                       value="2"
                                                       label="ตาย"
                                                       type="number"
                                                       v-model.number="pigBirthStstus.dead"
                                                     ></v-text-field>
                                                  </v-flex>
                                                  <v-flex xs3>
                                                    <v-text-field
                                                       id="testing"
                                                       name="input-1"
                                                       label="มัมมี่"
                                                       v-model.number="pigBirthStstus.deadin"
                                                     ></v-text-field>
                                                  </v-flex>
                                                  <v-flex xs3>
                                                    <v-text-field
                                                       id="testing"
                                                       name="input-1"
                                                       label="พิการ"
                                                       type="number"
                                                       v-model.number="pigBirthStstus.deformed"
                                                     ></v-text-field>

                                                  </v-flex>
                                                  </v-layout>
                                                    </v-container>
                                                <h2>จำนวนหมูทั้งหมด {{countPigAll()}} ตัว</h2>
                                                <h1>จำนวนหมูที่รอดชีวิต {{countPig()}} ตัว</h1>
                                                <hr> <h3>น้ำหนักเฉลี่ย {{pigAvg()}} กก. </h3><hr>


                                                </layout>
                                              </v-card-text>
                                              <v-card-actions>
                                                <v-btn color="primary" flat @click.stop="dialogBirth=false">Close</v-btn>
                                              </v-card-actions>
                                            </v-card>
                                          </v-dialog>

                                    <div class="title pb-3">
                                        การหย่านม
                                    </div>
                                    <v-container fluid grid-list-md>
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
                dialog: false,
                dialog_date: null,
                currentDateModel: null,

                dialogBirth:false,
                pigBirthStstus:[{
                  life:0,
                  deadin:0,
                  dead:0,
                  deformed:0
                }],
                num:Number,
                inputy:[],
                pigCountAvg:0

            }
        },
        methods: {
          pigAvg:function(){
            var x =0;
            var pig = this.inputy.length;
            for(var i=0; i<pig;i++){
             x+=this.inputy[i];
            }
            return x/pig;
          },
          countPigAll(){
          return this.pigBirthStstus.life+this.pigBirthStstus.deadin+this.pigBirthStstus.dead+this.pigBirthStstus.deformed;
          },
          countPig(){
          return this.pigBirthStstus.life;
          },
          loopText:function(vars){
              if(vars != null){
              this.inputy.length = vars;
              }else{
              this.inputy.length = 0;
              }
            return vars ;
          },
            saveCycle: function (cycle) {
                console.log(cycle);
            },
            removeBreeder: function (cycle, breeder) {
                let index = cycle.breeders.indexOf(breeder);
                cycle.breeders.splice(index, 1);
            },
            addBreeder: async function ($event, cycle) {
                let form = this.form;
                let cycleIndex = form.cycles.indexOf(cycle);
                let selCycle = form.cycles[cycleIndex];

                this.$nextTick(() => {
                    if (selCycle.breeders) {
                        selCycle.breeders.push({})
                    } else {
                        this.$set(selCycle, 'breeders', [{}]);
                    }

                });


            },
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
                let delivery = this.$moment(date).add(144, 'days').format('YYYY-MM-DD');
                this.currentDateModel(date, week, delivery);
                this.closeDialog();
            },
            newCycle: async function () {
                let cycle = await this.$store.dispatch('pigs/createCycle', this.form.id);
                console.log("CYCLE", cycle);
                this.form.cycles.push(cycle);
                this.active = "" + this.form.cycles.indexOf(cycle);
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
                        form: {with: ["cycles", "cycles.breeders"]}
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
