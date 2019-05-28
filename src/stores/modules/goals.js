import { make } from 'vuex-pathify'

const state = {
    reportGoals: [],
    yearGoal: [],
    paginate: null,
    goalDialog: false,
    reportType: [
        'month',
        'quater1',
        'quater2',
        'quater3',
        'quater4',
        'year',
    ],
    form: {
        keyword: "",
        page: 1
    },
    forms: {},
    headers: [
        { text: 'ประเภทเป้าหมาย', value: 'report_type' },
        { text: 'วันที่กำหนดเป้าหมาย', value: 'report_date' },
        { text: 'Actions', value: 'name', sortable: false },
    ],
    reportGoal: {},
}

const mutations = {
    ...make.mutations(state),
    setPaginate: function(state, p) {
        state.paginate = p;
        state.reportGoals = p.data;
    }
}

const actions = {
    resetForm: function({ state }) {
        state.form.keyword = "";
        state.form.page = 1;
    },
    async getyearsGoal() {
        await axios.get('/api/show/report/goal')
            .then((r) => {
                state.yearGoal = r.data;
            }).catch((e) => {

            });
    },
    async getReportGoals() {
        let r = await axios.get("/api/goals?paginate=false")
            .then((r) => {
                return r.data;
            }).catch((error) => {
                dispatch("error/setError", error.response.data, { root: true });
                return null;
            })

        return r;
    },
    async getPaginate({ state, commit, dispatch }, form) {

        let r = await axios.get("/api/goals", {
            params: form
        }).then((r) => {
            return r.data;
        }).catch((error) => {
            dispatch("error/setError", error.response.data, { root: true });
            return null;
        })

        commit("setPaginate", r);

        return r;
    },
    async getById({ state, commit, dispatch }, id) {
        let r = await axios.get("/api/goals/" + id)
            .then((r) => {
                console.log('goals/getById', r);
                return r.data;
            })
            .catch((error) => {
                dispatch("error/setError", error.response.data, { root: true });
                return null;
            })
        return r;
    },


    async updateGoal({ state, commit, dispatch }, form) {
        let r = await axios.put("/api/goals/" + form.id, form)
            .then((r) => {
                return r.data;
            }).catch((error) => {
                dispatch("error/setError", error.response.data, { root: true });
                return null;
            })
        return r;
    },
    async saveGoal({ state, commit, dispatch }, form) {
        let r = await axios.post("/api/goals", form)
            .then((r) => {
                return r.data;
            }).catch((error) => {
                dispatch("error/setError", error.response.data, { root: true });
                return null;
            })
        return r;
    },
};

const getters = {};

export default {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
};