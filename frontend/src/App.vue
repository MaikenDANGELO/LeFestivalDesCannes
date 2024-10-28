<template>
  <div id="app">
    <nav>
      <div class="topnav">
        <router-link to="/">
          <img alt="Festival logo" :src="require(`./assets/logoFestivalDesCannes.png`)">
        </router-link>
        <div id="navItems" class="nav-items">
          <div class="prest-dropdown">
            <button class="prest-button" @click="this.toggleDropdown2">Prestataires</button>
            <div class="prest-dropdown-content" v-if="isDropdownVisible2">
              <router-link @click.native="handlePrestDropdownClick" v-for="prestataire in this.prestataires" :key="prestataire['id']" :to="`/prestataire/${prestataire['id']}`">{{prestataire['nom']}}</router-link>
            </div>
          </div>
          <router-link to="/acces">Accès</router-link>
          <router-link to="/billeterie">Billetterie</router-link>
          <router-link to="/about">About</router-link>
        </div>
        <div class="right-items">
          <div v-if="!this.utilisateur.estConnecte" id="navItems" class="login-items">
            <router-link to="/login">Connexion</router-link>
            <router-link to="/login">Inscription</router-link>
          </div>
          <div v-else class="dropdown">
            <button type="button" class="circle" @click="toggleDropdown">
              {{ initiale }}
            </button>
            <div v-if="isDropdownVisible" class="dropdown-content">
              <button @click="logout">Déconnexion</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts">
import {mapState, mapActions} from "vuex";
export default {
  data() {
    return{
      isDropdownVisible: false,
      isDropdownVisible2: false,
    }
  },
  computed:{
    ...mapState([ 'utilisateur']),
    ...mapState(['prestataires']),
    initiale() {
      return this.utilisateur['nom'].charAt(0).toUpperCase();
    }
  },
  methods:{
    ...mapActions([ 'logout']),
    ...mapActions(['getAllPrestataires']),
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    toggleDropdown2() {
      this.getAllPrestataires();
      this.isDropdownVisible2 = !this.isDropdownVisible2;
    },
    handlePrestDropdownClick(){
      this.isDropdownVisible2 = false;
      this.$router.go(0);
    }
  }
}
</script>
<style>
template{
  overflow: scroll; /* Permet le défilement */
  -ms-overflow-style: none; /* Masque la barre de défilement dans IE et Edge */
  scrollbar-width: none; /* Masque la barre dans Firefox */
}

body::-webkit-scrollbar {
  display: none; /* Masque la barre de défilement dans WebKit */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;

}
img {
  max-width: 2cm;
}

.nav-items{
  display: flex;
  flex-direction: row;
}
.prest-button{
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
.prest-button:hover{
  background-color: #ddd;
  color: black;
  cursor: grab;
}
.prest-dropdown{
  position: relative;
  display: inline-block;
}
.prest-dropdown-content {
  display: block;
  position: absolute;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  background-color: #333;
}

/* Add a black background color to the top navigation */
.topnav {
  display: flex;
  align-items: center;
  background-color: #333;
  overflow: visible;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  display: flex;
  align-items: center;
  gap: 20px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav div.right-items{
  margin-left: auto;
}

body {
  margin: 0;
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

.dropdown-content {
  display: block;
  position: absolute;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1;
  right: 30%;
}

.dropdown-content button {
  background: none;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  width: 100%;
  text-align: left;
}

.dropdown-content button:hover {
  background-color: #f1f1f1;
}
</style>
