export default {
    namespaced: true,
    state: {
        user: {},
        users: [],
        paginate: {},
        form: {
            keyword: "",
            page: 1,
            with: ['roles']
        },
        headers: [
            {text: 'ชื่อ-นามสกุล', value: 'name'},
            {text: 'ชื่อผู้ใช้', value: 'username'},
            {text: 'อีเมล์', value: 'email'},
            {text: 'สิทธิ์', value: 'roles'},
            {text: 'การกระทำ', value: 'name', sortable: false},
        ],
    },
    mutations: {
        setUsers: function (state, users) {
            state.users = roles;
        },
        setPaginate: function (state, p) {
            state.paginate = p;
            state.users = p.data;
        }
    },
    actions: {
        resetForm: function ({state}) {
            state.form.keyword = "";
            state.form.page = 1;
        },
        async getUsers() {
            let r = await axios.get("/api/users?paginate=false")
                .then((r) => {
                    return r.data;
                }).catch((error) => {
                    dispatch("error/setError", error.response.data, {root: true});
                    return null;
                })
            return r;
        },
        async getPaginate({state, commit, dispatch}, form) {

            let r = await axios.get("/api/users", {
                params: form
            }).then((r) => {
                return r.data;
            }).catch((error) => {
                dispatch("error/setError", error.response.data, {root: true});
                return null;
            })

            commit("setPaginate", r);

            return r;
        },
        async getById({state, commit, dispatch}, id) {
            let r = await axios.get("/api/users/" + id, {params: {with: ['roles']}})
                .then((r) => {
                    return r.data;
                })
                .catch((error) => {
                    dispatch("error/setError", error.response.data, {root: true});
                    return null;
                })

            return r;

        },
        async createUser({state, commit, dispatch}, form) {
            let r = await axios.post("/api/users", form)
                .then((r) => {
                    return r.data;
                }).catch((error) => {
                    dispatch("error/setError", error.response.data, {root: true});
                    return null;
                })
            return r;
        },
        async updateUser({state, commit, dispatch}, form) {
            let r = await axios.put("/api/users/" + form.id, form)
                .then((r) => {
                    return r.data;
                }).catch((error) => {
                    dispatch("error/setError", error.response.data, {root: true});
                    return null;
                })
            return r;
        },
        async destroyById({state, commit, dispatch}, id) {
            let r = await axios.delete("/api/users/" + id)
                .then((r) => {
                    return r.data;
                }).catch((error) => {
                    dispatch("error/setError", error.response.data, {root: true});
                    return null;
                });
            return r;
        }
    },
    getters: {
        getUsers: state => state.roles,
    }
};
