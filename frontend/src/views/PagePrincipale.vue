<template>
  <div class="hello">
    <BanniereAccueil></BanniereAccueil> 
    <p>{{ prestataires() }}</p>

  </div>
</template>



<script>
import {mapState} from "vuex";
import {prestataires} from "@/datasource/data";
import BanniereAccueil from "@/components/BanniereAccueil.vue"

export default {
  name: "PagePrincipale",
  methods: {
    prestataires() {
      return prestataires
    }
  },
  components: {
    BanniereAccueil
  },
  computed:{
    ...mapState([prestataires])
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
