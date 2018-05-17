export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        async login({commit, dispatch}, form) {

            dispatch("error/resetError",null,{root: true});
            // dispatch("spinner/toggle",true,{root:true});

            let r =  await axios.post("/api/auth/login", {
                email: form.email,
                password: form.password,
            }).then((r) => {
                localStorage.user = JSON.stringify(r.data)
                localStorage.accessToken = r.data.accessToken
                return r.data;
            }).catch((error) => {
                dispatch("error/setError",error.response.data, {root: true});
                return null;
            });
            // dispatch("spinner/toggle",false,{root:true});

            return r;


        }
    },
    getters: {}
};
