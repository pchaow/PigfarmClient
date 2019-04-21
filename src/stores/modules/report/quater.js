
import _ from 'lodash'
import { make } from 'vuex-pathify'
const state = {
  yearsQuater:[],
  yearSet:0,
  quaterData:{

  }
}
const getters = {

}

const mutations = make.mutations(state)

const actions = {

  async getyearsQuater(){
    await axios.get('/api/show/report/year')
    .then((r) => {
      state.yearsQuater = r.data;
    }).catch((e) => {

     });
  },

  async getQuater(context,params){
    state.yearSet = params;
    await axios.get('/api/show/report/quater?year='+params)
    .then((r) => {
      state.quaterData = r.data;
    }).catch((e) => {

     });
  }
 // 0/api/show/report/quater?year=2019
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
  }
