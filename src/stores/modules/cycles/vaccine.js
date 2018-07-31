export default {
  namespaced: true,
  state: {
    vaccine:[],
    medicine:[],
  },
  mutations: {


  },
  actions: {

    setData: async function ({state, dispatch, commit}) {
     let r  = await axios.get("/api/farm/pigs/preVaccine/"+1)
      .then((r) => {
        state.vaccine =   r.data;
      });
      let u = await axios.get("/api/farm/pigs/preVaccine/"+2)
      .then((r) => {
        state.medicine =   r.data;
      });
    },

    update: async function ({state, commit, dispatch}, form) {
      let r = await axios.put("/api/farm/pigs/vaccine/" + form.id, form)
          .then((r) => {
              alert("แก้ไขข้อมูลสำเร็จ");
              return r.data;

          }).catch((error) => {
              dispatch("error/setError", error.response.data, {root: true});
              return null;
          });
      return r;
  },
    save: async function ({state}, x) {
      axios
      .post("/api/farm/pigs/vaccine",x)
      .then(function(response) {
        alert('บันทึกข้อมูลสำเร็จ');
      })
      .catch(function(e) {
        dispatch("error/setError", e.response.data, {root: true});
      });
    },
    destroy:async function ({state,dispatch}, id) {
      let result = await axios.delete('/api/farm/pigs/vaccine/' + id)
      .then((r) => {
          return r.data
      }).catch((e) => {
          dispatch("error/setError", e.response.data, {root: true});
      });
    },


  },
  getters: {

  },
};
