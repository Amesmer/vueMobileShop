import Vue from 'vue'
import VueRouter from 'vue-router'
import welcome from '../components/HelloWorld.vue'
import News from '../components/news/News.vue'
import Message from '../components/news/Message.vue'
import Order from '../components/news/Order.vue'
import Taste from '../components/news/Taste.vue'
import index from '../components/Index.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {path: '/home',component: index},
  {path:'/message',component:Message},
  {path:'/Order',component:Order},
  {path:'/Taste',component:Taste},
  {path:'/newslist',component: News}
]

const router = new VueRouter({
  routes
})

export default router
