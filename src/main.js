import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
// 导入axios
import axios from 'axios'

//导入字体图标
import './assets/font/iconfont.css'
Vue.config.productionTip = false

// 配置请求基地址
axios.defaults.baseURL = 'http://www.liulongbin.top:3005/'

Vue.prototype.$http = axios

// 时间格式过滤
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  // padstart    2位自动填充字符串
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `商品上架时间:${y}-${m}-${d}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
