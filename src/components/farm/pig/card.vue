<template>
<v-layout column justify-center>
   
<pdf :src="url+'/card/'+this.pig_id"></pdf>
</v-layout>
</template>

<script>
 
import {
    mapGetters,
    mapActions,
    mapState
} from "vuex";
import pdf from 'vue-pdf'
export default { 
    components: {
        pdf,
    
    },
    data() {
        return {
            pig_id:0,
            url:process.env.API_URL,
            
        };
    },
    computed: {
        ...mapState({
            pig: state => state.cycles.pigData
        })
    },
    methods: {

        load: async function () {
            let pig = await this.$store.dispatch("cycles/getById",
                this.$route.params.id
            );
            this.pig_id = this.pig.id;

        },
        
    },
    mounted() {
        console.log("Pig Edit Component mounted.");
        this.load();
    }
};
</script>
