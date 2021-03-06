export default {
    namespaced: true,
    state: {
        cache: {},
        choices: [],
        paginate: {},
        form: {
            keyword: "",
            page: 1,
        },
        headers: [
            {text: 'ชื่อตัวเลือก (Unique)', value: 'name'},
            {text: 'ชื่อแสดง', value: 'display_name'},
            {text: 'รายละเอียด', value: 'description'},
            {text: 'การกระทำ', value: 'name', sortable: false},
        ],
    },
    mutations: {
        setChoices: function (state, choices) {
            state.choices = choices;
        },
        setPaginate: function (state, paginate) {
            state.paginate = paginate;
            state.choices = paginate.data;
        }
    },
    actions: {
     
        resetForm: function ({state, commit, dispatch}) {
            state.form.keyword = "";
            state.form.page = 1;
        },

        getPaginate: async function ({state, dispatch, commit}, form) {
            let result = await axios.get("/api/choices", {
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

        getById: async function ({state, dispatch, commit}, id) {
            let result = await axios.get("/api/choices/" + id, {
                params: {}
            }).then((r) => {
                return r.data
            }).catch((e) => {
                dispatch("error/setError", error.response.data, {root: true});
                return null;
            });

            return result;
        },

        getByName: async function ({state, dispatch, commit}, name, form) {


            if (state.cache.hasOwnProperty(name)) {
                return state.cache[name]
            } else {

                let result = await axios.get("/api/choices/" + name, {
                    params: form
                }).then((r) => {
                    return r.data
                }).catch((error) => {
                    dispatch("error/setError", error.response.data, {root: true});
                    return null;
                });

                state.cache[name] = result;

                return result;
            }
        },

        updateChoice: async function ({state, commit, dispatch}, form) {
            let r = await axios.put("/api/choices/" + form.id, form)
                .then((r) => {
                    return r.data;
                }).catch((error) => {
                    dispatch("error/setError", error.response.data, {root: true});
                    return null;
                });
            return r;
        },

        save: async function ({state, commit, dispatch}, form) {
            let result = await axios.post("/api/choices", form)
                .then((r) => {
                    return r.data
                }).catch((error) => {
                    dispatch("error/setError", error.response.data, {root: true});
                    return null;
                });

            return result;
        },

        destroy: async function ({state}, id) {
            let result = await axios.delete('/api/choices/' + id)
                .then((r) => {
                    return r.data
                }).catch((e) => {
                    dispatch("error/setError", error.response.data, {root: true});
                    return null;
                });

            return result;

        }

    },
    getters: {
        getHeaders: state => state.headers
    },
};
