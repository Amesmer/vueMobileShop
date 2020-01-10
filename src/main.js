import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
// 导入axios
import axios from 'axios'

//导入字体图标
import font from './assets/font/iconfont'
Vue.config.productionTip = false

// 配置请求基地址
axios.defaults.baseURL = 'http://www.liulongbin.top:3005/'

Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
