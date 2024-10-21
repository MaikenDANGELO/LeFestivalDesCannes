<template>
  <div id="app">
    <nav>
      <router-link to="/"
        ><img alt="Festival logo" src="../public/logoFestivalDeCannes.png"
      /></router-link>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
    <PagePrincipale></PagePrincipale>
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
  max-width: 3cm;
}
</style>
<script setup lang="ts"></script>
import PagePrincipale from "@/components/PagePrincipale.vue"
