export default {
  namespaced: true,
  state: {
      test:null,
      breederData:null,
      qr:null
  },
  mutations: {
      show: function (state) {
          state.test = "helloWorld";
      }

  },
  actions: {
    show: function ({state},a) {
      state.test = "helloWorld";
      console.log(a)
  },

  saveBreeder:async function({state},data){
    axios
        .post("/api/save.breeder", data)
        .then(function(response) {
          alert('บันทึกข้อมูลสำเร็จ');
        })
        .catch(function(error) {
          alert(error);
        });
  },
  getCyclesData:async function({state},data){
    var datax = null;
    await axios.get("/api/getcycledata?pid="+data.pigId+"&pcy="+data.cycleSequence)
    .then(response => {

      datax = response.data;
  }).catch(e => { });
  return datax;
  },
  getBreederData: async function({state},data){
   // console.log('use'+"/api/breederData?pid="+data.pigId+"&pcy="+data.cycleSequence);
    var datax = null;

    await axios.get("/api/breederData?pid="+data.pigId+"&pcy="+data.cycleSequence)
          .then(response => {

            datax = response.data;
        }).catch(e => { });
        return datax;
    },

    saveBirth:async function({state},data){
      data.weight =  data.weight.toFixed(2);
      axios
          .post("/api/save.birth", data)
          .then(function(response) {
            alert('บันทึกข้อมูลสำเร็จ');
          })
          .catch(function(error) {
            alert(error);
          });
    },
    saveMilk:async function({state},data){
      data.weight =  data.weight.toFixed(2);
      axios
          .post("/api/save.milk", data)
          .then(function(response) {
            alert('บันทึกข้อมูลสำเร็จ');
          })
          .catch(function(error) {
            alert(error);
          });
    },
    saveVaccine:async function({state},data){
      axios
          .post("/api/save.vaccine", data)
          .then(function(response) {
            alert('บันทึกข้อมูลสำเร็จ');
          })
          .catch(function(error) {
            alert(error);
          });
    },

    getBirthData: async function({state},data){
      console.log('use'+"/api/birthData?pid="+data.pigId+"&pcy="+data.cycleSequence);
      var datax = null;
      await axios.get("/api/birthData?pid="+data.pigId+"&pcy="+data.cycleSequence)
            .then(response => {
              datax = response.data;
          }).catch(e => { });
          return datax;
      },

      getMilkData: async function({state},data){
        console.log('use'+"/api/milkData?pid="+data.pigId+"&pcy="+data.cycleSequence);
        var datax = null;
        await axios.get("/api/milkData?pid="+data.pigId+"&pcy="+data.cycleSequence)
              .then(response => {

                datax = response.data;
            }).catch(e => { });
            return datax;
        },
        getVaccineX: async function({state}){
         var datax = null;
          await axios.get("/api/getchoice?parent=VACCINE")
                .then(response => {
                  datax = response.data;
              }).catch(e => { });
              return datax;
          },
          getMedicineX: async function({state}){
            var datax = null;
             await axios.get("/api/getchoice?parent=MEDICINE")
                   .then(response => {
                     datax = response.data;
                 }).catch(e => { });
                 return datax;
             },

          getVaccineData: async function({state},data){
            console.log('use'+"/api/getVaccineData?pid="+data.pigId+"&pcy="+data.cycleSequence);
            var datax = null;
            await axios.get("/api/getVaccineData?pid="+data.pigId+"&pcy="+data.cycleSequence)
                  .then(response => {

                    datax = response.data;
                }).catch(e => { });
                return datax;
            },
            deleteData: async function({state},data){
             
              var datax = null;
              await axios.get("/api/deleteData?type="+data.deleteType+"&id="+data.deleteId)
                    .then(response => {
                      alert('ลบข้อมูลสำเร็จ');
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
    testx: state => state.cycleData
  },
};
