<template>
  <div class="hello">
    <BanniereAccueil></BanniereAccueil>
    <div class="liste-prestataires" id="prestataires">
      <h2>Prestataires</h2>
      <div class="prestataires-row" v-for="row in getPrestaRows()" :key="row[0].id">
        <div v-for="prestataire in row" :key="prestataire.id" class="prestataire-card">
          <CartePrestatairePerso
            :nom="prestataire.nom"
            :descriptionAccueil="prestataire.description_accueil"
            :image="prestataire.image"
            :pers-page-route="`/prestataire/${prestataire.id}`"></CartePrestatairePerso>
        </div>
      </div>
    </div>
    <div class="liste-prestataires" id="sponsors">
      <h2>Sponsors</h2>
      <div class="prestataires-row" v-for="row in getSponsorsRows()" :key="row[0].id_sponsor">
        <div v-for="sponsor in row" :key="sponsor.id_sponsor" class="prestataire-card">
          <CartePrestatairePerso
            :nom="sponsor.nom_sponsor"
            :description-accueil="sponsor.description_accueil"
            :image="sponsor.image"
            :pers-page-route="`/sponsor/${sponsor.id_sponsor}`"></CartePrestatairePerso>
        </div>
      </div>
    </div>
    <TotalDons></TotalDons>
    <br>
  </div>
</template>



<script>
import BanniereAccueil from "@/components/BanniereAccueil.vue";
import CartePrestatairePerso from "@/components/CartePrestatairePerso.vue";
import { mapState, mapActions } from "vuex";
import TotalDons from "@/components/totalDons.vue";

export default {
  name: "PagePrincipale",
  data() {
    return {
      prestatairesRows: [],
    };
  },
  computed: {
    ...mapState('prestataire', ['prestataires']), // on récupère prestataires depuis le store
    ...mapState('sponsors', ['sponsors']),
  },
  methods: {
    ...mapActions('prestataire', ['getAllPrestataires']), // on récupère la méthode de récupération des prestataires du store
    ...mapActions('sponsors', ['getAllSponsors']),
    getPrestaRows() {
      this.getAllPrestataires(); // charge les prestataires depuis les données
      let prestataires = this.prestataires;
      let rows = [];
      for (let i = 0; i < prestataires.length; i += 4) { // Ajusté pour 4 blocs par ligne
        rows.push(prestataires.slice(i, i + 4));
      }
      return rows;
    },
    getSponsorsRows(){
      this.getAllSponsors(); // charge les prestataires depuis les données
      let sponsors = this.sponsors;
      let rows = [];
      for (let i = 0; i < sponsors.length; i += 4) { // Ajusté pour 4 blocs par ligne
        rows.push(sponsors.slice(i, i + 4));
      }
      return rows;
    },
    // Gère l'envoi de commentaire depuis une page prestataire
    handleCommentSent(data) {
      console.log(data);
      return data;
    },
  },
  components: {
    TotalDons,
    BanniereAccueil,
    CartePrestatairePerso,
  },
};
</script>


<style scoped>
.liste-prestataires {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
}

.prestataires-row {
  display: flex;
  flex-wrap: wrap; 
  gap: 20px; 
  justify-content: center;
  margin-bottom: 20px;
}

.prestataire-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(25% - 20px); /* Ajusté pour quatre blocs par ligne avec espace */
  box-sizing: border-box;
  margin-bottom: 20px;
}

</style>

