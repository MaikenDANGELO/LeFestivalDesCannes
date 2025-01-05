import Vue from 'vue'
import VueRouter from 'vue-router'
import PagePrincipale from '../views/PagePrincipale.vue'
import Billetterie from "@/views/PageBilletterie.vue";
import Acces from "@/views/PageAcces.vue";
import PagePrestataire from "@/views/PagePrestataire.vue";
import PageSign from "@/views/PageSign.vue";
import PageAdministrateur from "@/views/PageAdministrateur.vue";
import PageSponsor from '@/views/PageSponsor.vue';
import PageDon from '@/views/PageDon.vue';
import PageInscriptionCanard from "@/views/PageInscriptionCanard.vue";
import PageAssociations from "@/views/PageAssociations.vue";
import PageProfil from "@/views/PageProfil.vue";
import PageReservationRestaurant from "@/views/PageReservationRestaurant.vue";
import PageClassementActivites from "@/views/PageClassementActivites.vue";
import PageMenu from "@/views/PageMenu.vue";
import PageStatistiques from '@/views/PageStatistiques.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: PagePrincipale
  },
  {
    path: '/admin',
    name: 'adminhome',
    component: PageAdministrateur
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
    path: '/prestataire/:id', // Route dynamique pour les prestataires
    name: 'Prestataire',
    component: PagePrestataire
  },
  {
    path: '/dons/:id',
    name: 'Dons',
    component: PageDon
  },
  {
    path: '/sponsor/:id',
    name: 'Sponsor',
    component: PageSponsor
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: PageSign
  },
  {
    path: '/inscription-canard',
    name: 'InscriptionCanard',
    component: PageInscriptionCanard
  },
  {
    path: '/associations',
    name:'Associations',
    component : PageAssociations
  },
  {
    path: '/pageProfil',
    name:'pageProfil',
    component : PageProfil
  },
  {
    path: "/reservation-restaurant",
    name: "ReservationRestaurant",
    component: PageReservationRestaurant,
  },
  {
    path : "/classementActivites",
    name : "ClassementActivites",
    component : PageClassementActivites,
  },
  {
    path: '/menu',
    name: 'Menu',
    component: PageMenu,
  },
  {
    path: '/statistiques',
    name: 'Statistiques',
    component: PageStatistiques, // Charge la nouvelle page statistiques
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
