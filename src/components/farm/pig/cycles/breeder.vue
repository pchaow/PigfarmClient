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

          <h4 class="nm pdl-10" style="color: #00cc00;">
            วันที่คาดว่าจะคลอด : {{bd.delivery_date}}</h4>
          <h4 class="nm pdl-10" style="color: #FA8072;">
            พ่อพันธ์ตัวที่ 1 : {{bd.breeder_a}}</h4>
          <h4 class="nm pdl-10" style="color: #FA8072;">
            พ่อพันธ์ตัวที่ 2 : {{bd.breeder_b}}</h4>
          <h4 class="nm pdl-10" style="color: #FA8072;">
            พ่อพันธ์ตัวที่ 3 : {{bd.breeder_c}}</h4>
          <h4 class="nm pdl-10" style="color: #B03060;">
            ชุดการผสม : {{bd.breed_week}}</h4>
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
                  <v-text-field dark slot="activator" label="วันที่ผสมพันธ์ุ" v-model="setData.breed_date" readonly></v-text-field>
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
                <v-text-field dark label="พ่อพันธ์ุตัวที่ 1" v-model="setData.breeder_a"></v-text-field>
                <v-text-field dark label="พ่อพันธ์ุตัวที่ 2" v-model="setData.breeder_b"></v-text-field>
                <v-text-field dark label="พ่อพันธ์ุตัวที่ 3" v-model="setData.breeder_c"></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-card>

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
        tmp: '',
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
      dialogClose() {
        this.dialog = false;
        this.updateGet = false;
        this.setData = this.preData;
      },
      dateCancle() {
        this.tmp = '';
        this.setData.breed_date = '';
        this.setData.delivery_date = '';
        this.dialogValue = false;
      },
      dateConvert() {
        this.setData.delivery_date = this.$moment(this.tmp)
          .locale('th')
          .add(543, "years")
          .add(116, "days")
          .format("DD-MM-YYYY");
        let tmpDate = this.$moment(this.tmp)
          .locale('th')
          .add(543, "years")
          .format("DD-MM-YYYY");
        this.setData.breed_date = tmpDate;
        this.dialogValue = false;
      },
      dateTothai(tmp) {
        let start = this.$moment(tmp)
          .locale('th')
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
        let check = this.$store.dispatch("cycles/checkNull", this.setData);
        if (check) {
          await this.$store.dispatch("breeder/update", this.setData);

          this.load();
          this.getData();
              this.dialogClose();
        } else {
          alert('กรุณาระบุข้อมูลให้ครบ');
        }
    

      },
      save: async function() {
        this.setData.pig_id = this.id;
        this.setData.pig_cycle_id = this.pig.cycles[this.cycle].id;
        let check = this.checkNull(this.setData);
        if (check) {
          await this.$store.dispatch("breeder/save", this.setData);
          this.dialog = false;
          this.load();
          this.getData();
           this.dialogClose();
        } else {
          alert('กรุณาระบุข้อมูลให้ครบ');
        }
     

      },
      getData: async function() {
        this.load();
        this.datas = this.pig.cycles[this.cycle].breeders;
      },
       preLoad(){
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
