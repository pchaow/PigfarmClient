export default {
    namespaced: true,
    state: {
        roles: [],
        paginate : {},
        form: {
            keyword: "",
            page: 1
        },
        headers: [
            {text: 'ชื่อ', value: 'name'},
            {text: 'คำอธิบาย', value: 'description'},
            {text: 'Actions', value: 'name', sortable: false},
        ],
        role: {},
    },
    mutations: {
        setRoles : function(state,roles){
            state.roles = roles;
        },
        setPaginate : function(state,p){
            state.paginate = p;
            state.roles = p.data;
        }
    },
    actions: {
        async getRoles() {
            let r = await axios.get("/api/roles?paginate=false")
                .then((r) => {
                    return r.data;
                }).catch((e) => {
                    dispatch("error/setError", error.response.data, {root: true});
                    return null;
                })

            return r;
        },
        async getPaginate({state,commit,dispatch},form) {

            let r = await axios.get("/api/roles", {
                params: form
            }).then((r) => {
                return r.data;
            }).catch((e) => {
                dispatch("error/setError", error.response.data, {root: true});
                return null;
            })

            commit("setPaginate",r);

            return r;
        },
        async getById({state, commit, dispatch}, id) {
            let r = await axios.get("/api/roles/" + id)
                .then((r) => {
                    return r.data;
                })
                .catch((e) => {
                    dispatch("error/setError", error.response.data, {root: true});
                    return null;
                })

            return r;

        },
    },
    getters: {
        getRoles: state => state.roles,
    }
};
