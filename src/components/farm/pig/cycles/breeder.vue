<template>
  <v-layout row>
    <v-flex xs6>
      <h2>
        <v-icon>mdi-eyedropper</v-icon>การผสมพันธุ์</h2>
      <v-btn class="blueONblue" dark @click="dialog=true">
        <v-icon>mdi-plus-circle</v-icon>เพิ่มรอบการผสมพันธ์ุ</v-btn>
      <div v-for="bd,index in datas" class="pd-12">
        <div class="card-border violet pd-10">
          <h3 class="blx nm pd-10">
            <v-icon class="blx">mdi-calendar</v-icon>
            วันที่ผสมพันธ์ุ : {{bd.breed_date}}
          </h3>
          <h4 class=" nm pdl-10" style="color: #B03060;">
            ชุดการผสม : {{bd.breed_week}}</h4>
          <h4 class="nm pdl-10" style="color: #00cc00;">
            วันที่คาดว่าจะคลอด : {{bd.delivery_date}}</h4>
          <h4 class="nm pdl-10" style="color: #FA8072;">
            พ่อพันธ์ตัวที่ 1 : {{bd.breeder_a}}</h4>
          <h4 class="nm pdl-10" style="color: #FA8072;">
            พ่อพันธ์ตัวที่ 2 : {{bd.breeder_b}}</h4>
          <h4 class="nm pdl-10" style="color: #FA8072;">
            พ่อพันธ์ตัวที่ 3 : {{bd.breeder_c}}</h4>
          <h3 style="color:green;">--------------------------------------------------------</h3>
          <div v-if="bd.gravid != 0">
            <h4 class=" nm pdl-10" style="color:green;"> สถานะ : ติดลูกแล้ว </h4>

            <div class="nm pdl-10" v-if="bd.gravid == 3" style="color:green">
              ลัษณะการติดลูก : ปกติ
            </div>
            <h4 class=" nm pdl-10" style="color:brown;"> วันที่ติดลูก : {{bd.gravid_date}} </h4>
                  <p class=" nm pdl-10" style="color:brown;"> หมายเหตุ : {{bd.gravid_remark}} </p>
             <div class="nm pdl-10" v-if="bd.gravid == 1" style="color:red">
              ลัษณะการติดลูก : แท้ง
              <h4 > วันที่แท้งลูก : {{ bd.gravid_out }} </h4>
              <p  style="color:brown;"> หมายเหตุ : {{bd.gravid_out_remark}} </p>
            </div>

                  <v-btn v-if="bd.gravid == 3" @click="gravidOpen(bd.id,bd.gravid,bd.gravid_date,1)" class="box-red " dark>
              <v-icon>mdi-robot</v-icon> &nbsp;แท้ง</v-btn>
          </div>
          <div v-if="bd.gravid == 0">
            <h4 class=" nm pdl-10" style="color:red;">สถานะ : ยังไม่ติดลูก</h4>
            <v-btn v-if="bd.gravid == 0" @click="gravidOpen(bd.id,bd.gravid,bd.gravid_date,0)" class="box-blue " dark>
              <v-icon>mdi-robot</v-icon> &nbsp;ติดลูก</v-btn>
          </div>
          <h3 style="color:green;">--------------------------------------------------------</h3>
          <v-btn @click="updateOpen(bd)" style="margin-top:-100px; float:right;" small color="orange" fab dark>
            <v-icon>mdi-calendar-edit</v-icon>
          </v-btn>
          <v-btn @click="destroy(bd.id)" style="margin-top:-50px; float:right;" small color="red" fab dark>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </div>
    </v-flex>
    <v-flex xs6>
      <Vaccine :id="id" :cycle="cycle" :cycle_type="1"></Vaccine>
    </v-flex>
    <v-dialog v-model="dialog" scrollable persistent :overlay="false" max-width="500px" transition="dialog-transition">
      <v-card>
        <v-toolbar dark color="blueONblue">
          <v-btn icon dark @click.native="dialogClose()">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>
            <h3 class="nm">เพิ่มข้อมูล</h3>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn v-if="updateGet" dark flat @click.native="update()">
              <h3>
                <v-icon>mdi-content-save</v-icon> อัพเดท</h3>
            </v-btn>
            <v-btn v-if="!updateGet" dark flat @click.native="save()">
              <h3>
                <v-icon>mdi-content-save</v-icon> บันทึก</h3>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card class="container" row wrap>
          <v-flex xs12 class="box-purple mar-top pd-20">
            <v-layout>
              <v-flex xs3>
                <v-icon style="font-size:66px;" color="white">mdi-update</v-icon>
              </v-flex>
              <v-flex xs8 class="mar-top">
                <v-dialog ref="dialogRef" persistent v-model="dialogValue" lazy full-width width="290px">
                  <v-text-field  dark slot="activator" label="วันที่ผสมพันธ์ุ" v-model="setData.breed_date" readonly></v-text-field>
                  <v-date-picker v-model="tmp" locale="th" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="dateCancle()">Cancel</v-btn>
                    <v-btn flat color="primary" @click="dateConvert()">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
                <v-text-field dark readonly label="วันที่คาดว่าจะคลอด" v-model="setData.delivery_date"></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 class="box-green mar-top pd-20">
            <v-layout>
              <v-flex xs3>
                <v-icon style="font-size:66px;" color="white">mdi-eyedropper</v-icon>
              </v-flex>
              <v-flex xs8 class="mar-top">
                <v-text-field dark label="ชุดผสม" v-model="setData.breed_week"></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 class="box-blue mar-top pd-20">
            <v-layout>
              <v-flex xs3>
                <v-icon style="font-size:66px;" color="white">mdi-pig</v-icon>
              </v-flex>
              <v-flex xs8 class="mar-top">
                <v-text-field  dark label="พ่อพันธ์ุตัวที่ 1" v-model="setData.breeder_a"></v-text-field>
                <v-text-field  dark label="พ่อพันธ์ุตัวที่ 2" v-model="setData.breeder_b"></v-text-field>
                <v-text-field dark label="พ่อพันธ์ุตัวที่ 3" v-model="setData.breeder_c"></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-card>
      </v-card>
    </v-dialog>
    <v-dialog v-model="gravidDialog"  scrollable max-width="300px">
      <v-card class="box-yellow">
        <v-card-title>
          <h2><b>เพิ่มข้อมูลการติดลูก</b></h2>
        </v-card-title>
        <v-card-text style="">
          <div v-if="gravid == 0">
            <v-dialog ref="dialogRef" persistent v-model="gravid_dialogValue" lazy full-width width="290px">
              <v-text-field @blur="dateNotNull()"   prepend-icon="mdi-calendar" slot="activator" label="วันที่ติดลูก" v-model="gravid_date" readonly></v-text-field>
              <v-date-picker v-model="tmp" locale="th" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="gravidDialogClose()">Cancel</v-btn>
                <v-btn flat color="primary" @click="gravidConvert()">OK</v-btn>
              </v-date-picker>
            </v-dialog>
            <v-textarea outline v-model="gravid_remark" label="หมายเหตุ" ></v-textarea>
          </div>

          <div v-if="gravid == 1">
             <v-dialog ref="dialogRef" persistent v-model="gravid_dialogValue2" lazy full-width width="290px">
              <v-text-field @blur="dateNotNull2()"   prepend-icon="mdi-calendar" slot="activator" label="วันที่แท้ง" v-model="gravid_out" readonly></v-text-field>
              <v-date-picker v-model="tmp" locale="th" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="gravidDialogClose2()">Cancel</v-btn>
                <v-btn flat color="primary" @click="gravidConvert2()">OK</v-btn>
              </v-date-picker>
            </v-dialog>
                <v-textarea outline v-model="gravid_out_remark" label="หมายเหตุ" ></v-textarea>
          </div>

        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="mrl-100">
          <v-btn color="blue darken-1" flat @click.native="gravidClose()">ยกเลิก</v-btn>
          <v-btn class="box-green" flat @click.native="gravidSave()"><b>ยืนยัน</b></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import Vaccine from "@/components/farm/pig/cycles/vaccine";
  import {
    mapGetters,
    mapActions,
    mapState
  } from "vuex";
  export default {
    components: {
      Vaccine
    },
    data() {
      return {
        updateGet: false,
        valid: true,
        datas: [],
        dialog: false,
        dialogValue: false,
        gravid_dialogValue: false,
         gravid_dialogValue2: false,
        gravid_id: null,
        gravidDialog: false,
        gravid_date: null,
        gravid_out: null,
        gravid_remark: null,
         gravid_out_remark: null,
        gravid: 3,
        tmp: "",
        preData: {
          pig_cycle_id: null,
          pig_id: null,
          breeder_a: null,
          breeder_b: null,
          breeder_c: null,
          breed_date: null,
          delivery_date: null,
          breed_week: null
        },
        setData: {
          pig_cycle_id: null,
          pig_id: null,
          breeder_a: null,
          breeder_b: null,
          breeder_c: null,
          breed_date: null,
          delivery_date: null,
          breed_week: null
        }
      };
    },
    props: {
      id: null,
      cycle: null
    },
    computed: {
      ...mapState({
        pig: state => state.cycles.pigData
      })
    },
    methods: {
      checkData(){
        let i_a = true;
        let i_b = true;
        let i_c = true;
        if(this.setData.breeder_a == null ){ i_a = false;
        }else if(this.setData.breeder_a.length == 0){ i_a = false;}

        if(this.setData.breeder_b == null){
          if(i_a != true){
             i_b = false;
          }else{
          this.setData.breeder_b  = '';
          }
        }else if(this.setData.breeder_b.length == 0){ i_b = false;}


        if(this.setData.breeder_c == null  ){
          if(i_a != true){
             i_c = false;
          }else{
                 this.setData.breeder_c  = '';
          }
        }else if(this.setData.breeder_c.length == 0){ i_c = false;}

        if(i_a && i_b && i_c){
          return true;
        }else if(i_a && i_b && !i_c){
             return true;
        }
        else{
          this.setData.breeder_b  = null;
          this.setData.breeder_c  = null;
          return false;}
      },
      clearData(){
          this.setData= new Object();
        this.setData = {
          pig_cycle_id: null,
          pig_id: null,
          breeder_a: null,
          breeder_b: null,
          breeder_c: null,
          breed_date: null,
          delivery_date: null,
          breed_week: null
        }
      },
      dateNotNull(){
        let y = this.$moment();
        if(this.gravid_date == ''){
        this.gravid_date = y
          .locale("th")
          .add(543, "years")
          .format("DD-MM-YYYY");
        }
      },
       dateNotNull2(){
        let y = this.$moment();
        if(this.gravid_out == ''){
        this.gravid_out = y
          .locale("th")
          .add(543, "years")
          .format("DD-MM-YYYY");
        }
      },
      gravidConvert() {
        this.gravid_date = this.$moment(this.tmp)
          .locale("th")
          .add(543, "years")
          .format("DD-MM-YYYY");
        this.tmp = null;
        this.gravid_dialogValue = false;
      },
      gravidDialogClose() {
           let y = this.$moment();
        this.gravid_date = y
          .locale("th")
          .add(543, "years")
          .format("DD-MM-YYYY");
        this.tmp = null;
        this.gravid_dialogValue = false;
      },

   gravidConvert2() {
        this.gravid_out = this.$moment(this.tmp)
          .locale("th")
          .add(543, "years")
          .format("DD-MM-YYYY");
        this.tmp = null;
        this.gravid_dialogValue2 = false;
      },
      gravidDialogClose2() {
           let y = this.$moment();
        this.gravid_out = y
          .locale("th")
          .add(543, "years")
          .format("DD-MM-YYYY");
        this.tmp = null;
        this.gravid_dialogValue2 = false;
      },

      gravidOpen(tmp, tmp2, tmp3,tmp4) {
        let y = this.$moment();
        this.gravid_date = y
          .locale("th")
          .add(543, "years")
          .format("DD-MM-YYYY");

        this.gravid_out = y
          .locale("th")
          .add(543, "years")
          .format("DD-MM-YYYY");
        this.gravidDialog = true;
        this.gravid_id = tmp;
            this.gravid = tmp2;
        if (tmp3 != null) {
          this.gravid_date = tmp3;
        }
         this.gravid = tmp4;
      },
      gravidClose() {
        this.tmp = null;
        this.gravid_date = null;
        this.gravid = 0;
        this.gravidDialog = false;
      },
      gravidSave() {
        var i_tmp = this.gravid;
        if (i_tmp == 0) {
          i_tmp = 3;
        }
        let preData = {
          gravid_id: this.gravid_id,
          gravid: i_tmp,
          gravid_out: this.gravid_out,
          gravid_date: this.gravid_date,
          gravid_remark: this.gravid_remark,
           gravid_out_remark: this.gravid_out_remark
        };
        let gravid = this.$store.dispatch("breeder/gravid", preData);
        this.load();
        this.getData();
        this.gravidClose();
      },
      dialogClose() {
        this.dialog = false;
        this.updateGet = false;
        this.clearData();
      },
      dateCancle() {
        this.tmp = "";
        this.setData.breed_date = "";
        this.setData.delivery_date = "";
        this.dialogValue = false;
      },
      dateConvert() {
        let y_tmp = this.$moment(this.tmp);
        let u_tmp = this.$moment(this.tmp).add(116, "days");
        this.setData.delivery_date = this.$moment(this.tmp)
          .locale("th")
          .add(543, "years")
          .add(116, "days")
          .format("DD-MM-YYYY");
        this.setData.breed_week = u_tmp.diff(y_tmp, "week");
        let tmpDate = this.$moment(this.tmp)
          .locale("th")
          .add(543, "years")
          .format("DD-MM-YYYY");
        this.setData.breed_date = tmpDate;
        this.dialogValue = false;
      },
      dateTothai(tmp) {
        let start = this.$moment(tmp)
          .locale("th")
          .add(543, "years")
          .format("DD-MM-YYYY");
        return start;
      },
      checkNull: function(tmp) {
        var ch = true;
        Object.keys(tmp).forEach(function(key) {
          if (tmp[key] == null) {
            ch = false;
            key = false;
          }
        });
        return ch;
      },
      destroy: async function(tmp) {
        if (confirm("แน่ใจใช่ไหมว่าต้องการที่จะลบข้อมูล")) {
          this.$store.dispatch("breeder/destroy", tmp);
          this.load();
          this.getData();
        }
      },
      updateOpen: async function(tmp) {
        this.updateGet = true;
        this.dialog = true;
        this.setData = tmp;
      },
      update: async function() {
        this.setData.pig_id = this.id;
        this.setData.pig_cycle_id = this.pig.cycles[this.cycle].id;
              let u_breed = this.checkData();
        let check = this.$store.dispatch("cycles/checkNull", this.setData);
        if (check && u_breed) {
          await this.$store.dispatch("breeder/update", this.setData);
          this.load();
          this.getData();
          this.dialogClose();
        } else {
          alert("กรุณาระบุข้อมูลให้ครบ");
        }
      },
      save: async function() {
        this.setData.pig_id = this.id;
        this.setData.pig_cycle_id = this.pig.cycles[this.cycle].id;
        let u_breed = this.checkData();

        let check = this.checkNull(this.setData);
        if (check && u_breed) {
          await this.$store.dispatch("breeder/save", this.setData);
          this.dialog = false;
          this.load();
          this.getData();
          this.dialogClose();
        } else {
          alert("กรุณาระบุข้อมูลให้ครบ");
        }
      },
      getData: async function() {
        this.load();
        this.datas = this.pig.cycles[this.cycle].breeders;
      },
      preLoad() {
        this.load();
        this.datas = this.pig.cycles[this.cycle].birth;
      },
      load: async function() {
        let pig = await this.$store.dispatch("cycles/getById", this.id);
        this.datas = this.pig.cycles[this.cycle].breeders;
      }
    },
    mounted() {
      this.preLoad();
    }
  };
</script>
