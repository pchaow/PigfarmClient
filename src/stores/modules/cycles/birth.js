export default {
  namespaced: true,
  state: {
    vaccine:[],
    medicine:[],
  },
  mutations: {


  },
  actions: {


    update: async function ({state, commit, dispatch}, form) {
      let r = await axios.put("/api/farm/pigs/birth/" + form.id, form)
          .then((r) => {
              alert("แก้ไขข้อมูลสำเร็จ");
              return r.data;

          }).catch((error) => {
              dispatch("error/setError", error.response.data, {root: true});
              return null;
          });
      return r;
  },
    save: async function ({state,dispatch}, x) {
      axios
      .post("/api/farm/pigs/birth",x)
      .then(function(response) {
        alert('บันทึกข้อมูลสำเร็จ');
      })
      .catch(function(e) {
        dispatch("error/setError", e.response.data, {root: true});
      });
    },
    destroy:async function ({state,dispatch}, id) {
      let result = await axios.delete('/api/farm/pigs/birth/' + id)
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