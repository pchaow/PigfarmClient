<template>
<v-layout column justify-center>
    <v-flex>
        <h1 class="display-1 pb-3">ตั้งค่าเป้าหมาย <VBtn @click="openAddGoal()" color="success" icon>
            <v-icon>add</v-icon>
        </VBtn></h1>
        
        <v-layout row class="pb-3">

            <v-flex offset-md6 md6>
                <v-form v-on:submit.default="search()">
                    <v-text-field append-icon="search" label="ค้นหา" single-line hide-details v-model="form.keyword"></v-text-field>
                </v-form>
            </v-flex>
        </v-layout>
     
    <v-select
          :items="yearGoal" 
          label="เลือกปีที่สร้างเป้าหมาย"
          v-model="yearSet" 
          @input="serGoalYear()"
        ></v-select>
 
        <v-card v-if="paginate">
            
            <v-data-table  style="font-size: larger;" :headers="headers" :items="goalData" hide-actions>

                <template  slot="items" slot-scope="props">
                    <td>{{ props.item.report_type }}</td>
                    <td>{{ props.item.report_date}}</td>
                    <td class="layout px-0">
                        <v-btn icon class="mx-0" :to="{ name: 'report-goal-edit', params: { id: props.item.id }}">
                            <v-icon color="teal">edit</v-icon>
                        </v-btn>
                    </td>
                </template>

                <template slot="no-data">
                    <v-alert :value="true" color="error" icon="warning">
                        Sorry, nothing to display here :(
                    </v-alert>
                </template>

            </v-data-table>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-pagination @input="changePage" :length="paginate.last_page" v-model="form.page"></v-pagination>

            </v-card-actions>
        </v-card>

    </v-flex>
    <VDialog v-model="goalDialog" scrollable persistent max-width="500px" transition="dialog-transition">
        <VCard>
            <v-toolbar class="box-blue">
                 <VBtn @click="closeAddGoal()" color="danger" dark icon>
                    <v-icon>close</v-icon>
                </VBtn>  <h1 class="wh">เพิ่มเป้าหมาย</h1>
                
             
            </v-toolbar>
            <AddGoal />
        </VCard>
    </VDialog>
</v-layout>
</template>

<script>
import {
    get,
    sync,
    call,
    dispatch
} from 'vuex-pathify'
import Base from '@/components/Base'
import AddGoal from './addGoal';
import _ from 'lodash';
import moment from 'moment';
export default {
    extends: Base,
    components: {
        AddGoal
    },
    data: () => ({
        yearSet: 2019,
        goalData:[],
    }),
    computed: {
        ...sync('goals/*')
    },

    methods: {

        openAddGoal() {
              let dates = moment().format('YYYY-MM-DD');
                this.forms.report_date = dates;
                this.forms.report_year = moment().format('YYYY');
            this.goalDialog = true;

        },
        closeAddGoal() {
            this.forms={}
              let dates = moment().format('YYYY-MM-DD');
                this.forms.report_date = dates;
                this.forms.report_year = moment().format('YYYY');
            this.goalDialog = false;
        },
        changePage: function (page) {
            this.form.page = page
            this.load();
        },
        search: function () {
            this.form.page = 1;
            this.load();
        },
        serGoalYear(){
           this.goalData  =  _.filter(this.reportGoals, {report_year: this.yearSet});
            

        },
        load: async function () {
            dispatch('goals/getPaginate', this.form)
            await  dispatch('goals/getyearsGoal')
            this.goalData = this.reportGoals;
            this.serGoalYear();

        }
    },
    mounted() {

        this.load();

    }
}
</script>
