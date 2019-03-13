<template>
<v-layout column justify-center>
   
<pdf :src="'http://127.0.0.1:8000/card/'+this.pig_id"></pdf>
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
