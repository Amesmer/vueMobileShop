import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jjjj: [],
    jlfg: { id: '', count: 0 },
    ids:[]
  },
  mutations: {
    add(state, step) {
      console.log(step);
      state.jlfg.count += step.count
      state.jlfg.id=step.id
      state.jjjj.push(state.jlfg)
      // 数组中包含元素
      if(state.ids.indexOf(step.id)> -1){
        return
      }
      state.ids.push(step.id)
    },
    // 请求后清除这次请求参数
    clear(state){
      state.jjjj=[]
      state.jlfg.id=''
      state.jlfg.count=0
      state.ids=[]
    }
  },
  actions: {
    // getList(context) {
    //   console.log(state.ids.join(','));
      
    //   Axios.get('api/goods/getshopcarlist/'+state.ids.join(',')).then(({data})=>{
    //     console.log(data)
    
    //   })
    // }
  },
  modules: {
  },

})
