export default {
    namespaced: true,
    state: {
        visible: true,
    },
    mutations: {
        updateVisible(state,value) {
            state.visible = value;
        }
    },
    actions: {
        toggle({state,commit}, bool = null) {
            console.log('visible',state.visible,bool);
            if(bool == null){
                bool = !state.visible;
            }
            commit('updateVisible',bool)
        }
    },
    getters: {
        getVisible: state => state.visible
    }
};
