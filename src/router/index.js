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
      import(/* webpackChunkName: "screen1" */ '../views/Screen1.vue')
  },
  {
    path: '/screen2',
    name: 'Screen2',
    component: () =>
      import(/* webpackChunkName: "screen2" */ '../views/Screen2.vue')
  },
  {
    path: '/screen3',
    name: 'Screen3',
    component: () =>
      import(/* webpackChunkName: "screen3" */ '../views/Screen3.vue')
  },
  {
    path: '/union',
    name: 'Union',
    component: () =>
      import(/* webpackChunkName: "union" */ '../views/Union.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
