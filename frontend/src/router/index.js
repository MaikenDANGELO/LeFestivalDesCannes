import Vue from 'vue'
import VueRouter from 'vue-router'
import PagePrincipale from '../views/PagePrincipale.vue'
import Billetterie from "@/views/PageBilletterie.vue";
import Acces from "@/views/PageAcces.vue";
import PageLogin from "@/views/PageLogin.vue";
import PagePrestataire from "@/views/PagePrestataire.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: PagePrincipale
  },
  {
    path: '/billeterie',
    name: 'billeterie',
    component: Billetterie
  },
  {
    path: '/acces',
    name: 'acces',
    component: Acces
  },
  {
    path: '/login',
    name: 'login',
    component: PageLogin
  },
  {
    path: '/prestataire/:id', // Route dynamique pour les prestataires
    name: 'Prestataire',
    component: PagePrestataire
  }
  /*{
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ /*'../views/AboutView.vue')
  }*/
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
