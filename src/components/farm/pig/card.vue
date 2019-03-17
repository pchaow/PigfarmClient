<template>
<v-layout column justify-center style="height:100vh;"> 
    <iframe width="100%" height="100%" :src="url+'/card/'+pig_id" frameborder="0"></iframe>
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
            pig_id:1,
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
