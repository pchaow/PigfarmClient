export default {
  namespaced: true,
  state: {
    breederData:[],
  },
  mutations: {


  },
  actions: {
    gravid: async function ({state,dispatch}, x) {
      console.log(x);
      axios
      .post("/api/farm/pigs/gravid",x)
      .then(function(response) {
        alert('บันทึกข้อมูลสำเร็จ');
      })
      .catch(function(error) {
        dispatch("error/setError", error.response.data, {root: true});
      });
    },
    update: async function ({state, commit, dispatch}, form) {
      let r = await axios.put("/api/farm/pigs/breeder/" + form.id, form)
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
      console.log(x);
      axios
      .post("/api/farm/pigs/breeder",x)
      .then(function(response) {
        alert('บันทึกข้อมูลสำเร็จ');
      })
      .catch(function(error) {
        alert(error);
      });
    },
    destroy:async function ({state}, id) {
      let result = await axios.delete('/api/farm/pigs/breeder/' + id)
      .then((r) => {
          return r.data
      }).catch((e) => {
          dispatch("error/setError", error.response.data, {root: true});
      });
    },

    setBreederData: async function ({state, dispatch, commit}, data) {
      state.breederData = data;
    }

  },
  getters: {
    getData:state => state.breederData,
  },
};
