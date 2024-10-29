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
            <div class="user">
              <router-link to="/signup">
                <svg class="icon-user" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 512 512">
                  <path d="M256 512c-68.38 0-132.667-26.629-181.02-74.98S0 324.38 0 256 26.629 123.333 74.98 74.98 187.62 0 256 0s132.667 26.629 181.02 74.98S512 187.62 512 256s-26.629 132.667-74.98 181.02S324.38 512 256 512zm0-472C136.897 40 40 136.897 40 256s96.897 216 216 216 216-96.897 216-216S375.103 40 256 40zm-1 235c-52.935 0-96-43.065-96-96s43.065-96 96-96 96 43.065 96 96-43.065 96-96 96zm0-152c-30.879 0-56 25.122-56 56s25.121 56 56 56 56-25.122 56-56-25.121-56-56-56zm126.712 268.472c8.546-6.999 9.799-19.6 2.8-28.146C356.231 328.801 314.444 309 269.865 309h-23.73c-44.579 0-86.366 19.801-114.646 54.327-6.999 8.545-5.746 21.146 2.8 28.146s21.146 5.745 28.146-2.799c20.65-25.214 51.158-39.674 83.7-39.674h23.73c32.542 0 63.05 14.46 83.701 39.673A19.96 19.96 0 0 0 369.05 396c4.459 0 8.945-1.483 12.662-4.528z"/>
                </svg>
              </router-link>
            </div>
          </div>
          <div v-else class="dropdown">
            <button type="button" class="circle" @click="toggleDropdown">
              {{ initiale }}
            </button>
            <div v-if="isDropdownVisible" class="dropdown-content">
              <button @click="logOut">Déconnexion</button>
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
    ...mapState('utilisateurs',['utilisateur']),
    ...mapState('prestataire',['prestataires']),
    initiale() {
      return this.utilisateur['nom'].charAt(0).toUpperCase();
    }
  },
  methods:{
    ...mapActions('utilisateurs',['logout']),
    ...mapActions('prestataire',['getAllPrestataires']),

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

    },
    logOut() {
      this.isDropdownVisible = false;
      this.logout();
    }
  },
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

.nav-items:hover{
  transition: 2s;

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
  transition: 1s;

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

.nav-items a:hover {
  background-color: #ddd;
  color: black;
  transition: 1s;
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

.user svg path{
  fill: white;
  transition: 0.5s;
}

.user:hover svg path{
  fill: #573b8a;
}
.user a{
  margin-left: -10%;
}

</style>
