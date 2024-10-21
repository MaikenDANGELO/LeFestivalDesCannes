<template>
  <div id="app">
    <nav>
      <div class="topnav">
        <a class="active" href="/"
          ><img alt="Festival logo" src="src/assets/logoFestivalDesCannes.png">
        </a>
        <div id="navItems" class="nav-items">
          <a href="#news">Prestataires</a>
          <a href="/acces">Accès</a>
          <a href="/billeterie">Billetterie</a>
          <a href="/about">About</a>
        </div>
        <div id="navItems" class="login-items">
          <a href="#news">Connexion</a>
          <a href="#contact">Inscription</a>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style>
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

/* Add a black background color to the top navigation */
.topnav {
  display: flex;
  align-items: center;
  background-color: #333;
  overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav div.nav-items {
  display: flex;
  align-items: center;
  gap: 20px;
}
.topnav div.login-items {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: auto;
}
body {
  margin: 0;
}
</style>
<script setup lang="ts">
</script>
