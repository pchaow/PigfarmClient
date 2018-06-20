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

                                     <v-dialog v-model="dialogBreeder" max-width="1000px" max-height="1500px">
                                            <v-card>
                                              <v-toolbar dark color="blueONblue">
                                                <v-btn icon dark @click.native="dialogBirth = false">
                                                    <v-icon>close</v-icon>
                                                </v-btn>
                                                <v-toolbar-title>การผสมพันธุ์ </v-toolbar-title>
                                                <v-spacer></v-spacer>
                                                <v-toolbar-items>
                                                    <v-btn  dark flat @click.native="dialogBreeder = false"><v-icon>mdi-content-save</v-icon>&nbsp;บันทึก</v-btn>
                                            </v-toolbar-items>
                                            </v-toolbar>

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

                                            </v-card>
                                     </v-dialog>


                                    <div class="title pb-3">
                                        การคลอด
                                        <v-btn small @click.stop="dialogBirth=true" fab color="primary">
                                            <v-icon>mdi-plus</v-icon>
                                        </v-btn>
                                    </div>
                                   
                                    <v-dialog v-model="dialogBirth" max-width="1000px" max-height="1500px">
                                            <v-card>
                                              <v-toolbar dark color="blueONblue">
                                                <v-btn icon dark @click.native="dialogBirth = false">
                                                    <v-icon>close</v-icon>
                                                </v-btn>
                                                <v-toolbar-title>การคลอด</v-toolbar-title>
                                                <v-spacer></v-spacer>
                                                <v-toolbar-items>
                                                    <v-btn  dark flat @click.native="dialog = false"><v-icon>mdi-content-save</v-icon>&nbsp;บันทึก</v-btn>
                                            </v-toolbar-items>
                                            </v-toolbar>

                                            <v-container>
                                               <v-layout row wrap>
                                                   <v-flex xs12>
                                                       <h2 class="p-h1 blueONwhite">&nbsp;ข้อมูลการคลอด</h2>
                                                    <v-layout class="box-margin-in">
                                                        <v-flex xs4 class="pig-card box-blue">
                                                            <p><v-icon color="white">mdi-pig</v-icon>จำนวนหมูทั้งหมด</p>
                                                            <h2>{{countPigAll()}} ตัว</h2>
                                                        </v-flex>
                                                        <v-flex xs4 class="pig-card box-green">
                                                            <p><v-icon color="white">mdi-pig</v-icon>จำนวนหมูที่รอดชีวิต</p>
                                                            <h2>{{countPig()}} ตัว</h2>
                                                        </v-flex>
                                                        <v-flex xs4 class="pig-card box-purple">
                                                            <p><v-icon color="white">mdi-weight-kilogram</v-icon>น้ำหนักเฉลี่ย</p>
                                                            <h2>{{pigAvg()}} กก.</h2>
                                                        </v-flex>
                                                    </v-layout>
                                                   </v-flex>

                                                    <v-flex xs6>
                                                        <h2 class="p-h1 blueONwhite">&nbsp;ระบุข้อมูลการคลอด</h2>
                                                        <br>
                                                        <div class="box-margin">
                                                           <v-menu
                                                            ref="menu"
                                                            :close-on-content-click="false"
                                                            v-model="menu"
                                                            :nudge-right="40"
                                                            transition="scale-transition"
                                                            offset-y
                                                            full-width
                                                            min-width="290px"
                                                        >
                                                            <v-text-field
                                                            slot="activator"
                                                            v-model="date"
                                                            label="วันที่คลอด"
                                                            prepend-icon="event"
                                                            readonly
                                                            ></v-text-field>
                                                            <v-date-picker v-model="date" no-title scrollable>
                                                            <v-spacer></v-spacer>
                                                            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                                            <v-btn flat color="primary" @click="getDateBirth(date)">OK</v-btn>
                                                            </v-date-picker>
                                                        </v-menu>

                                                        <h3>จำนวนการคลอด</h3><hr>
                                                        <v-text-field
                                                       id="testing"
                                                       name="input-1"
                                                       label="มีชีวิต"
                                                       type="number"
                                                       v-model.number="pigBirthStstus.life"
                                                     ></v-text-field>
                                                        <v-layout>
                                                                <v-flex xs4 class="box-margin">
                                                                    <v-text-field
                                                                    id="testing"
                                                                    name="input-1"
                                                                    value="2"
                                                                    label="ตาย"
                                                                    type="number"
                                                                    v-model.number="pigBirthStstus.dead"
                                                                    ></v-text-field>
                                                                </v-flex>

                                                                <v-flex xs6 class="box-margin">
                                                                    <v-text-field
                                                                    id="testing"
                                                                    name="input-1"
                                                                    label="มัมมี่"
                                                                    v-model.number="pigBirthStstus.deadin"
                                                                    ></v-text-field>
                                                                </v-flex>

                                                                <v-flex xs6 class="box-margin">
                                                                    <v-text-field
                                                                    id="testing"
                                                                    name="input-1"
                                                                    label="พิการ"
                                                                    type="number"
                                                                    v-model.number="pigBirthStstus.deformed"
                                                                    ></v-text-field>
                                                                </v-flex>
                                                            </v-layout>
                                                        </div>
                                                    </v-flex>
                                                    <v-flex xs6>
                                                     <h2 class="p-h1 blueONwhite">&nbsp;ตารางน้ำหนักเฉลี่ย</h2>
                                                      <table class="table" style="width:400px;">
                                                        <thead class="">
                                                        <tr>
                                                            <th>หมูที่มีชีวิต</th>
                                                            <th>น้ำหนักหมู</th> 
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr v-for="input in loopText(pigBirthStstus.life)">
                                                            <td>หมูตัวที่ :{{input}}</td>
                                                            <td> <v-text-field
                                                            id="testing"
                                                            name="input-1"
                                                            label="น้ำหนัก"
                                                            type="number"
                                                            v-model.number="inputy[input-1]"
                                                          ></v-text-field></td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                    </v-flex>
                                               </v-layout>
                                            </v-container>
                                                <br><br>
                                            </v-card>
                                            
                                          </v-dialog>

                                    <div class="title pb-3">
                                        การหย่านม
                                         <v-btn small @click.stop="dialogMilk=true" fab color="primary">
                                            <v-icon>mdi-plus</v-icon>
                                        </v-btn>
                                    </div> 
                                    <v-dialog v-model="dialogMilk" max-width="1000px" max-height="1500px">
                                            <v-card>
                                              <v-toolbar dark color="blueONblue">
                                                <v-btn icon dark @click.native="dialogBirth = false">
                                                    <v-icon>close</v-icon>
                                                </v-btn>
                                                <v-toolbar-title>การหย่านม </v-toolbar-title>
                                                <v-spacer></v-spacer>
                                                <v-toolbar-items>
                                                    <v-btn  dark flat @click.native="dialog = false"><v-icon>mdi-content-save</v-icon>&nbsp;บันทึก</v-btn>
                                            </v-toolbar-items>
                                            </v-toolbar>
                                            <v-container>
                                                <v-flex xs12>
                                                       <h2 class="p-h1 blueONwhite">&nbsp;ข้อมูลการคลอด</h2>
                                                    <v-menu
                                                            ref="menuOfdateMilk"
                                                            :close-on-content-click="false"
                                                            v-model="menuOfdateMilk"
                                                            :nudge-right="40"
                                                            transition="scale-transition"
                                                            offset-y
                                                            full-width
                                                            min-width="290px"
                                                        >
                                                            <v-text-field
                                                            slot="activator"
                                                            v-model="dateMilk"
                                                            label="วันที่อย่านม"
                                                            prepend-icon="event"
                                                            readonly
                                                            ></v-text-field>
                                                            <v-date-picker v-model="date" no-title scrollable>
                                                            <v-spacer></v-spacer>
                                                            <v-btn flat color="primary" @click="menuOfdateMilk = false">Cancel</v-btn>
                                                            <v-btn flat color="primary" @click="getDateMilk(date)">OK</v-btn>
                                                            </v-date-picker>
                                                        </v-menu>
                                                        <v-text-field
                                                            id="testing"
                                                            name="input-1"
                                                            label="จำนวน"
                                                            type="number"
                                                            v-model.number="inputy[input-1]"
                                                          ></v-text-field>
                                                          <v-text-field
                                                            id="testing"
                                                            name="input-1"
                                                            label="น้ำหนักเฉลี่ย"
                                                            type="number"
                                                            v-model.number="inputy[input-1]"
                                                          ></v-text-field>
                                                   </v-flex>
                                            </v-container>
                                            </v-card>
                                    </v-dialog>
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
import Base from "@/components/Base";

export default {
  extends: Base,
  components: { ChoiceSelect },
  data() {
    return {
      form: null,
      menu: false,
      datedd: null,

      dialogBreeder: false,

      menuOfdateMilk: false,
      dateMilk: null,
      dialogMilk: false,

      //tabs
      active: null,
      dialog: false,
      dialog_date: null,
      currentDateModel: null,
      dialogBirth: false,
      pigBirthStstus: [
        {
          life: 0,
          deadin: 0,
          dead: 0,
          deformed: 0
        }
      ],
      num: Number,
      inputy: [],
      pigCountAvg: 0
    };
  },
  methods: {
    getDateMilk(date) {
      this.dateMilk = date;
      this.menuOfdateMilk = false;
    },
    getDateBirth(date) {
      this.datedd = date;
      this.menu = false;
    },
    pigAvg: function() {
      var x = 0;
      var pig = this.inputy.length;
      for (var i = 0; i < pig; i++) {
        x += this.inputy[i];
      }
      var result = x / pig;
      if (result) {
        return result;
      } else {
        return 0;
      }
    },
    countPigAll() {
      var result =
        this.pigBirthStstus.life +
        this.pigBirthStstus.deadin +
        this.pigBirthStstus.dead +
        this.pigBirthStstus.deformed;

      if (result) {
        return result;
      } else {
        return 0;
      }
    },
    countPig() {
      var result = this.pigBirthStstus.life;
      if (result) {
        return result;
      } else {
        return 0;
      }
    },
    loopText: function(vars) {
      if (vars != null) {
        this.inputy.length = vars;
      } else {
        this.inputy.length = 0;
      }
      return vars;
    },
    saveCycle: function(cycle) {
      console.log(cycle);
    },
    removeBreeder: function(cycle, breeder) {
      let index = cycle.breeders.indexOf(breeder);
      cycle.breeders.splice(index, 1);
    },
    addBreeder: async function($event, cycle) {
      let form = this.form;
      let cycleIndex = form.cycles.indexOf(cycle);
      let selCycle = form.cycles[cycleIndex];

      this.$nextTick(() => {
        if (selCycle.breeders) {
          this.dialogBreeder = true;
          selCycle.breeders.push({});
        } else {
          this.$set(selCycle, "breeders", [{}]);
        }
      });
    },
    openDialog: function(func) {
      this.currentDateModel = func;
      this.dialog = true;
    },
    closeDialog: function() {
      this.currentDateModel = null;
      this.dialog_date = null;
      this.dialog = false;
    },
    saveDialog: function(date) {
      let week = this.$moment(date).week();
      let delivery = this.$moment(date)
        .add(144, "days")
        .format("YYYY-MM-DD");
      this.currentDateModel(date, week, delivery);
      this.closeDialog();
    },
    newCycle: async function() {
      let cycle = await this.$store.dispatch("pigs/createCycle", this.form.id);
      console.log("CYCLE", cycle);
      this.form.cycles.push(cycle);
      this.active = "" + this.form.cycles.indexOf(cycle);
    },
    save: async function() {
      let pig = await this.$store.dispatch("pigs/updatePig", this.form);
      if (pig) {
        this.$router.push({ name: "pig-home" });
      }
    },
    load: async function() {
      let pig = await this.$store.dispatch("pigs/getById", {
        id: this.$route.params.id,
        form: { with: ["cycles", "cycles.breeders"] }
      });
      this.form = pig;
    }
  },
  mounted() {
    console.log("Pig Edit Component mounted.");
    this.load();
  }
};
</script>
