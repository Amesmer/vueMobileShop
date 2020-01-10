import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jjjj: [],
    jlfg: { id: '', count: 1 },
  },
  mutations: {
    add(state, step) {
      console.log(step);
      state.jlfg.count += step.count
      state.jlfg.id=step.id
      state.jjjj.push(state.jlfg)
    }
  },
  actions: {
  },
  modules: {
  },

})
