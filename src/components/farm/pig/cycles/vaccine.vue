<template>
  <v-layout row>
    <v-flex xs12>
      <h2>
        <v-icon>mdi-needle</v-icon>ยาและวัคซีน</h2>
      <v-btn class="box-purple" dark @click="openDialog()">
        <v-icon>mdi-plus-circle</v-icon>เพิ่มข้อมูลยาและวัคซีน</v-btn>
      <div v-for="vd in datas">
        <div v-if="vd.cycle_type == cycle_type" class="pd-12">
          <div class="card-border violet pd-10">
            <h3 class="blx nm pd-10">
              <v-icon class="blx">mdi-calendar</v-icon>
              วันที่ใช้: {{vd.date}}
            </h3>
            <h3 class="nm pdl-10" style="color: brown;">
              ประเภท : {{vd.name}}</h3>
            <h3 class="nm pdl-10" style="color: brown;">
              <div v-if="vd.display.display_name != null">
                ชื่อ : {{ vd.display.display_name }}
              </div>
              <div v-if="vd.display.display_name == null">
                ชื่อ : {{ vd.display }}
              </div>
            </h3>
            <h3 class="nm pdl-10" style="color: brown;">
              ราคา : {{vd.cost}}</h3>
            <v-btn @click="updateOpen(vd)" style="margin-top:-100px; float:right;" small color="orange" fab dark>
              <v-icon>mdi-calendar-edit</v-icon>
            </v-btn>
            <v-btn @click="destroy(vd)" style="margin-top:-50px; float:right;" small color="red" fab dark>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </v-flex>
    <v-dialog v-model="dialog" scrollable persistent :overlay="false" max-width="500px" transition="dialog-transition">
      <v-card>
        <v-toolbar dark color="box-purple">
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
          <v-dialog ref="dialogRef" persistent v-model="dialogValue" lazy full-width width="290px">
            <v-text-field v-model="setData.date" slot="activator" prepend-icon="mdi-calendar" label="วันที่ให้ยาหรือวัคซีน" readonly></v-text-field>
            <v-date-picker v-model="tmp" locale="th" scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="dateCancle()">Cancel</v-btn>
              <v-btn flat color="primary" @click="dateConvert()">OK</v-btn>
            </v-date-picker>
          </v-dialog>

          <v-radio-group v-if="updateGet == false" v-model="type">
            <v-radio key="1" label="วัคซีน" value="VACCINE"></v-radio>
            <v-radio key="2" label="ยา" value="MEDICINE"></v-radio>
          </v-radio-group>

          <v-select v-if="type=='VACCINE'" prepend-icon="mdi-needle"  v-model="setData.display" :hint="`${selectV.name}, ${selectV.display_name}`" :items="vaccine" item-text="display_name" item-value="name" :label="select" persistent-hint return-object single-line></v-select>
          <v-select v-if="type=='MEDICINE'" prepend-icon="mdi-flask-outline" v-model="setData.display" :hint="`${selectM.name}, ${selectM.display_name}`" :items="medicine" item-text="display_name" item-value="name" :label="select"  persistent-hint return-object single-line></v-select>
          <v-text-field v-model="setData.cost" prepend-icon="mdi-bitcoin" label="ราคา"></v-text-field>
        </v-card>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import {
    mapGetters,
    mapActions,
    mapState
  } from 'vuex';
  export default {
    data() {
      return {
        defDate:null,
        select:'Select',
        type: 'VACCINE',
        tmp: '',
        dialog: false,
        dialogValue: false,
        updateGet: false,
        datas: [],
        setData: {
          pig_cycle_id: null,
          date: null,
          name: null,
          display: null,
          pig_id: null,
          cycle_type: null,
          cost: null,
        },
        preData: {
          pig_cycle_id: null,
          date: null,
          name: null,
          display: null,
          pig_id: null,
          cycle_type: null,
          cost: null,
        },
        selectV: {
          name: 'วัคซีน',
          display_name: 'ชื่อวัคซีน'
        },
        selectM: {
          name: 'ยา',
          display_name: 'ชื่อยา'
        }
      };
    },
    props: {
      id: null,
      cycle: null,
      cycle_type: null
    },
    computed: {
      ...mapState({
        pig: state => state.cycles.pigData,
        vaccine: state => state.vaccine.vaccine,
        medicine: state => state.vaccine.medicine,
      })
    },
    methods: {
      updateOpen: async function(tmp) {
        let data = await this.$store.dispatch('vaccine/setData');
        if(  tmp.display.display_name != null ||  tmp.display.display_name != null ){
        this.setData.display =  tmp.display.display_name
        }else{
          this.setData.display =  tmp.display
        }
        this.select =    this.setData.display+"/"+tmp.name;
        this.type = tmp.name;
        this.updateGet = true;
        this.dialog = true;
        this.setData = tmp;
      },
      update: async function() {
        this.setData.pig_id = this.id;
        this.setData.name = this.type;
        this.setData.pig_cycle_id = this.pig.cycles[this.cycle].id;
        this.setData.cycle_type = this.cycle_type;
        if(this.setData.display.display_name != null){

        this.setData.display = this.setData.display.display_name;
        }
        let check = this.checkNull(this.setData);
        if (check) {
          await this.$store.dispatch("vaccine/update", this.setData);
          this.load();
          this.getData();
          this.dialogClose();
        } else {
          alert('กรุณาระบุข้อมูลให้ครบ');
        }
      },
      dialogClose() {
        this.dialog = false;
        this.updateGet = false;
        this.setData = this.preData;
         this.select ="Select";
               this.defDates();
      },
      openDialog: async function() {
        this.dialog = true;
        let data = await this.$store.dispatch('vaccine/setData');
      },
      dateCancle() {
        this.tmp = '';
        this.setData.date = '';
        this.dialogValue = false;
              this.defDates();
      },
      dateConvert() {
        this.setData.date = this.$moment(this.tmp)
          .locale('th')
          .add(543, "years")
          .format("DD-MM-YYYY");
        this.dialogValue = false;
      },
      save: async function() {
        this.setData.pig_id = this.id;
        this.setData.name = this.type;
        this.setData.pig_cycle_id = this.pig.cycles[this.cycle].id;
        this.setData.cycle_type = this.cycle_type;
        this.setData.display = this.setData.display.display_name;
        let check = this.checkNull(this.setData);
        if (check) {
          await this.$store.dispatch("vaccine/save", this.setData);
          this.load();
          this.getData();
          this.dialogClose();
        } else {
          alert('กรุณาระบุข้อมูลให้ครบ');
        }
      },
      checkNull(tmp) {
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
          this.$store.dispatch("vaccine/destroy", tmp);
          this.load();
          this.getData();
        }
      },
      getData: async function() {
        this.load();
        this.datas = this.pig.cycles[this.cycle].vaccine;
      },
      preLoad() {
        this.datas = this.pig.cycles[this.cycle].vaccine;
      },
      load: async function() {
        let pig = await this.$store.dispatch('cycles/getById', this.id);
        this.datas = this.pig.cycles[this.cycle].vaccine;
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
        this.setData.date = tmpDate;
      }
    },
    mounted() {
      this.defDates();
      this.preLoad();
    }
  }
</script>
