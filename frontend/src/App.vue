<template>
  <div id="app">
    <nav :class="{ 'hidden': isHidden, 'is-top': isTop }">
      <div class="topnav">
        <router-link class="left-element nav-link-common" to="/">
          <img @click="this.handlePrestDropdownClick" alt="Festival logo" :src="require(`./assets/logoFestivalDesCannes.png`)">
        </router-link>
        <div id="navItems" class="nav-items">
          <div class="left-items" @click="this.handlePrestDropdownClick">
            <button class="left-element nav-link-common" @click="this.toggleDropdown2">Prestataires</button>
            <div @click="this.handlePrestDropdownClick" class="dropdown-content" v-if="isDropdownVisible2">
              <router-link  v-for="prestataire in this.prestataires" :key="prestataire['id']" :to="`/prestataire/${prestataire['id']}`">{{prestataire['nom']}}</router-link>
            </div>
            <router-link class="left-element nav-link-common" to="/acces">Accès</router-link>
            <router-link class="left-element nav-link-common" to="/billeterie">Billetterie</router-link>
            <router-link class="left-element nav-link-common" to="/about">À propos</router-link>
            <router-link class="left-element nav-link-common" to="/associations">Associations</router-link>
            <router-link class="left-element nav-link-common" to="/classementActivites">Classement des activités</router-link>
            <router-link class="left-element nav-link-common" to="/boutique">Boutique Goodies</router-link>
            <router-link class="left-element nav-link-common" v-if="this.utilisateur.role === 'admin'" to="/admin">Page Administrateur</router-link>
            <a class="left-element nav-link-common" href="https://www.twitch.tv/dashducks" target="_blank">
              <img alt="Twitch logo" :src="require(`./assets/twitch.png`)" class="twitch-logo">
            </a>
            <router-link class="left-element nav-link-common" v-if="this.utilisateur.role === 'prestataire'"  :to="`/prestataire/edit/${this.utilisateur.id}`">Page Prestataire</router-link>

          </div>
        </div>
        <div class="right-items">
          <router-link v-if="!utilisateur.estConnecte" to="/signup" class="nav-link">
            <svg class="icon-user" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 512 512">
              <path d="M256 512c-68.38 0-132.667-26.629-181.02-74.98S0 324.38 0 256 26.629 123.333 74.98 74.98 187.62 0 256 0s132.667 26.629 181.02 74.98S512 187.62 512 256s-26.629 132.667-74.98 181.02S324.38 512 256 512zm0-472C136.897 40 40 136.897 40 256s96.897 216 216 216 216-96.897 216-216S375.103 40 256 40zm-1 235c-52.935 0-96-43.065-96-96s43.065-96 96-96 96 43.065 96 96-43.065 96-96 96zm0-152c-30.879 0-56 25.122-56 56s25.121 56 56 56 56-25.122 56-56-25.121-56-56-56zm126.712 268.472c8.546-6.999 9.799-19.6 2.8-28.146C356.231 328.801 314.444 309 269.865 309h-23.73c-44.579 0-86.366 19.801-114.646 54.327-6.999 8.545-5.746 21.146 2.8 28.146s21.146 5.745 28.146-2.799c20.65-25.214 51.158-39.674 83.7-39.674h23.73c32.542 0 63.05 14.46 83.701 39.673A19.96 19.96 0 0 0 369.05 396c4.459 0 8.945-1.483 12.662-4.528z"/>
            </svg>
          </router-link>
          <div v-else class="dropdown" @click="handleDropdownClick">
            <button @click="toggleDropdown" class="circle">{{ initiale }}</button>
            <div v-if="isDropdownVisible" class="dropdown-content">
              <router-link v-if="utilisateur.role !== 'admin' " to="/pageProfil">Profil</router-link>
              <button @click="logOut">Déconnexion</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      isHidden: false,
      lastScrollY: 0,
      isDropdownVisible: false,
      isDropdownVisible2: false,
      isTop: true, // Indique si on est en haut de la page
    };
  },
  computed: {
    ...mapState('utilisateurs', ['utilisateur']),
    ...mapState('prestataire', ['prestataires']),
    initiale() {
      return this.utilisateur['nom']?.charAt(0).toUpperCase();
    }
  },
  methods: {
    ...mapActions('utilisateurs', ['logout']),
    ...mapActions('prestataire', ['getAllPrestataires']),
    handleScroll() {
      const currentScrollY = window.scrollY;

      this.isHidden = currentScrollY > this.lastScrollY && currentScrollY > 50;
      this.isTop = currentScrollY === 0;
      this.lastScrollY = currentScrollY;
    },
    toggleDropdown() {
      event.stopPropagation();
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    handleDropdownClick() {
      this.isDropdownVisible = false;
    },

    toggleDropdown2() {
      event.stopPropagation();
      this.getAllPrestataires();
      this.isDropdownVisible2 = !this.isDropdownVisible2;

    },
    handlePrestDropdownClick() {
      this.isDropdownVisible2 = false;
    },
    logOut() {
      this.toggleDropdown();
      if(this.$route.name !== 'home' )this.$router.push({ name: "home" });
      this.logout();
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style>
template{
  overflow: scroll; /* Permet le défilement */
  -ms-overflow-style: none; /* Masque la barre de défilement dans IE et Edge */
  scrollbar-width: none; /* Masque la barre dans Firefox */
}

nav {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: rgba(51, 51, 51, 0.9); /* Fond transparent par défaut */
  transition: transform 0.4s ease, background-color 0.4s ease; /* Animation de la transition */
  z-index: 1000;
}

nav.is-top {
  background-color: rgba(51, 51, 51, 1); /* Fond opaque en haut de la page */
  position: initial;
}

nav.hidden {
  transform: translateY(-100%); /* Déplace la navbar vers le haut pour la cacher */
}

body::-webkit-scrollbar {
  display: none; /* Masque la barre de défilement dans WebKit */
}

img {
  max-width: 2cm;
}

.nav-items{
  display: flex;
  flex-direction: row;

}

.nav-items:hover{
  transition: 2s;

}


.topnav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

/* Style the links inside the navigation bar */
.nav-link-common {
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: transparent;
  border: none; /* Retire la bordure du bouton */
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s; /* Animation fluide */
  float: left;
}

.nav-link-common:hover {
  background-color: #ddd;
  color: black;
}

.topnav div.right-items{
  margin-left: auto;
}

body {
  margin: 0;
  font-family: 'Arial', sans-serif;
  overflow: scroll;
}

.left-items{
  display: flex;
}

.dropdown {
  right: 50%;
  position: relative;
  display: inline-block;
}

.circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #3498db;
  color: white;
  font-size: 20px;
  font-weight: bold;
  border: none;
  cursor: pointer;
}

.left-items .dropdown-content{
  position: absolute;
  background-color: white;
  top: 10%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.dropdown-content a,
.dropdown-content button{
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: #333;
  border: none;
}
.dropdown-content a:hover,
.dropdown-content button:hover{
  background-color: #ddd;
  color: black;
}

.right-items .dropdown-content {
  position: absolute;
  background-color: white;
  right: 0;
  top: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}



.nav-link svg path{
  fill: white;
  transition: 0.5s;
}

.nav-link:hover svg path{
  fill: #573b8a;
}
.nav-link a{
  margin-left: -10%;
}

.twitch-logo {
  width: 2em;
  padding: 0;
  cursor: pointer;
  transition: transform 0.3s ease;
}
.twitch-logo:hover {
  transform: scale(1.1);
}


</style>
