import Vue from 'vue'
import VueRouter from 'vue-router'
import welcome from '../components/HelloWorld.vue'
import News from '../components/news/News.vue'
import Message from '../components/news/Message.vue'
import Order from '../components/news/Order.vue'
import Taste from '../components/news/Taste.vue'
import index from '../components/Index.vue'
import search from '../components/Search/search.vue'
import shopcar from '../components/shoppingcar/ShoppingCar.vue'
Vue.use(VueRouter)

const routes = [
  // { path: '/', redirect: '/home' },
  // {path: '/home',component: index},
  {path: '/',component: index},
  {path:'/message',component:Message},
  {path:'/Order',component:Order},
  {path:'/Taste',component:Taste},
  {path:'/newslist',component: News},
  {path:'/shopcar',component: shopcar},
  {path:'/search',component: search}
]

const router = new VueRouter({
  routes
})

export default router
