<!----------Make By YourName---------------->
 <template>
<div>
<h1>รายงาน</h1><hr>
<br>
<v-select
          :items="yearsQuater"
          label="เลือกปีที่รายงาน"
          v-model="yearSet"
          @input="goQuaterView(yearSet)"
        ></v-select>

<viewQuater/>
</div>
</template>

<script>
import {
    get,
    sync,
    call
} from "vuex-pathify";
import viewQuater from './viewQuater';
export default {
    name: 'Root',
    /*-------------------------Load Component---------------------------------------*/
    components: {
viewQuater
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
         // await this.$router.push('/quater/view');
        }
    },
}
</script>
