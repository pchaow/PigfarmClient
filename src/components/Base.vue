<script>
    import {mapGetters, mapActions} from 'vuex';
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
        }
    }
</script>