export default {
    namespaced : true,
    state: {
        error: {
            errors: {},
            message: null,
        },
    },
    mutations: {

    },
    actions: {
        setError({state}, error) {
            console.log(error)
            state.error = error;
        },

        resetError({state}) {
            state.error = {
                errors: {},
                message: null,
            }
        }
    },
    getters: {
        getError: state => state.error

    }
};
