import Vue from 'vue'
import VueRouter from 'vue-router'
// import welcome from '../components/HelloWorld.vue'
import index from '../components/Index.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  // {
  //   path: '/home',
  //   component: welcome
  // },
  {
    path: '/home',
    component: index
  }
]

const router = new VueRouter({
  routes
})

export default router
