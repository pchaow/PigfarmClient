<template>
  <v-layout>

    <v-container>
          <v-btn :to="{ name: 'pig-home'}" class="box-green" dark><h2> <v-icon>mdi-keyboard-backspace</v-icon>&nbsp;กลับ</h2></v-btn>
      <h1>
        <v-icon>mdi-qrcode-scan</v-icon>&nbsp; สร้าง qr code
      </h1>

      <v-layout row>

        <v-flex xs6>
          <div v-for="pig in pigId">
            <v-card color="cyan darken-2" class="white--text mr-10">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs7>
                    <div>
                      <div>Pig ID :</div>
                      <div class="headline">{{pig}}</div>

                    </div>
                  </v-flex>
                  <v-flex xs5>
                    <qr-code :size="120" :text="pig" error-level="M"></qr-code>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>

          </div>

        </v-flex>
      </v-layout>

    </v-container>


  </v-layout>


</template>

<script>

  import {mapGetters, mapActions, mapState} from 'vuex'
  import Base from '@/components/Base'


  export default {
    extends: Base,
    data: () => ({
      pigId: null
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
      changePage: function () {

        this.load();
      },
      search: function () {

        this.load();
      },
      load: async function () {
        var data = await this.$store.dispatch('cycles/qrGen');
        this.pigId = data;
        console.log("Id: " + data);

        if(!data){
          this.$router.replace({name:'pig-home'})
        }
      },
      destroy: async function () {

      }
    },
    mounted() {
      console.log('Role Home Component mounted.');
      this.load();

    }
  }
</script>
