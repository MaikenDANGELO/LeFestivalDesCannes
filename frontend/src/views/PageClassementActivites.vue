<template>
  <div>
    <h1>Classement des activités</h1>
    <div v-for="prestataire in prestataires" :key="prestataire.id">
      <p>{{ prestataire.id }}</p>
      <p>{{ prestataire.nom }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import prestataireService from "../services/prestataires.service";

export default {
  name: "PageClassementActivites",
  data() {
    return {
    };
  },
  computed: {
    ...mapState('prestataire', ["avis_prestataire", "prestataires"]),
  },
  methods: {
    ...mapActions('prestataire', ['getPrestataireAvis', 'getAllPrestataires']),
  },
  actions : {
    async recupPresta(){
      this.prestataire = await prestataireService.getAllPrestataires();
    }
    },
  async created(){
    await this.getAllPrestataires();
    await this.getAllUsers() ;

  }

};
</script>

<style>
</style>
