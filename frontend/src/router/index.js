import Vue from 'vue'
import VueRouter from 'vue-router'
import PagePrincipale from '../views/Événement/PagePrincipale.vue'
import Billetterie from "@/views/Événement/PageBilletterie.vue";
import Acces from "@/views/Événement/PageAcces.vue";
import PagePrestataire from "@/views/Prestataires/PagePrestataire.vue";
import PageSign from "@/views/Événement/PageSign.vue";
import PageAdministrateur from "@/views/Admin/PageAdministrateur.vue";
import PageSponsor from '@/views/PageSponsor.vue';
import PageDon from '@/views/Prestataires/PageDon.vue';
import PageInscriptionCanard from "@/views/PageInscriptionCanard.vue";
import PageAssociations from "@/components/PageAssociations.vue";
import PageProfil from "@/views/Événement/PageProfil.vue";
import PageReservationRestaurant from "@/views/Prestataires/PageReservationRestaurant.vue";
import PageClassementActivites from "@/components/PageClassementActivites.vue";
import PageMenu from "@/views/Prestataires/PageMenu.vue";
import PageStatistiques from '@/views/Admin/PageStatistiques.vue';
import PageBoutique from '@/views/Boutique/PageBoutique.vue';
import PageDetailsArticle from '@/views/Boutique/PageDetailsArticle.vue';
import PagePanier from '@/views/Boutique/PagePanier.vue';
import PageSuiviCommande from '@/views/Boutique/PageSuiviCommande.vue';



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
    path: '/prestataire/:id',
    name: 'Prestataire',
    component: PagePrestataire
  },
  {
    path: '/prestataire/edit/:id',
    name: 'editPrest',
    component: () => import('@/views/Prestataires/PageEditPrest.vue')
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
    component: PageStatistiques, 
  },
  {
    path: "/boutique",
    name: "boutique",
    component: PageBoutique,
  },
  {
    path: "/boutique/article/:id",
    name: "PageDetailsArticle",
    component: PageDetailsArticle,
    props: true
  },
  {
    path: '/boutique/panier',
    name: 'PagePanier',
    component: PagePanier,
  },
  {
    path: '/boutique/suivi',
    name: 'PageSuiviCommande',
    component: PageSuiviCommande,
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
