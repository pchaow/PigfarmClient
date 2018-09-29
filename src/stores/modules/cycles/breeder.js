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
      .post("/api/cycles/breeder/gravid",x)
      .then(function(response) {
        alert('บันทึกข้อมูลสำเร็จ');
      })
      .catch(function(error) {
        dispatch("error/setError", error.response.data, {root: true});
      });
    },
    update: async function ({state, commit, dispatch}, form) {
      let r = await axios.put("/api/farm/pigs/"+form.pig_id+"/cycles/"+form.pig_cycle_id+"/breeder/" + form.id, form)
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
      .post("/api/farm/pigs/"+x.pig_id+"/cycles/"+x.pig_cycle_id+"/breeder",x)
      .then(function(response) {
        alert('บันทึกข้อมูลสำเร็จ');
      })
      .catch(function(error) {
        alert(error);
      });
    },
    destroy:async function ({state}, form) {
      let result = await axios.delete("/api/farm/pigs/"+form.pig_id+"/cycles/"+form.pig_cycle_id+"/breeder/" + form.id)
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
