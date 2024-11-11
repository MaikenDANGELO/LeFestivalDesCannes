<template>
    <div class="prestataire-detail" v-if="prestataire">
      <p>Page don {{ prestataire.nom }}</p>
    </div>
    <div v-else>
      <p>Chargement des données...</p>
    </div>
  </template>
  
  <script>
import {mapActions, mapState} from 'vuex';

export default {
  name: "PageDon",
  data() {
    return {
      prestataire: null,
    };
  },
  methods:{
    ...mapActions('prestataire', ['getAllPrestataires']),
    ...mapActions('utilisateurs', ['getAllUsers']),
    getUtilisateur(id){
      return this.utilisateurs.find(u => u['id_utilisateur'] === id);
    },
  },
  computed: {
    ...mapState('utilisateurs', ['utilisateur', 'utilisateurs']),
    ...mapState('prestataire', ["avis_prestataire", "prestataires"])
  },
  async created() {
    await this.getAllPrestataires();
    await this.getAllUsers();
    const id = this.$route.params.id;
    this.prestataire = this.prestataires.find(p => p.id === id); // récupère le prestataire d'après l'id renseignée depuis la Page  principale    
  },
};
</script>
  
  <style scoped>
  </style>