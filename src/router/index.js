import Vue from 'vue'
import VueRouter from 'vue-router'
import welcome from '../components/HelloWorld.vue'
import search from '../components/Search/search.vue'
import shopcar from '../components/shoppingcar/ShoppingCar.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component:  shopcar
  }
]

const router = new VueRouter({
  routes
})

export default router
