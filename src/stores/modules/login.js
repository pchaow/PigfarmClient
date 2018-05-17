export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        async login({commit, dispatch}, form) {

            dispatch("error/resetError",null,{root: true});

            return await axios.post("/api/auth/login", {
                email: form.email,
                password: form.password,
            }).then((r) => {
                localStorage.user = JSON.stringify(r.data)
                localStorage.accessToken = r.data.accessToken

                return r;
            }).catch((error) => {
                dispatch("error/setError", error.response.data, {root: true});
                return null
            });


        }
    },
    getters: {}
};
