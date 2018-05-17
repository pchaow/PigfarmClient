import Vue from 'vue'
import Vuex from 'vuex'
import moduleLogin from "./modules/login"
import moduleError from "./modules/error"
import moduleSpinner from "./modules/spinner"

Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        error: moduleError,
        login: moduleLogin,
        spinner: moduleSpinner,
    }
})