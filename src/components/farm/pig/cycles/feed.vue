<template>
  <v-layout row>
    <v-flex xs6>
      <h2>
        <v-icon>mdi-gentoo</v-icon>การเลี้ยงลูก</h2>
      <v-btn class="blueONblue" dark @click="dialog=true">
        <v-icon>mdi-plus-circle</v-icon>เพิ่มข้อมูล</v-btn>
      <h3  class="card-border mrt-10 violet  box-blueFX pd-10" ><v-icon>mdi-pig</v-icon>ลูกของตนเอง</h3>
      <div v-for="brd,index in pig.cycles[cycle].birth" class="pd-12">
        <div class="card-border violet pd-10">
          <h3 class="blx nm pd-10">
            <v-icon class="blx">mdi-calendar</v-icon>
            วันที่คลอด: {{brd.birth_date}}
          </h3>
          <h3 class="nm pdl-10" style="color: #00cc00;">
            <b>จำนวนหมูที่รอดชีวิต : {{brd.life}} ตัว</b> </h3>
          <h4 class="nm pdl-10" style="color:blue;">
            จำนวนหมูทั้งหมด : {{brd.pig_count}} ตัว</h4>
          <h4 class="nm pdl-10" style="color: #B03060;">ตาย : {{brd.dead}} ตัว</h4>
          <h4 class="nm pdl-10" style="color: #B03060;">มัมมี่ : {{brd.mummy}} ตัว</h4>
          <h4 class="nm pdl-10" style="color: #B03060;">พิการ : {{brd.deformed}} ตัว</h4>
          <h3 class="nm pdl-10" style="color: #00cc00;">น้ำหนักเฉลี่ย{{brd.pig_weight_avg}} กิโลกรัม </h3>
          <div v-for="wp,i in spitting(brd.pig_weight)">
            <h4 class="nm pdl-10" style="color: green;"><b>น้ำหนักหมูตัวที่ {{i+1}} :</b> {{wp}} กิโลกรัม</h4>
          </div>
        </div>
      </div>
      <h3 class="card-border mrt-10   box-greenFX pd-10"><v-icon>mdi-pig</v-icon>รับเลี้ยง</h3>
      <div v-for="brd,index in i_datas">
        <div v-if="brd.feed_type == 1" class="pd-12">
          <div class="card-border violet pd-10">
            <h2 class="blx nm pd-10">
              <v-icon class="blx">mdi-pig</v-icon>
              ไอดีแม่เก่า: {{brd.pig_id_old}}
            </h2>
            <h3 class="blx nm pd-10">
              <v-icon class="blx">mdi-calendar</v-icon>
              วันที่: {{brd.feed_date}}
            </h3>
            <h3 class="nm pdl-10" style="color: #00cc00;">
              <b>จำนวนหมูทั้งหมด : {{brd.pig_count}} ตัว</b> </h3>
            <h3 class="nm pdl-10" style="color: green;"><b>น้ำหนักเฉลี่ย:</b> {{brd.pig_weight_avg}} กิโลกรัม</h3>
       <p class="nm pdl-10">หมายเตุ :
              {{brd.pig_remark}}
            </p>
            <v-btn @click="updateOpen(brd)" style="margin-top:-100px; float:right;" small color="orange" fab dark>
              <v-icon>mdi-calendar-edit</v-icon>
            </v-btn>
            <v-btn @click="destroy(brd)" style="margin-top:-50px; float:right;" small color="red" fab dark>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
      <h3 class="card-border mrt-10 red  box-red pd-10"><v-icon>mdi-pig</v-icon>ฝากเลี้ยง</h3>
      <div v-for="brd,index in i_datas">
        <div v-if="brd.feed_type == 2" class="pd-12">
          <div class="card-border redb pd-10">
            <h2 class="blx nm pd-10">
              <v-icon class="blx">mdi-pig</v-icon>
              ไอดีแม่ใหม่: {{brd.pig_id_new}}
            </h2>
            <h3 class="blx nm pd-10">
              <v-icon class="blx">mdi-calendar</v-icon>
              วันที่: {{brd.feed_date}}
            </h3>
            <h3 class="nm pdl-10" style="color: red;">
              <b>จำนวนหมูทั้งหมด :&nbsp;&nbsp;-{{brd.pig_count}} ตัว</b> </h3>
            <h3 class="nm pdl-10" style="color: green;"><b>น้ำหนักเฉลี่ย:</b> {{brd.pig_weight_avg}} กิโลกรัม</h3>
           <p class="nm pdl-10">หมายเหตุ :
              {{brd.pig_remark}}
            </p>
            <v-btn @click="updateOpen(brd)" style="margin-top:-100px; float:right;" small color="orange" fab dark>
              <v-icon>mdi-calendar-edit</v-icon>
            </v-btn>
            <v-btn @click="destroy(brd)" style="margin-top:-50px; float:right;" small color="red" fab dark>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </v-flex>
    <v-flex xs6>
      <Vaccine :id="id" :cycle="cycle" :cycle_type="3"></Vaccine>
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
                <v-text-field class="box-gr mar-top pd-20" prepend-icon="mdi-calendar" v-model="setData.feed_date" slot="activator" label="วันที่" readonly></v-text-field>
                <v-date-picker v-model="tmp" locale="th" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="dateCancle()">Cancel</v-btn>
                  <v-btn flat color="primary" @click="dateConvert()">OK</v-btn>
                </v-date-picker>
              </v-dialog>
              <div  class="box-blueFX mar-top pd-10" v-if="updateGet != true">
                <v-radio-group v-model="setData.feed_type">
                  <v-radio key="1" label="รับเลี้ยง +" value="1"></v-radio>
                  <v-radio key="2" label="ฝากเลี้ยง -" value="2"></v-radio>
                </v-radio-group>
              </div>
                 <div class="box-greenLN mar-top pd-10">
              <v-text-field  prepend-icon="mdi-calendar" v-if="setData.feed_type == 1" v-model="setData.pig_id_old" label="ไอดีแม่เก่า"></v-text-field>
              <v-text-field  prepend-icon="mdi-calendar"  v-if="setData.feed_type == 2" v-model="setData.pig_id_new" label="ไอดีแม่ใหม่"></v-text-field>

<v-text-field prepend-icon="mdi-pig" v-model.number="setData.pig_count" label="จำนวนลูก"></v-text-field>
              <v-text-field prepend-icon="mdi-weight" v-model="setData.pig_weight_avg" label="น้ำหนักเฉลีย"></v-text-field>
              <v-textarea  outline v-model="setData.pig_remark" label="หมายเหตุ"  ></v-textarea>
            </div>

            </v-flex>
            <!---     <v-flex xs6 v-if="setData.pig_count" class="mrl-10 pd-10 blueONblue">
             <div v-for="x in setData.pig_count">
                  <v-text-field :label="'หมูตัวที่'+x" v-model="tmp_weight[x-1]"></v-text-field>
                </div>
                <v-btn @click="avgCal()">คำนวณค่าเฉลี่ย</v-btn>
              </v-flex> ---->
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
        defDate:null,
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
          feed_type: null,
          feed_date: null,
          pig_id_old: null,
          pig_id_new: null,
          pig_count: null,
          pig_weight: null,
          pig_remark: null,
          pig_weight_avg: null,
        },
        setData: {
          pig_id: null,
          pig_cycle_id: null,
          feed_type: null,
          feed_date: null,
          pig_id_old: null,
          pig_id_new: null,
          pig_count: null,
          pig_weight: null,
          pig_remark: null,
          pig_weight_avg: null,
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
      clearData() {
        this.setData = new Object();
        this.setData =  {
          pig_id: null,
          pig_cycle_id: null,
          feed_type: null,
          feed_date: null,
          pig_id_old: null,
          pig_id_new: null,
          pig_count: null,
          pig_weight: null,
          pig_remark: null,
          pig_weight_avg: null,
        }
        this.tmp_weight = [];
      },
      spitting(tmp) {
        return tmp.split(",");
      },
      pigCount() {
        return this.setData.pig_count;
      },
      avgCal() {
        if (this.setData.pig_count < this.tmp_weight.length) {
          let i_setdata = [];
          for (var i = 0; i < this.setData.pig_count; i++) {
            i_setdata[i] = this.tmp_weight[i];
          }
          let i_tmp = this.$store.dispatch("cycles/calAvg", i_setdata);
          this.setData.pig_weight_avg = this.avg.toFixed(2);
          this.setData.pig_weight = i_setdata.toString();
        } else {
          let i_tmp = this.$store.dispatch("cycles/calAvg", this.tmp_weight);
          this.setData.pig_weight_avg = this.avg.toFixed(2);
        }
      },
      dialogClose() {
        this.dialog = false;
        this.updateGet = false;
        this.tmp_weight = [];
          this.setData= new Object();
        this.setData = this.preData;
        this.clearData();
         this.defDates();
         this.load();
      },
      dateCancle() {
        this.tmp = '';
        this.setData.breed_date = '';
        this.setData.delivery_date = '';
        this.dialogValue = false;
         this.defDates();
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
        return ch;
      },
      destroy: async function(tmp) {
        if (confirm("แน่ใจใช่ไหมว่าต้องการที่จะลบข้อมูล")) {
          this.$store.dispatch("feed/destroy", tmp);
          this.load();
          this.getData();
        }
      },
      updateOpen: async function(tmp) {
        this.updateGet = true;
        this.dialog = true;
        this.setData = tmp;
        let i_tmp = tmp.pig_weight.split(",");
        //this.setData.pig_count = i_tmp.length;
        console.log(i_tmp);
        this.tmp_weight = i_tmp;
      },
      update: async function() {
        if (this.setData.pig_count < this.tmp_weight.length) {
          let i_setdata = [];
          for (var i = 0; i < this.setData.pig_count; i++) {
            i_setdata[i] = this.tmp_weight[i];
          }
           if( this.setData.pig_remark == ''|| this.setData.pig_remark == null){
          this.setData.pig_remark = 'ไม่มี';
        }
          let i_tmp = this.$store.dispatch("cycles/calAvg", i_setdata);
          this.setData.pig_weight_avg = this.avg.toFixed(2);
          this.setData.pig_weight = i_setdata.toString();
        } else {
          this.setData.pig_weight = this.tmp_weight.toString();
        }
        this.setData.pig_id = this.id;
        this.setData.pig_cycle_id = this.pig.cycles[this.cycle].id;
        let check = this.$store.dispatch("cycles/checkNull", this.setData);
        if (check) {
          await this.$store.dispatch("feed/update", this.setData);
          this.load();
          this.getData();
          this.tmp_weight = [];
          this.dialogClose();
          this.preLoad();
        } else {
          alert('กรุณาระบุข้อมูลให้ครบ');
        }
      },
      save: async function() {
        this.setData.pig_weight = this.tmp_weight.toString();
        this.setData.pig_id = this.id;
        this.setData.pig_weight = 0;
        if(this.setData.feed_type == 1 && this.setData.pig_id_new == null){this.setData.pig_id_new = 0}
         if(this.setData.feed_type == 2 && this.setData.pig_id_old == null){this.setData.pig_id_old = 0}
        if( this.setData.pig_remark == null){
          this.setData.pig_remark = 'ไม่มี';
        }
        this.setData.pig_cycle_id = this.pig.cycles[this.cycle].id;
        let check = this.checkNull(this.setData);
        if (check) {
          await this.$store.dispatch("feed/save", this.setData);
          this.dialog = false;
          this.tmp_weight = [];
          this.load();
          this.getData();
          this.dialogClose();
        } else {
          alert('กรุณาระบุข้อมูลให้ครบ');
        }
      },
      getData: async function() {
        this.load();
        this.datas = this.pig.cycles[this.cycle].birth;
        this.i_datas = this.pig.cycles[this.cycle].feed;
      },
      preLoad() {
        this.datas = this.pig.cycles[this.cycle].birth;
        this.i_datas = this.pig.cycles[this.cycle].feed;
      },
      load: async function() {
        let pig = await this.$store.dispatch("cycles/getById", this.id);
        this.datas = this.pig.cycles[this.cycle].birth;
        this.i_datas = this.pig.cycles[this.cycle].feed;
      },
           defDates(){
      let y = this.$moment();
      this.defDate = y;
      this.dateConvertDefault();
      },
      dateConvertDefault() {
        let tmpDate = this.$moment(this.defDate)
          .locale('th')
          .add(543, "years")
          .format("DD-MM-YYYY");
        this.setData.feed_date = tmpDate;
        this.dialogValue = false;
      }
    },
    mounted() {
      this.defDates();
      this.getData();
      this.load();
    },
    created(){
   this.getData();
      this.load();
    }
  };
</script>
