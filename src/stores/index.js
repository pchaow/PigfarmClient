import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    error: {
        errors: {},
        message: null,
    },
}

const getters = {
    getError: state => state.error
};

const mutations = {
    setError(state, error) {
        // mutate state
        state.error = error;
    },
    resetError(state) {
        state.error = {
            errors: {},
            message: null,
        }
    }
}

export default new Vuex.Store({
    state,
    mutations,
    getters
})