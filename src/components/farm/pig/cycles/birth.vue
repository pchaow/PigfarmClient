<template>
  <v-layout row>

    <v-flex xs6>
      <h2>
        <v-icon>mdi-freebsd</v-icon>การคลอด</h2>
      <v-btn class="blueONblue" dark @click="dialog=true">
        <v-icon>mdi-plus-circle</v-icon>เพิ่มข้อมูล</v-btn>


      <div v-for="brd,index in datas" class="pd-12">
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

           <v-btn @click="updateOpen(brd)" style="margin-top:-100px; float:right;" small color="orange" fab dark>
            <v-icon>mdi-calendar-edit</v-icon>
          </v-btn>
          <v-btn @click="destroy(brd)" style="margin-top:-50px; float:right;" small color="red" fab dark>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </div>

    </v-flex>
    <v-flex xs6>
      <Vaccine :id="id" :cycle="cycle" :cycle_type="2"></Vaccine>
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
                <v-text-field class="box-gr mar-top pd-20" prepend-icon="mdi-calendar" v-model="setData.birth_date" slot="activator" label="วันที่คลอด" readonly></v-text-field>
                <v-date-picker v-model="tmp" locale="th" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="dateCancle()">Cancel</v-btn>
                  <v-btn flat color="primary" @click="dateConvert()">OK</v-btn>
                </v-date-picker>
              </v-dialog>

             <div class="box-greenFX mar-top pd-20">

              <v-text-field  mask="###" prepend-icon="mdi-heart" @blur="lifeNotNull()" type="tel" value="0" v-model.number="setData.life" label="มีชีวิต"></v-text-field>
              <v-text-field mask="###" prepend-icon="mdi-heart-off" @blur="deadNotNull() "    type="tel" v-model.number="setData.dead" label="ตาย"></v-text-field>
              <v-text-field  mask="###" prepend-icon="mdi-heart-broken" @blur="mummyNotNull()"  type="tel" v-model.number="setData.mummy" label="มัมมี่"></v-text-field>
              <v-text-field  mask="###" prepend-icon="mdi-heart-half-full"  @blur="deformedNotNull()" type="tel" v-model.number="setData.deformed" label="พิการ"></v-text-field>

             </div>
                 <h3 class="box-green mar-top pd-20"><v-icon>mdi-pig</v-icon> จำนวนหมูทั้งหมด {{pigCount()}}</h3>
              <v-text-field class="box-blue mar-top pd-20" prepend-icon="mdi-weight-kilogram"  readonly v-model="setData.pig_weight_avg" label="น้ำหนักเฉลีย"></v-text-field>
            </v-flex>
            <v-flex xs6 v-if="setData.life" class="mrl-10 pd-10 blueONblue">
              <div v-for="x in setData.life">
                <v-text-field :label="'หมูตัวที่'+x" v-model="tmp_weight[x-1]"></v-text-field>
              </div>
              <v-btn @click="avgCal()" class="darkBg" dark> <v-icon>mdi-weight</v-icon>คำนวณค่าเฉลี่ย</v-btn>
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
        defDate:null,
        updateGet: false,
        valid: true,
        datas: [],
        dialog: false,
        dialogValue: false,
        tmp: '',
        tmp_weight: [],
        preData: {
          pig_id: null,
          pig_cycle_id: null,
          birth_date: null,
          pig_count: 0,
          life: 0,
          dead: 0,
          mummy: 0,
          deformed: 0,
          pig_weight: null,
          pig_weight_avg: null,

        },
        setData: {
          pig_id: null,
          pig_cycle_id: null,
          birth_date: null,
          pig_count: 0,
          life: 0,
          dead: 0,
          mummy: 0,
          deformed: 0,
          pig_weight: null,
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
    test(){
    if(this.setData.dead == ''){
  this.setData.dead = 0;
    }
    },
     lifeNotNull(){if(this.setData.life == '')this.setData.life = 0;},
     deadNotNull(){if(this.setData.dead == '')this.setData.dead = 0;},
     mummyNotNull(){if(this.setData.mummy == '')this.setData.mummy = 0;},
     deformedNotNull(){if(this.setData.deformed == '')this.setData.deformed = 0;},
          clearData(){
          this.setData= new Object();
        this.setData = this.preData;
      },
      spitting(tmp){
        return tmp.split(",");
      },      pigCount() {
          this.setData.pig_count = this.setData.life + Number(this.setData.dead) + Number(this.setData.mummy) + Number(this.setData.deformed);
          return this.setData.pig_count;

      },
      avgCal() {
        if(this.setData.life < this.tmp_weight.length){
          let i_setdata = [];
            for(var i=0; i<this.setData.life;i++){
              i_setdata[i] = this.tmp_weight[i];
            }
             let i_tmp = this.$store.dispatch("cycles/calAvg", i_setdata);

             this.setData.pig_weight_avg = this.avg.toFixed(2);
             this.setData.pig_weight = i_setdata.toString();
        }else{
        let i_tmp = this.$store.dispatch("cycles/calAvg", this.tmp_weight);
        this.setData.pig_weight_avg = this.avg.toFixed(2);
        }
      },
      clearData(){
        this.setData= new Object();
         this.setData = {
          pig_id: null,
          pig_cycle_id: null,
          birth_date: null,
          pig_count: 0,
          life: 0,
          dead: 0,
          mummy: 0,
          deformed: 0,
          pig_weight: null,
          pig_weight_avg: null,
        }
         this.tmp_weight = [];
      },
      dialogClose() {
        this.dialog = false;
        this.updateGet = false;
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
        this.setData.delivery_date = this.$moment(this.tmp)
          .locale('th')
          
          .add(116, "days")
          .format("YYYY-MM-DD");
        let tmpDate = this.$moment(this.tmp)
          .locale('th')
          
          .format("YYYY-MM-DD");
        this.setData.birth_date = tmpDate;
        this.dialogValue = false;
      },
      dateTothai(tmp) {
        let start = this.$moment(tmp)
          .locale('th')
          
          .format("YYYY-MM-DD");
        return start;
      },
      checkNull: function(tmp) {
        var ch = true;
        try {
          Object.keys(tmp).forEach(function(key) {
          if (tmp[key].toString() == null ) {
            ch = false;
            key = false;
          }
        });
        return ch;
        } catch (error) {
          return false;
        }


      },
      destroy: async function(tmp) {

        if (confirm("แน่ใจใช่ไหมว่าต้องการที่จะลบข้อมูล")) {
          this.$store.dispatch("birth/destroy", tmp);
          this.load();
          this.getData();
        }
      },

      updateOpen: async function(tmp) {
         this.pigCount();
        this.updateGet = true;
        this.dialog = true;
        this.setData = tmp;
        let i_tmp = tmp.pig_weight.split(",");
        console.log(i_tmp);
        this.tmp_weight = i_tmp;

      },
      update: async function() {
            this.pigCount();
        this.setData.pig_id = this.id;
        this.setData.pig_cycle_id = this.pig.cycles[this.cycle].id;
        if(this.setData.life < this.tmp_weight.length){
          let i_setdata = [];
            for(var i=0; i<this.setData.life;i++){
              i_setdata[i] = this.tmp_weight[i];
            }
              let i_tmp = this.$store.dispatch("cycles/calAvg", i_setdata);
             this.setData.pig_weight_avg = this.avg.toFixed(2);
             this.setData.pig_weight = i_setdata.toString();
        }else{
            this.setData.pig_weight = this.tmp_weight.toString();
        }

        let check = this.$store.dispatch("cycles/checkNull", this.setData);
        if (check) {
          await this.$store.dispatch("birth/update", this.setData);
          this.load();
          this.getData();
           this.tmp_weight = [];
           this.dialogClose();
        } else {
          alert('กรุณาระบุข้อมูลให้ครบ');
        }
      },
      save: async function() {
        this.setData.pig_weight = this.tmp_weight.toString();
        this.setData.pig_id = this.id;
        this.setData.pig_cycle_id = this.pig.cycles[this.cycle].id;
      let check = this.checkNull(this.setData);
        if (check) {
          await this.$store.dispatch("birth/save", this.setData);
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
      },
      preLoad(){
        this.datas = this.pig.cycles[this.cycle].birth;
      },
      load: async function() {
        let pig = await this.$store.dispatch("cycles/getById", this.id);
        this.datas = this.pig.cycles[this.cycle].birth;
      },
       defDates(){
      let y = this.$moment();
      this.defDate = y;
      this.dateConvertDefault();
      },
      dateConvertDefault() {
       this.setData.delivery_date = this.$moment(this.defDate)
          .locale('th')
          
          .add(116, "days")
          .format("YYYY-MM-DD");
        let tmpDate = this.$moment(this.defDate)
          .locale('th')
          
          .format("YYYY-MM-DD");
        this.setData.birth_date = tmpDate;
        this.dialogValue = false;
      }
    },
    mounted() {
      this.defDates();
      this.preLoad();
    }
  };
</script>
