<!----------Make By YourName---------------->
 <template>
<div>
<h1>รายงาน</h1><hr>
  <div v-for="year in yearsQuater" :key="year">
     <VBtn @click="goQuaterView(year)" color="success">ประจำปี {{year}}</VBtn>
  </div>

</div>
</template>

<script>
import {
    get,
    sync,
    call
} from "vuex-pathify";
export default {
    name: 'Root',
    /*-------------------------Load Component---------------------------------------*/
    components: {

    },
    /*-------------------------Set Component---------------------------------------*/
    props: {

    },
    /*-------------------------DataVarible---------------------------------------*/
    data() {
        return {

        };
    },
    /*-------------------------Run Methods when Start this Page------------------------------------------*/
    async mounted() {
        /**** Call loading methods*/
        this.load();
    },
    /*-------------------------Run Methods when Start Routed------------------------------------------*/
    async beforeRouteEnter(to, from, next) {
        next()
    },
    /*-------------------------Vuex Methods and Couputed Methods------------------------------------------*/
    computed: {
        ...sync('quater/*')
    },
    /*-------------------------Methods------------------------------------------*/
    methods: {
        ...call('quater/*'),
        /******* Methods default run ******/
        load: async function () {
            this.getyearsQuater();
        },
        async goQuaterView(year){
          await this.getQuater(year);
          await this.$router.push('/quater/view');
        }
    },
}
</script>
