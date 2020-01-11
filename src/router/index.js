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
import Detail from '../components/Journalism/Detail.vue'
import Information from '../components/Journalism/Information.vue'
import Add from '../components/photos/Add.vue'
import Photo from '../components/photos/Photo.vue'
Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: index },
    //{path: '/',component: index},
    { path: '/message', component: Message },
    { path: '/Order', component: Order },
    { path: '/Taste', component: Taste },
    { path: '/newslist', component: News },
    { path: '/shopcar', component: shopcar },
    { path: '/search', component: search },
    { path: '/detail', component: Detail },
    { path: '/photo/list', component: Photo },
    { path: '/photo/info/:id', component: Add },
    {
        path: '/information',
        component: Information,
    }

]

const router = new VueRouter({
    routes
})

export default router