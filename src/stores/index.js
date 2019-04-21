import Vue from 'vue'
import Vuex from 'vuex'
import moduleLogin from "./modules/login"
import moduleError from "./modules/error"
import moduleSpinner from "./modules/spinner"
import moduleMenu from "./modules/menu"
import moduleRoles from "./modules/roles"
import moduleUsers from "./modules/users"
import moduleChocies from "./modules/choices"
import modulePigs from "./modules/pigs"
import moduleCycles from "./modules/cycles"
import moduleBreeder from "./modules/cycles/breeder"
import moduleBirth from "./modules/cycles/birth"
import moduleFeed from "./modules/cycles/feed"
import moduleFeedout from "./modules/cycles/feedout"
import moduleMilk from "./modules/cycles/milk"
import moduleVaccine from "./modules/cycles/vaccine"
import moduleGoals from "./modules/goals";
import moduleQuater from "./modules/report/quater";
Vue.use(Vuex);

import pathify from "vuex-pathify"

export default new Vuex.Store({
    plugins: [ pathify.plugin ], // activate plugin
    modules: {
        error: moduleError,
        login: moduleLogin,
        spinner: moduleSpinner,
        menu: moduleMenu,
        roles: moduleRoles,
        users: moduleUsers,
        choices: moduleChocies,
        pigs: modulePigs,
        cycles: moduleCycles,
        breeder: moduleBreeder,
        birth: moduleBirth,
        feed: moduleFeed,
        feedout: moduleFeedout,
        milk: moduleMilk,
        vaccine: moduleVaccine,

        goals: moduleGoals,
        quater:moduleQuater
    }
})
