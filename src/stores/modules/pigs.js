export default {
    namespaced: true,
    state: {
        pigs: [],
        paginate: {},
        form: {
            keyword: null,
            page: 1,
            blood_line: null,
        },
        headers: [
            {text: 'เลือก', value: 'pig_id', sortable: false},
            {text: 'เบอร์ตี', value: 'pig_id'},
            {text: 'เบอร์หู', value: 'pig_number'},
            {text: 'วันเกิด', value: 'birth_date'},
            {text: 'วันเข้าฟาร์ม', value: 'entry_date'},
            {text: 'แหล่งที่มา', value: 'source'},
            {text: 'สายพันธุ์', value: 'blood_line'},
            {text: 'การกระทำ', value: 'name', sortable: false},
        ],
    },
    mutations: {
        setPigs: function (state, pigs) {
            state.pigs = pigs;
        },
        setPaginate: function (state, paginate) {
            state.paginate = paginate;
            state.pigs = paginate.data;
        },
        setForm: function (state, form) {
            this.form = form;
        }
    },
    actions: {

        resetForm: function ({state, commit, dispatch}) {
            state.form.keyword = "";
            state.form.page = 1;
            state.form.blood_line = null;

        },

        getPaginate: async function ({state, dispatch, commit}, form) {
            let result = await axios.get("/api/farm/pigs", {
                params: form
            }).then((r) => {
                commit('setPaginate', r.data);
                return r.data;
            }).catch((e) => {
                dispatch("error/setError", error.response.data, {root: true});
                return null;
            });

            return result
        },

        getById: async function ({state, dispatch, commit}, {id, form}) {
            let result = await axios.get("/api/farm/pigs/" + id, {
                params: form
            }).then((r) => {
                return r.data
            }).catch((e) => {
                dispatch("error/setError", error.response.data, {root: true});
                return null;
            });

            return result;
        },

        getEditById: async function ({state, dispatch, commit}, {id, form}) {
            let result = await axios.get(`/api/farm/pigs/${id}/edit`, {
                params: form
            }).then((r) => {
                return r.data
            }).catch((e) => {
                dispatch("error/setError", error.response.data, {root: true});
                return null;
            });

            return result;
        },

        updatePig: async function ({state, commit, dispatch}, form) {
            let r = await axios.put("/api/farm/pigs/" + form.id, form)
                .then((r) => {
                    return r.data;
                }).catch((error) => {
                    dispatch("error/setError", error.response.data, {root: true});
                    return null;
                });
            return r;
        },

        save: async function ({state, commit, dispatch}, form) {
            let result = await axios.post("/api/farm/pigs", form)
                .then((r) => {
                    return r.data
                }).catch((error) => {
                    dispatch("error/setError", error.response.data, {root: true});
                    return null;
                });

            return result;
        },

        destroy: async function ({state}, id) {
            let result = await axios.delete('/api/farm/pigs/' + id)
                .then((r) => {
                    return r.data
                }).catch((e) => {
                    dispatch("error/setError", error.response.data, {root: true});
                    return null;
                });

            return result;

        },
        createCycle: async function (context, id) {
            let result = await axios.post('/api/farm/pigs/' + id + "/cycles", {})
                .then((r) => {
                    return r.data
                })
                .catch((e) => {
                    dispatch("error/setError", error.response.data, {root: true});
                    return null;
                })
            return result;
        }
    },
    getters: {
        getHeaders: state => state.headers
    },
};
