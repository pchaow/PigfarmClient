<script>
    import {mapGetters, mapActions,mapState} from 'vuex';
    import Loading from 'vue-loading-overlay';

    export default {
        name: "Base",
        components : {Loading},
        props : {},
        computed: {
            ...mapGetters({
                error: "error/getError",
                spinnerVisible: "spinner/getVisible",
            }),

            ...mapState({
                showError : state => state.error.showError
            })
        },
        mounted(){
            this.$store.dispatch('error/resetError')
        }
    }
</script>