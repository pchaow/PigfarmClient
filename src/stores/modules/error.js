export default {
    namespaced : true,
    state: {
        error: {
            errors: {},
            message: null,
        },
        showError : false,
    },
    mutations: {
        setShowError (state,bool) {
            state.showError = bool;
        }
    },
    actions: {
        setError({state,commit}, error) {
            console.log(error)
            state.error = error;
            commit('setShowError',true);
        },

        resetError({state,commit}) {
            state.error = {
                errors: {},
                message: null,
            }
            commit('setShowError',false);

        },
        toggleError ({state,commit},bool){
            commit('setShowError',bool);
        }
    },
    getters: {
        getError: state => state.error,

    }
};
