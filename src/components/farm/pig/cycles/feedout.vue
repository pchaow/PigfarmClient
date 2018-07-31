<template>
  <v-layout row>

    <v-flex xs12>
      <h2>
        <v-icon>mdi-eyedropper</v-icon>จำหน่ายออก</h2>
      <v-btn class="blueONblue" dark @click="dialog=true">
        <v-icon>mdi-plus-circle</v-icon>เพิ่มข้อมูล</v-btn>

      <div v-for="brd,index in datas">

          <div class="card-border violet pd-10 mrt-12">
            <h3 class="blx nm pd-10">
              <v-icon class="blx">mdi-calendar</v-icon>
              วันที่: {{brd.feed_date}}
            </h3>
            <h3 class="nm pdl-10" style="color: #00cc00;">
              <b>จำนวนหมูทั้งหมด : {{brd.pig_count}} ตัว</b> </h3>
            <h3 class="nm pdl-10" style="color: green;"><b>สาเหตุ:</b> {{brd.feed_type}} </h3>


            <v-btn @click="updateOpen(brd)" style="margin-top:-100px; float:right;" small color="orange" fab dark>
              <v-icon>mdi-calendar-edit</v-icon>
            </v-btn>
            <v-btn @click="destroy(brd.id)" style="margin-top:-50px; float:right;" small color="red" fab dark>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
        </div>

      </div>

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
          <v-layout row>
            <v-flex xs>
              <v-dialog ref="dialogRef" persistent v-model="dialogValue" lazy full-width width="290px">
                <v-text-field v-model="setData.feed_date" slot="activator" label="วันที่" readonly></v-text-field>
                <v-date-picker v-model="tmp" locale="th" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="dateCancle()">Cancel</v-btn>
                  <v-btn flat color="primary" @click="dateConvert()">OK</v-btn>
                </v-date-picker>
              </v-dialog>
                <h3>สาเหตุ</h3>
                <v-radio-group v-model="setData.feed_type">
                  <v-radio key="1" label="ตาย" value="ตาย"></v-radio>
                  <v-radio key="2" label="พิการ" value="พิการ"></v-radio>
                   <v-radio key="3" label="คัดทิ้ง" value="คัดทิ้ง"></v-radio>
                </v-radio-group>

              <v-text-field v-model.number="setData.pig_count" label="จำนวนลูก"></v-text-field>
            </v-flex>
          </v-layout>
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
        i_datas: [],
        f_datas: [],
        dialog: false,
        dialogValue: false,
        tmp: '',
        tmp_weight: [],
        preData: {
          pig_id: null,
          pig_cycle_id: null,
          pig_count: null,
          feed_type: null,
          feed_why_type: 0,
          feed_date: null
        },
        setData: {
          pig_id: null,
          pig_cycle_id: null,
          pig_count: null,
          feed_type: null,
          feed_why_type: 0,
          feed_date: null
        }
        //----------TOOLS-------------//
      };
    },
    props: {
      id: null,
      cycle: null
    },
    computed: {

      ...mapState({
        pig: state => state.cycles.pigData,
        avg: state => state.cycles.pigAvg
      })
    },
    methods: {
      spitting(tmp) {
        return tmp.split(",");
      },
      pigCount() {
        return this.setData.pig_count;
      },
      avgCal() {
        let i_tmp = this.$store.dispatch("cycles/calAvg", this.tmp_weight);
        this.setData.pig_weight_avg = this.avg.toFixed(2);
      },
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
        let tmpDate = this.$moment(this.tmp)
          .locale('th')
          .add(543, "years")
          .format("DD-MM-YYYY");
        this.setData.feed_date = tmpDate;
        this.dialogValue = false;
      },
      checkNull: function(tmp) {
        var ch = true;
        Object.keys(tmp).forEach(function(key) {
          // console.log(key+"="+c[key] +"=>"+ch);
          if (tmp[key] == null) {
            ch = false;
            key = false;
          }
        });
        console.log(ch);
        return ch;
      },
      destroy: async function(tmp) {

        if (confirm("แน่ใจใช่ไหมว่าต้องการที่จะลบข้อมูล")) {
          this.$store.dispatch("feedout/destroy", tmp);
          this.load();
          this.getData();
        }
      },
      updateOpen: async function(tmp) {
        this.updateGet = true;
        this.dialog = true;
        this.setData = tmp;

        let i_tmp = tmp.pig_weight.split(",");
        this.setData.pig_count = i_tmp.length;
        console.log(i_tmp);
        this.tmp_weight = i_tmp;
      },
      update: async function() {

        this.setData.pig_id = this.id;
        this.setData.pig_cycle_id = this.pig.cycles[this.cycle].id;
        let check = this.$store.dispatch("cycles/checkNull", this.setData);
        if (check) {
          await this.$store.dispatch("feedout/update", this.setData);
          this.load();
          this.getData();
          this.tmp_weight = [];
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
          await this.$store.dispatch("feedout/save", this.setData);
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
        this.datas = this.pig.cycles[this.cycle].feedout;

      },
       preLoad(){
        this.datas = this.pig.cycles[this.cycle].feedout;
      },
      load: async function() {
        let pig = await this.$store.dispatch("cycles/getById", this.id);
        this.datas = this.pig.cycles[this.cycle].feedout;

      }
    },
    mounted() {
      this.preLoad();
    }
  };
</script>
