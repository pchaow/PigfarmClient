
export default {
  namespaced: true,
  state: {
    pigAvg:0,
    pigData:[],
      test:null,
      breederData:null,
      qr:null,
      form: {
        with: ["cycles", "cycles.breeders","cycles.birth","cycles.milk","cycles.vaccine","cycles.feed","cycles.feedout"]
      }
  },
  mutations: {
      show: function (state) {
          state.test = "helloWorld";
      }

  },
  actions: {
    checkNull (tmp)  {
     /* var ch = true;
      Object.keys(tmp).forEach(function (key) {
        // console.log(key+"="+c[key] +"=>"+ch);
        if (tmp[key] == null) {
          ch = false;
          key = false;
        }
      });

      return ch;*/
      return true;
    },

    calAvg({state}, tmp)  {
      state.pigAvg = 0;
      var x = 0;
      var pig = tmp.length;

      for (var i = 0; i < tmp.length; i++) {
        x += Number(tmp[i]);

      }
      state.pigAvg = x / pig;

    },
    setAvg({state}, tmp){
      state.pigAvg = tmp
    },
    goNull: async function ({state}, tmp)  {

      Object.keys(tmp).forEach(function (key) {
        // console.log(key+"="+c[key] +"=>"+ch);
        tmp[key] = null;
      });

      return tmp;
    },

    getById: async function ({state, dispatch, commit}, id) {

      let result = await axios.get("/api/farm/pigs/" + id, {
          params: state.form
      }).then((r) => {
          state.pigData =  r.data;
      }).catch((e) => {

          state.pigData =  null;
      });

      return result;
  },

    show: function ({state},a) {
      state.test = "helloWorld";
      console.log(a)
  },

  saveBreeder:async function({state},data){
    axios
        .post("/api/farm/pigs/breeder", data)
        .then(function(response) {
         // alert('บันทึกข้อมูลสำเร็จ');
        })
        .catch(function(error) {
          alert(error);
        });
  },

  deleteBreeder:async function({state},id){
    let result = await axios.delete('/api/farm/pigs/breeder/' + id)
        .then((r) => {
            return r.data
        }).catch((e) => {
            dispatch("error/setError", error.response.data, {root: true});
        });

  },

  saveBirth:async function({state},data){
    axios
    .post("/api/farm/pigs/birth", data)
    .then(function(response) {
      alert('บันทึกข้อมูลสำเร็จ');
    })
    .catch(function(error) {
      alert(error);
    });
  },
  deleteBirth:async function({state},id){
    let result = await axios.delete('/api/farm/pigs/birth/' + id)
    .then((r) => {
        return r.data
    }).catch((e) => {
        dispatch("error/setError", error.response.data, {root: true});
    });
  },

  saveFeed:async function({state},data){
    axios
    .post("/api/farm/pigs/feed", data)
    .then(function(response) {
      alert('บันทึกข้อมูลสำเร็จ');
    })
    .catch(function(error) {
      alert(error);
    });
  },
  deleteFeed:async function({state},id){
    let result = await axios.delete('/api/farm/pigs/feed/' + id)
    .then((r) => {
        return r.data
    }).catch((e) => {
        dispatch("error/setError", error.response.data, {root: true});
    });
  },

  saveFeedOut:async function({state},data){
    axios
    .post("/api/farm/pigs/feedout", data)
    .then(function(response) {
      alert('บันทึกข้อมูลสำเร็จ');
    })
    .catch(function(error) {
      alert(error);
    });
  },
  deleteFeedOut:async function({state},id){
    let result = await axios.delete('/api/farm/pigs/feedout/' + id)
    .then((r) => {
        return r.data
    }).catch((e) => {
        dispatch("error/setError", error.response.data, {root: true});
    });
  },

  saveMilk:async function({state},data){
    axios
    .post("/api/farm/pigs/milk", data)
    .then(function(response) {
      alert('บันทึกข้อมูลสำเร็จ');
    })
    .catch(function(error) {
      alert(error);
    });
  },
  deleteMilk:async function({state},id){
    let result = await axios.delete('/api/farm/pigs/milk/' + id)
    .then((r) => {
        return r.data
    }).catch((e) => {
        dispatch("error/setError", error.response.data, {root: true});
    });
  },





  qrPass: async function({state},data){
                  this.qr = data;


                },
                qrGen: async function({state}){
                  var data = this.qr;
                  console.log(data);
                  return data;
                },


  },
  getters: {
    testx: state => state.cycleData,
    PigData:state=>state.PigData

  },
};
