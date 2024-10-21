<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <CarteInteractive msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import CarteInteractive from '@/components/CarteInteractive.vue'

export default {
  name: 'HomeView',
  components: {
    CarteInteractive
  }
}
</script>
