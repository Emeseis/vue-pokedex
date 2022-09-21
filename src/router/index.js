import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/Home.vue') },
  { path: '/pokedex/emerald', name: 'Emerald', component: () => import('../views/Emerald.vue') },
  { path: '/pokedex/firered', name: 'FireRed', component: () => import('../views/FireRed.vue') }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
