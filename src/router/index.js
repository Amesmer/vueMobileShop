import Vue from 'vue'
import VueRouter from 'vue-router'
import Photo from '../components/photos/Photo.vue'
import Add from '../components/photos/Add.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home'},
  {
    path: '/photo/list',
    component: Photo
  },
  { path: '/photo/info/:id',  component:Add },
]

const router = new VueRouter({
  routes
})

export default router
