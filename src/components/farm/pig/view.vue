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

      <v-dialog ref="dialog" v-model="dialog" :return-value.sync="dialog_date" persistent lazy full-width
                width="290px">
        <v-date-picker v-model="dialog_date" scrollable locale="th-TH">
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="saveDialog(dialog_date)">OK</v-btn>
        </v-date-picker>
      </v-dialog>
      <v-tabs v-if="form.cycles.length > 0" v-model="active" color="primary" dark slider-color="yellow">
        <div v-for="n in form.cycles" :key="n.id">
          <v-tab @click="changeSequence(n.cycle_sequence)" ripple>
            รอบการผสมที่ {{n.cycle_sequence}}
          </v-tab>
        </div>
        <v-tab-item v-for="cycle in form.cycles" :key="cycle.id" lazy>
          <v-card flat>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs12>
                  <h1 class="pointer" style="display:none;">ไอดี {{pigData.pigId}} รอบที่
                    {{pigData.cycleSequence}}</h1>
                  <v-flex xs12>
                    <v-stepper v-model="stepXX" vertical="true">
                      <v-stepper-step step="1" :complete="stepXX >= 1">
                        <h2 class="pointer" @click="stepXX =1"> การผสมพันธ์ุ</h2>
                      </v-stepper-step>
                      <v-stepper-content step="1">

                        <v-layout row>
                          <v-flex xs6>
                            <h2>
                              <v-icon>mdi-source-fork</v-icon>&nbsp;ข้อมูลการผสมพันธ์
                            </h2>
                            <v-btn color="box-blue" @click.native="breederDialog=true"
                                   dark>
                              <v-icon>mdi-plus-circle</v-icon>&nbsp;เพิ่มข้อมูลการผสมพันธ์ุ
                            </v-btn>
                            <div v-for="bd,index in breederDataX" class="pd-12">
                              <div class="card-border violet pd-10">
                                <h3 class="blx nm pd-10">
                                  <v-icon class="blx">mdi-calendar</v-icon>
                                  วันที่ผสมพันธ์ุ : {{bd.breed_date}}
                                </h3>

                                <h4 class="nm pdl-10" style="color: #00cc00;">
                                  วันกำหนดคลอด : {{bd.delivery_date}}</h4>
                                <h4 class="nm pdl-10" style="color: #FA8072;">
                                  พ่อพันธ์ : {{bd.breeder_id}}</h4>
                                <h4 class="nm pdl-10" style="color: #B03060;">
                                  ชุดการผสม : {{bd.breed_week}}</h4>
                                <v-btn @click="deleteX('breeder',bd.id)"
                                       style="margin-top:-50px; float:right;" small
                                       color="red" fab dark>
                                  <v-icon>mdi-delete</v-icon>
                                </v-btn>
                              </div>

                            </div>
                          </v-flex>
                          <v-flex xs6>
                            <h2>
                              <v-icon>mdi-needle</v-icon>&nbsp;ข้อมูลการให้วัคซีน
                            </h2>
                            <v-btn @click="vaccineDiaShow(1)" color="box-purple " dark>
                              <v-icon>mdi-plus-circle</v-icon>&nbsp;เพิ่มข้อมูลการวัคซีน
                            </v-btn>
                            <div v-for="vd in vaccineDataX">
                              <div v-if="vd.cycle_type == 1" class="pd-12">
                                <div class="card-border violet pd-10">
                                  <h3 class="blx nm pd-10">
                                    <v-icon class="blx">mdi-calendar</v-icon>
                                    วันที่ใช้: {{vd.date}}
                                  </h3>
                                  <h3 class="nm pdl-10" style="color: brown;">
                                    ข้อมูล : {{vd.name}}</h3>
                                  <v-btn @click="deleteX('vaccine',vd.id)"
                                         style="margin-top:-50px; float:right;"
                                         small color="red" fab dark>
                                    <v-icon>mdi-delete</v-icon>
                                  </v-btn>
                                </div>
                              </div>
                            </div>
                          </v-flex>
                        </v-layout>

                      </v-stepper-content>

                      <v-stepper-step step="2" :complete="stepXX >= 2">
                        <h2 class="pointer" @click="stepXX =2">การคลอดลูก</h2>
                      </v-stepper-step>

                      <v-stepper-content step="2">
                        <v-layout row>
                          <v-flex xs6>
                            <h2>
                              <v-icon>mdi-source-fork</v-icon>&nbsp;ข้อมูลการคลอด
                            </h2>
                            <v-btn v-if="birthDataX.length == 0" color="box-blue"
                                   @click.native="birthDialog=true" dark>
                              <v-icon>mdi-plus-circle</v-icon>&nbsp;เพิ่มข้อมูลการคลอด
                            </v-btn>
                            <div v-for="brd,index in birthDataX" class="pd-12">
                              <div class="card-border violet pd-10">
                                <h3 class="blx nm pd-10">
                                  <v-icon class="blx">mdi-calendar</v-icon>
                                  วันที่คลอด: {{brd.date}}
                                </h3>
                                <h3 class="nm pdl-10" style="color: #00cc00;">
                                  จำนวนหมูที่รอดชีวิต : {{brd.life}} ตัว <b>(น้ำหนักเฉลี่ย
                                  {{brd.avg}} กก.)</b></h3>
                                <h4 class="nm pdl-10" style="color:blue;">
                                  จำนวนหมูทั้งหมด : {{brd.all}} ตัว</h4>

                                <h4 class="nm pdl-10" style="color: #B03060;">ตาย :
                                  {{brd.dead}} ตัว</h4>
                                <h4 class="nm pdl-10" style="color: #B03060;">มัมมี่
                                  : {{brd.mummy}} ตัว</h4>
                                <h4 class="nm pdl-10" style="color: #B03060;">พิการ
                                  : {{brd.deformed}} ตัว</h4>
                                <v-btn @click="deleteX('birth',brd.id)"
                                       style="margin-top:-50px; float:right;" small
                                       color="red" fab dark>
                                  <v-icon>mdi-delete</v-icon>
                                </v-btn>
                              </div>
                            </div>
                          </v-flex>
                          <v-flex xs6>
                            <h2>
                              <v-icon>mdi-needle</v-icon>&nbsp;ข้อมูลการให้วัคซีน
                            </h2>
                            <v-btn @click="vaccineDiaShow(2)" color="box-purple " dark>
                              <v-icon>mdi-plus-circle</v-icon>&nbsp;เพิ่มข้อมูลการวัคซีน
                            </v-btn>
                            <div v-for="vd in vaccineDataX">
                              <div v-if="vd.cycle_type == 2" class="pd-12">
                                <div class="card-border violet pd-10">
                                  <h3 class="blx nm pd-10">
                                    <v-icon class="blx">mdi-calendar</v-icon>
                                    วันที่ใช้: {{vd.date}}
                                  </h3>
                                  <h3 class="nm pdl-10" style="color: brown;">
                                    ข้อมูล : {{vd.name}}</h3>
                                  <v-btn @click="deleteX('vaccine',vd.id)"
                                         style="margin-top:-50px; float:right;"
                                         small color="red" fab dark>
                                    <v-icon>mdi-delete</v-icon>
                                  </v-btn>
                                </div>
                              </div>
                            </div>
                          </v-flex>
                        </v-layout>
                      </v-stepper-content>

                      <v-stepper-step step="3" :complete="stepXX >= 3">
                        <h2 class="pointer" @click="stepXX =3">การอย่านม</h2>
                      </v-stepper-step>

                      <v-stepper-content step="3">

                        <v-layout row>
                          <v-flex xs6>
                            <h2>
                              <v-icon>mdi-source-fork</v-icon>&nbsp;ข้อมูลการอย่านม
                            </h2>
                            <v-btn color="box-blue" @click.native="milkDialog=true"
                                   dark>
                              <v-icon>mdi-plus-circle</v-icon>&nbsp;เพิ่มข้อมูลการอย่านม
                            </v-btn>
                            <div v-for="md,index in milkDataX" class="pd-12">
                              <div class="card-border violet pd-10">
                                <h3 class="blx nm pd-10">
                                  <v-icon class="blx">mdi-calendar</v-icon>
                                  วันที่อย่านม: {{md.date}}
                                </h3>
                                <h3 class="nm pdl-10" style="color: brown;">จำนวนหมู
                                  : {{md.all}} ตัว <br>น้ำหนักเฉลี่ย {{md.avg}}
                                  กก.</h3>
                                <v-btn @click="deleteX('milk',md.id)"
                                       style="margin-top:-50px; float:right;" small
                                       color="red" fab dark>
                                  <v-icon>mdi-delete</v-icon>
                                </v-btn>
                              </div>
                            </div>
                          </v-flex>
                          <v-flex xs6>
                            <h2>
                              <v-icon>mdi-needle</v-icon>&nbsp;ข้อมูลการให้วัคซีน
                            </h2>
                            <v-btn @click="vaccineDiaShow(3)" color="box-purple " dark>
                              <v-icon>mdi-plus-circle</v-icon>&nbsp;เพิ่มข้อมูลการวัคซีน
                            </v-btn>
                            <div v-for="vd in vaccineDataX">
                              <div v-if="vd.cycle_type == 3" class="pd-12">
                                <div class="card-border violet pd-10">
                                  <h3 class="blx nm pd-10">
                                    <v-icon class="blx">mdi-calendar</v-icon>
                                    วันที่ใช้: {{vd.date}}
                                  </h3>
                                  <h3 class="nm pdl-10" style="color: brown;">
                                    ข้อมูล : {{vd.name}}</h3>
                                  <v-btn @click="deleteX('vaccine',vd.id)"
                                         style="margin-top:-50px; float:right;"
                                         small color="red" fab dark>
                                    <v-icon>mdi-delete</v-icon>
                                  </v-btn>
                                </div>
                              </div>
                            </div>
                          </v-flex>
                        </v-layout>
                      </v-stepper-content>
                    </v-stepper>

                  </v-flex>
                  <v-btn style="display:none;" color="info" @click="saveCycle(cycle)">
                    บันทึกข้อมูลรอบ
                  </v-btn>

                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-flex>
    <!------------------------------------------------------------>
    <!----Dialog persistent--->
    <!------------------------------------------------------------>

    <!-----------------------BreederDialog-------------------------->
    <v-dialog v-model="breederDialog" max-width="500px">
      <v-card>
        <v-toolbar dark color="mintONmint">
          <v-btn icon dark @click.native="breederDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>เพิ่มข้อมูลการผสมพันธ์ุ</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="breederSave()">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-card class="container">
          <v-flex x12 class="box-blue mar-top pd-20">
            <v-layout>
              <v-flex xs3>
                <v-icon style="font-size:66px;" color="white">mdi-calendar-plus</v-icon>
              </v-flex>
              <v-flex xs8 class="">
                <v-dialog ref="dialog" v-model="breederDateMenu" :return-value.sync="date" persistent
                          lazy full-width width="290px">
                  <v-text-field slot="activator" v-model="breederData.dateStart"
                                label="วันที่ผสมพันธ์ุ" readonly dark></v-text-field>
                  <v-date-picker locale="th-TH" v-model="breederData.dateStart" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="breederDateMenu = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="breederGetDate()">OK</v-btn>
                  </v-date-picker>
                </v-dialog>

              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 class="box-green mar-top pd-20">
            <v-layout>
              <v-flex xs3>
                <v-icon style="font-size:66px;" color="white">mdi-calendar-clock</v-icon>
              </v-flex>
              <v-flex xs8>
                <v-text-field slot="activator" v-model="breederData.dateEnd" label="วันที่คลอด" readonly
                              dark></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 class="box-purple mar-top pd-20">
            <v-layout>
              <v-flex xs3>
                <v-icon style="font-size:66px;" color="white">mdi-eyedropper</v-icon>
              </v-flex>
              <v-flex xs8 class="mar-top">
                <v-text-field slot="activator" v-model="breederData.set" label="ชุดผสม"
                              dark></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 class=" mintONmint mar-top pd-20">
            <v-layout>
              <v-flex xs3>
                <v-icon style="font-size:66px;" color="white">mdi-pig</v-icon>
              </v-flex>
              <v-flex xs8 class="mar-top">
                <v-text-field slot="activator" v-model="breederData.male" label="พ่อพันธ์ุ"
                              dark></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-card>
      </v-card>
    </v-dialog>
    <!-----------------------BirthDialog------------------------------>
    <v-dialog v-model="birthDialog" max-width="500px">
      <v-card>
        <v-toolbar dark color="mintONmint">
          <v-btn icon dark @click.native="birthDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>เพิ่มข้อมูลการคลอด</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="birthSave()">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-card class="container">
          <v-flex x12 class="box-blue mar-top pd-20">
            <v-layout>
              <v-flex xs3>
                <v-icon style="font-size:66px;" color="white">mdi-calendar-plus</v-icon>
              </v-flex>
              <v-flex xs8 class="">
                <v-dialog ref="dialog" v-model="birthDateMenu" :return-value.sync="date" persistent lazy
                          full-width width="290px">
                  <v-text-field slot="activator" v-model="birthData.date " label="วันที่คลอด" readonly
                                dark></v-text-field>
                  <v-date-picker locale="th-TH" v-model="birthData.date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click.native="birthData.date = ''"
                           @click="birthDateMenu = false">Cancel
                    </v-btn>
                    <v-btn flat color="primary" @click="birthDate()">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
            </v-layout>
          </v-flex>


          <v-flex xs12 class=" mintONmint mar-top pd-20">
            <v-layout>
              <v-flex xs3>
                <v-icon style="font-size:66px;" color="white">mdi-pig</v-icon>
              </v-flex>
              <v-flex xs8 class="mar-top">
                <h3 class="wh">ข้อมูลลูกหมู {{ birthCount()}} ตัว</h3>
                <v-text-field slot="activator" v-model.number="birthData.life" label="มีชีวิต"
                              dark></v-text-field>
                <v-text-field slot="activator" v-model.number="birthData.dead" label="ตาย"
                              dark></v-text-field>
                <v-text-field slot="activator" v-model.number="birthData.mummy" label="มัมมี่"
                              dark></v-text-field>
                <v-text-field slot="activator" v-model.number="birthData.deformed" label="พิการ"
                              dark></v-text-field>
                <v-text-field slot="activator" v-model.number="birthData.weight" label="น้ำหนักเฉลี่ย"
                              dark></v-text-field>

                <v-btn v-if="birthData.life != ''" @click.native="birthAvgCount.length = birthData.life"
                       @click="birthAvgDialog = true">คำนวณน้ำหนักเฉลี่ย
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-card>
      </v-card>
    </v-dialog>
    <v-dialog v-model="birthAvgDialog" max-width="500px">
      <v-card class="container">
        <div v-for="bwd,index in birthAvgCount.length">
          <v-text-field slot="activator" v-model="birthAvgCount[index]"
                        :label="'น้ำหนักหมูตัวที่ : '+(index+1)"></v-text-field>
        </div>
        <v-btn color="success" @click=" birthAvgCal()">คำนวณ</v-btn>
      </v-card>
    </v-dialog>
    <!---------------------------------------------------------------->
    <!-----------------------MilkDialog------------------------------>
    <v-dialog v-model="milkDialog" max-width="500px">
      <v-card>
        <v-toolbar dark color="mintONmint">
          <v-btn icon dark @click.native="milkDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>เพิ่มข้อมูลการอย่านม</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="milkSave()">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-card class="container">
          <v-flex x12 class="box-blue mar-top pd-20">
            <v-layout>
              <v-flex xs3>
                <v-icon style="font-size:66px;" color="white">mdi-calendar-plus</v-icon>
              </v-flex>
              <v-flex xs8 class="">
                <v-dialog ref="dialog" v-model="milkDateMenu" :return-value.sync="date" persistent lazy
                          full-width width="290px">
                  <v-text-field slot="activator" v-model="milkData.date " label="วันที่" readonly
                                dark></v-text-field>
                  <v-date-picker locale="th-TH" v-model="milkData.date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click.native="milkData.date = ''"
                           @click="birthDateMenu = false">Cancel
                    </v-btn>
                    <v-btn flat color="primary" @click="milkDate()">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
            </v-layout>
          </v-flex>


          <v-flex xs12 class=" mintONmint mar-top pd-20">
            <v-layout>
              <v-flex xs3>
                <v-icon style="font-size:66px;" color="white">mdi-pig</v-icon>
              </v-flex>
              <v-flex xs8 class="mar-top">
                <h3 class="wh">ข้อมูลลูกหมู {{ milkData.all}} ตัว</h3>
                <v-text-field slot="activator" v-model.number="milkData.all" label="จำนวนหมู"
                              dark></v-text-field>
                <v-text-field slot="activator" v-model.number="milkData.weight" label="น้ำหนักเฉลี่ย"
                              dark></v-text-field>

                <v-btn v-if="milkData.all != ''" @click.native="milkAvgCount.length = milkData.all"
                       @click="milkAvgDialog = true">คำนวณน้ำหนักเฉลี่ย
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-card>
      </v-card>
    </v-dialog>
    <v-dialog v-model="milkAvgDialog" max-width="500px">
      <v-card class="container">
        <div v-for="bwd,index in milkAvgCount.length">
          <v-text-field slot="activator" v-model="milkAvgCount[index]"
                        :label="'น้ำหนักหมูตัวที่ : '+(index+1)"></v-text-field>
        </div>
        <v-btn color="success" @click=" milkAvgCal()">คำนวณ</v-btn>
      </v-card>
    </v-dialog>
    <!---------------------------------------------------------------->

    <!-----------------------VaccineDialog------------------------------>
    <v-dialog v-model="vaccineDialog" max-width="500px">
      <v-card>
        <v-toolbar dark color="mintONmint">
          <v-btn icon dark @click.native="vaccineDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>เพิ่มข้อมูลการให้วัคซีน</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="vaccineSave()">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-card class="container ">
          <v-flex xs12 class="mr-10">
            <v-dialog ref="dialog" v-model="vaccineDateMenu" :return-value.sync="date" persistent lazy
                      full-width width="290px">
              <v-text-field slot="activator" v-model="vaccineData.date " label="วันที่"
                            readonly></v-text-field>
              <v-date-picker v-model="vaccineData.date" locale="th-TH" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click.native="vaccineData.date = ''"
                       @click="vaccineDateMenu = false">Cancel
                </v-btn>
                <v-btn flat color="primary" @click="vaccineDate()">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>


          <v-flex xs12 class="mr-10">
            {{radios}}
            <v-radio-group v-model="radios" :mandatory="false">
              <v-radio label="วัคซีน" value="vaccine"></v-radio>
              <v-radio label="ยา" value="medicine"></v-radio>
            </v-radio-group>
            <v-select v-if="radios == 'vaccine'" :items="vaccineUse" v-model="vaccineSelect" :hint="`${vaccineSelect.name},
              ${vaccineSelect.display_name}`" label="เลือกวัคซีน" single-line item-text="display_name" item-value="name"
                      return-object persistent-hint></v-select>

            <v-select v-if="radios == 'medicine'" :items="medicineUse" v-model="vaccineSelect" :hint="`${vaccineSelect.name},
              ${vaccineSelect.display_name}`" label="เลือกวัคซีน" single-line item-text="display_name" item-value="name"
                      return-object persistent-hint></v-select>


          </v-flex>

        </v-card>

      </v-card>
    </v-dialog>

    <!---------------------------------------------------------------->

  </v-layout>
</template>

<script>
  import ChoiceSelect from "@/components/admin/choice/choiceSelect";
  import Base from "@/components/Base";

  export default {
    extends: Base,
    components: {
      ChoiceSelect
    },
    data() {
      return {
        stepXX: 1,
        //Pig Data//
        pigData: {
          pigId: 0,
          pigweightTmp: 0,
          cycleSequence: 0,

        },
        breederDataX: {},
        breederDateMenu: false,
        breederDialog: false,
        breederData: {
          id: 0,
          cy: 0,
          dateStart: null,
          dateEnd: null,
          male: null,
          set: null
        },

        birthDataX: {},
        birthDialog: false,
        birthDateMenu: false,
        birthAvgDialog: false,
        birthAvgCount: [],
        birthData: {
          id: 0,
          cy: 0,
          date: null,
          all: 0,
          life: '',
          dead: null,
          mummy: null,
          deformed: null,
          weightTmp: null,
          weight: 0
        },
        milkDataX: {},
        milkDialog: false,
        milkDateMenu: false,
        milkAvgDialog: false,
        milkAvgCount: [],
        milkData: {
          id: 0,
          cy: 0,
          date: null,
          all: '',
          weightTmp: null,
          weight: null
        },
        vaccineUse: [],
        medicineUse: [],
        vaccineDataX: {},
        vaccineSelect: {name: '', display_name: ''},
        vaccineDialog: false,
        vaccineDateMenu: false,
        vaccineData: {
          id: 0,
          cy: 0,
          ct: 0,
          date: null,
          name: null,
          display: null,

        }, radios: null,

        deleteData: {
          deleteType: null,
          deleteId: null
        },
        form: null,
        //tabs
        active: 0,
        dialog: false,
        dialog2: false,
        dialog_date: null,
        currentDateModel: null,
        date: ''
      };
    },
    methods: {

      changeSequence(CycleSequence) {

        this.loadData();
        this.pigData.cycleSequence = CycleSequence;
      },

      stepper() {
        //this.stepXX = 1;
      },

      saveCycle: function (cycle) {
        console.log(cycle);
      },

      /*****************Breeder***************** */
      breederGetDate() {
        let week = this.$moment(this.breederData.dateStart).week();
        let delivery = this.$moment(this.breederData.dateStart)
          .locale('th')
          .add(543, "years")
          .add(114, "days")
          .format("DD-MM-YYYY");
        this.breederData.dateEnd = delivery;
        this.breederData.set = week;

        let start = this.$moment(this.breederData.dateStart)
          .locale('th')
          .add(543, "years")
          .format("DD-MM-YYYY");
        this.breederData.dateStart = start;
        this.breederDateMenu = false;
      },
      breederSave() {
        this.breederData.id = this.pigData.pigId;
        this.breederData.cy = this.pigData.cycleSequence;
        if (this.checkNull(this.breederData)) {
          this.$store.dispatch("cycles/saveBreeder", this.breederData);
          this.loadData();
          this.breederDialog = false;
        } else {
          alert('กรุณาระบุข้อมูลให้ครบ');
        }
      },

      /*****************Birth***************** */
      birthAvgCal() {
        var x = 0;
        var pig = this.birthAvgCount.length;
        console.log(pig);
        for (var i = 0; i < this.birthAvgCount.length; i++) {
          console.log(x);
          x += Number(this.birthAvgCount[i]);
          if (this.birthData.weightTmp == null) {
            this.birthData.weightTmp = this.birthAvgCount[i]
          } else {
            this.birthData.weightTmp += ",";
            this.birthData.weightTmp += this.birthAvgCount[i];
          }


        }

        var result = x / pig;
        if (result) {
          this.birthData.weight = result;
          this.birthAvgDialog = false;
        } else {
          this.birthData.weight = null;
          this.birthAvgDialog = false;
        }
      },
      birthDate() {
        let start = this.$moment(this.birthData.date)
          .locale('th')
          .add(543, "years")
          .format("DD-MM-YYYY");
        this.birthData.date = start;
        this.birthDateMenu = false;
      },
      birthCount() {
        this.birthData.all = Number(this.birthData.life + this.birthData.dead + this.birthData.mummy + this.birthData.deformed);
        return this.birthData.all;
      },
      birthSave() {
        this.birthData.id = this.pigData.pigId;
        this.birthData.cy = this.pigData.cycleSequence;


        if (this.checkNull(this.birthData)) {
          this.$store.dispatch("cycles/saveBirth", this.birthData);
          this.loadData();
          this.birthDialog = false;
        } else {
          alert('กรุณาระบุข้อมูลให้ครบ');
        }
      },

      /*****************Milk***************** */
      milkAvgCal() {
        var x = 0;
        var pig = this.milkAvgCount.length;
        console.log(pig);
        for (var i = 0; i < this.milkAvgCount.length; i++) {
          console.log(x);
          x += Number(this.milkAvgCount[i]);
          if (this.milkData.weightTmp == null) {
            this.milkData.weightTmp = this.milkAvgCount[i]
          } else {
            this.milkData.weightTmp += ",";
            this.milkData.weightTmp += this.milkAvgCount[i];
          }
        }
        var result = x / pig;
        if (result) {
          this.milkData.weight = result;
          this.milkAvgDialog = false;
        } else {
          this.milkData.weight = null;
          this.milkAvgDialog = false;
        }
      },
      milkDate() {
        let start = this.$moment(this.milkData.date)
          .locale('th')
          .add(543, "years")
          .format("DD-MM-YYYY");
        this.milkData.date = start;
        this.milkDateMenu = false;
      },
      milkSave() {
        this.milkData.id = this.pigData.pigId;
        this.milkData.cy = this.pigData.cycleSequence;

        if (this.checkNull(this.milkData)) {
          this.$store.dispatch("cycles/saveMilk", this.milkData);
          this.loadData();
          this.milkDialog = false;
        } else {
          alert('กรุณาระบุข้อมูลให้ครบ');
        }
      },

      /*****************Vaccine***************** */
      vaccineDate() {
        let start = this.$moment(this.vaccineData.date)
          .locale('th')
          .add(543, "years")
          .format("DD-MM-YYYY");
        this.vaccineData.date = start;
        this.vaccineDateMenu = false;
      },
      vaccineDiaShow(c) {
        this.vaccineData.id = this.pigData.pigId;
        this.vaccineData.cy = this.pigData.cycleSequence;
        this.vaccineData.ct = c;
        console.log(this.vaccineData.ct);
        this.vaccineDialog = true;
      },
      vaccineSave() {
        this.vaccineData.name = this.vaccineSelect.name;
        this.vaccineData.display = this.vaccineSelect.display_name;
        console.log(this.vaccineData.date);
        if (this.checkNull(this.vaccineData)) {
          this.$store.dispatch("cycles/saveVaccine", this.vaccineData);
          this.loadData();
          this.vaccineDialog = false;
        } else {
          alert('กรุณาระบุข้อมูลให้ครบ');
        }
      },
      deleteX: async function (ty, id) {
        var r = confirm("คุณแน่ใจใช่ไหมที่จะลบข้อมูลนี้");
        if (r == true) {
          this.deleteData.deleteType = ty;
          this.deleteData.deleteId = id;
          await this.$store.dispatch("cycles/deleteData", this.deleteData);
          this.loadData();
        } else {

        }

      },
      checkNull: function (c) {
        var ch = true;
        Object.keys(c).forEach(function (key) {
          // console.log(key+"="+c[key] +"=>"+ch);
          if (c[key] == null) {
            ch = false;
            key = false;
          }
        });
        console.log(ch);
        return ch;
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
            selCycle.breeders.push({});
          } else {
            this.$set(selCycle, "breeders", [{}]);
          }
        });
      },
      openDialog: function (func) {
        this.currentDateModel = func;
        this.dialog = true;
      },
      closeDialog: function () {
        this.currentDateModel = null;
        this.dialog_date = null;
        this.dialog = false;
      },
      saveDialog: function (date) {
        let week = this.$moment(date).week();
        let delivery = this.$moment(date)
          .add(144, "days")
          .format("YYYY-MM-DD");
        this.currentDateModel(date, week, delivery);
        this.closeDialog();
      },
      newCycle: async function () {
        let cycle = await this.$store.dispatch("pigs/createCycle", this.form.id);
        console.log("CYCLE", cycle);
        this.form.cycles.push(cycle);
        this.active = Number(this.form.cycles.indexOf(cycle));
        console.log("Role is a" + this.active);
        this.pigData.cycleSequence = Number(this.active) + 1;
        this.loadData();
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
        let pig = await this.$store.dispatch("pigs/getById", {
          id: this.$route.params.id,
          form: {
            with: ["cycles", "cycles.breeders"]
          }
        });
        this.form = pig;
        this.pigData.pigId = pig.id;
        this.pigData.cycleSequence = 1;
        this.vaccineUse = await this.$store.dispatch("cycles/getVaccineX");
        this.medicineUse = await this.$store.dispatch("cycles/getMedicineX");
        this.loadData();

      },
      loadData: async function () {
        this.breederDataX = await this.$store.dispatch("cycles/getBreederData", this.pigData);
        this.birthDataX = await this.$store.dispatch("cycles/getBirthData", this.pigData);
        this.milkDataX = await this.$store.dispatch("cycles/getMilkData", this.pigData);
        this.vaccineDataX = await this.$store.dispatch("cycles/getVaccineData", this.pigData);

        let cycler = await this.$store.dispatch("cycles/getCyclesData", this.pigData);
        if (cycler[0].complete == 0) {
          this.stepXX = 1;
        }
        else {
          this.stepXX = cycler[0].complete;
        }

        console.log(cycler);
        this.stepper();


      },

    },
    mounted() {
      console.log("Pig Edit Component mounted.");
      this.load();

    }
  };

</script>
