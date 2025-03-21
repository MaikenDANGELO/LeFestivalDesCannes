<template>
  <div>
    <h1>Choisissez un restaurant</h1>
    <div v-for="prestataire in prest" :key="prestataire.id">
      <router-link :to="'/reservation-restaurant/' + prestataire.id">
        <div class="reservation-section">
          <div class="reservation-text">
            <h2>{{ prestataire.nom }}</h2>
            <p>{{ prestataire.description_accueil }}</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>


<script>
import prestatairesService from "@/services/prestataires.service";

export default {
  data(){
    return{
      prest:[],
    }
  },
  async mounted() {
    this.prest = await prestatairesService.getPrestGastroService();
    this.prest = this.prest.data
  }
}
</script>


<style scoped>

</style>