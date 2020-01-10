import Vue from 'vue'
import VueRouter from 'vue-router'
import welcome from '../components/HelloWorld.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: welcome
  }
]

const router = new VueRouter({
  routes
})

export default router
