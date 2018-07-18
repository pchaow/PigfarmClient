<template>
    <v-layout column justify-center v-if="pigs">
        <v-flex>
            <h1 class="display-1 pb-3"><v-icon>mdi-qrcode-scan</v-icon>&nbsp; สร้าง qr code</h1>


            <v-layout row class="pb-3">
                
                <v-flex md>
                    <v-form v-on:submit.default="search()">
                        <v-text-field
                                append-icon="search"
                                label="ค้นหา"
                                single-line
                                hide-details
                                v-model="form.keyword"
                        ></v-text-field>
                    </v-form>
                </v-flex>
            </v-layout>
 <v-layout row class="pb-3">
     <v-flex xs8>
            <v-card>
                <v-data-table
                        :headers="headerX"
                        :items="pigs"
                        hide-actions>

                    <template slot="items" slot-scope="props">
                        <td> <v-checkbox :label="asd" :value="props.item.pig_id" v-model="pigAdd"></v-checkbox></td>
                        <td>{{props.item.pig_id}}</td>
                        <td>{{props.item.pig_number}}</td>
                        <td>{{props.item.entry_date}}</td>
                        <td>{{props.item.source}}</td>
                        <td>{{props.item.created_at}}</td>

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
             
            <v-flex xs4 class="mrl-20">
                <v-card>
                    <v-container class="box-blue "  >   
                        
                            <h2 class="wh">ไอดีหมูที่เลือก</h2>
                          <v-btn :to="{path:'qrgen' , query: { pig: pigAdd }}" color="success"><v-icon>mdi-qrcode-scan</v-icon> &nbsp;สร้าง QR CODE</v-btn>
                        
                     
                    
                       
                    </v-container>
                  
                     <v-list>
          <v-list-tile
            v-for="item in pigAdd"
            :key="item.title"
            avatar 
          >
            <v-list-tile-content>
              <v-list-tile-title ><v-icon>mdi-pig</v-icon>&nbsp;{{item}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

        </v-list>
                </v-card>
         

            </v-flex>
 </v-layout>
        </v-flex>
    </v-layout>

</template>

<script>

    import {mapGetters, mapActions, mapState} from 'vuex'
    import Base from '@/components/Base'

    export default {
        extends: Base,
        data: () => ({
            pigAdd:[],
            headerX: [
             {text: 'เลือก', value: 'pig_id', sortable: false} ,   
            {text: 'PigID', value: 'pig_id'},
            {text: 'เบอร์แม่พันธุ์', value: 'pig_number'}, 
            {text: 'วันเข้าฟาร์ม', value: 'entry_date'},
            {text: 'แหล่งที่มา', value: 'source'},
            {text: 'วันที่สร้าง', value: 'created_at'}, 
        ]
            
        }),
        computed: {
            ...mapGetters({}),
            ...mapState(({
                pigs: state => state.pigs.pigs,
                form: state => state.pigs.form,
                headers: state => state.pigs.headers,
                paginate: state => state.pigs.paginate,
            }))
        },
        methods: {
            changePage: function (page) {
                this.form.page = page
                this.load();
            },
            search: function () {
                this.form.page = 1;
                this.load();
            },
            load: function () {
                this.$store.dispatch('pigs/getPaginate', this.form)
            },
            destroy: async function (pig) {
                if(confirm("Delete pig : " +  pig.pig_id)){
                    let result = await this.$store.dispatch('pigs/destroy', pig.id);
                    this.load();
                }
            }
        },
        mounted() {
            console.log('Role Home Component mounted.');
            this.load();
            this.$store.dispatch('pigs/resetForm');
        }
    }
</script>