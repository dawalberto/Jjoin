import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/screen1',
    name: 'Screen1',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Screen1.vue')
  },
  {
    path: '/screen2',
    name: 'Screen2',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Screen2.vue')
  },
  {
    path: '/screen3',
    name: 'Screen3',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Screen3.vue')
  },
  {
    path: '/union',
    name: 'Union',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Union.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
