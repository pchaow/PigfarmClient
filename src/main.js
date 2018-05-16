// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'

Vue.use(Vuetify);


let axios = require('axios');
window.axios = axios.create({
    baseURL: 'http://pigfarm.miix.local/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
if (localStorage.key('accessToken') != null) {
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.accessToken
}



Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
})
