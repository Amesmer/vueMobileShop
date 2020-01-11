import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jjjj: [],
    jlfg: { id: '', count: 0 },
    // 添加的id数组
    ids: [],
    // 总数量
    shopcarsize: 0
  },
  mutations: {
    // 商品列表页面传递到id和数量
    add(state, step) {
      state.jlfg.count = step.count
      state.jlfg.id = step.id
      var fff = 0
      console.log('长度', state.jjjj.length);
      for (let i = 0; i < state.jjjj.length; i++) {
        if (state.jjjj[i].id == step.id) {
          state.jjjj[i].count += step.count;
          fff = 1
        }
      }
      console.log('fff的值', fff);
      if (fff != 1) {
        // 需要创建一个新的对象加入!!!!important
        state.jjjj.push({ id: state.jlfg.id, count: state.jlfg.count });
      }
      // console.log('fff的值',fff);

      this.commit('calshopcarsize')
      // 数组中包含元素 去除重复的id
      if (state.ids.indexOf(step.id) > -1) {
        return
      }
      state.ids.push(step.id)
    },
    // 请求后清除这次请求参数
    clear(state) {
      state.jjjj = []
      state.jlfg.id = ''
      state.jlfg.count = 0
      state.ids = []
    },
    // 计算总数量
    calshopcarsize(state) {
      let nowsize = 0
      let localsize = []
      state.jjjj.forEach(item => {
        nowsize += item.count
        // console.log(item);
      })
      localsize = JSON.parse(localStorage.getItem('carlist'))
      if (localsize != null) {
        localsize.forEach(items => {
          nowsize += items.cou
        })
      }
      state.shopcarsize = nowsize
      console.log(state.shopcarsize)
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
  getters: {
    // shopcarsize: function(){
    //   var nowsize=0
    //   state.jjjj.forEach(item=>{
    //     nowsize+=item.count
    //   })
    //  var localsize= localStorage.getItem('carlist')
    //  if(localsize.length>1){
    //    localsize.forEach(items=>{
    //      nowsize+=items.cou
    //    })
    //  }
    //  return nowsize
    // }
  }
})
