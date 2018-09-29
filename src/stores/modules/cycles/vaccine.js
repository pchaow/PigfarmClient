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
     let r  = await axios.get("/api/choices/VACCINE")
      .then((r) => {
        state.vaccine =   r.data.children;
      });
      let u = await axios.get("/api/choices/MEDICINE")
      .then((r) => {
        state.medicine =   r.data.children;
      });
    },

    update: async function ({state, commit, dispatch}, form) {
      let r = await axios.put("/api/farm/pigs/"+form.pig_id+"/cycles/"+form.pig_cycle_id+"/vaccine/"+form.id, form)
          .then((r) => {
              alert("แก้ไขข้อมูลสำเร็จ");
              return r.data;

          }).catch((error) => {
              dispatch("error/setError", error.response.data, {root: true});
              return null;
          });
      return r;
  },
    save: async function ({state}, form) {
      axios
      .post("/api/farm/pigs/"+form.pig_id+"/cycles/"+form.pig_cycle_id+"/vaccine",form)
      .then(function(response) {
        alert('บันทึกข้อมูลสำเร็จ');
      })
      .catch(function(e) {
        dispatch("error/setError", e.response.data, {root: true});
      });
    },
    destroy:async function ({state,dispatch}, form) {
      let result = await axios.delete("/api/farm/pigs/"+form.pig_id+"/cycles/"+form.pig_cycle_id+"/vaccine/"+ form.id)
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
