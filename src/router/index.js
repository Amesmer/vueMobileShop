import Vue from 'vue'
import VueRouter from 'vue-router'
import welcome from '../components/HelloWorld.vue'
import Information from '../components/Journalism/Information.vue'
import Detail from '../components/Journalism/Detail.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/home' },
    {
        path: '/home',
        component: Information
    },
    { path: '/detail', component: Detail }
]

const router = new VueRouter({
    routes
})

export default router