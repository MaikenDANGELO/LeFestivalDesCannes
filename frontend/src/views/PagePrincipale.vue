<template>
  <div class="hello">
    <BanniereAccueil></BanniereAccueil>
    <h2>Toutes nos prestataires</h2>
    <div class="listes-container">
      <div class="filtre">
        <label for="search">Rechercher : </label>
        <input v-model="filtreSearch" type="search" id="search"><br>
        <div class="filtre-check" id="filtre-type">
          <h3>Type :</h3>
          <input type="radio" id="prestataires" value="prestataires" v-model="filtreType">
          <label for="prestataires"> Activités</label><br>
          <input type="radio" id="sponsors" value="sponsors" v-model="filtreType">
          <label for="sponsors"> Sponsors</label>
        </div>
        <div class="filtre-check" id="filtre-cat" v-if="filtreType === 'prestataires'">
          <h3>Catégorie : </h3>
          <input @click="handleCatFilter('Activité')" type="checkbox" id="activite" checked>
          <label for="activite"> Attraction et atelier</label><br>
          <input @click="handleCatFilter('Mascotte')" type="checkbox" id="mascotte" checked>
          <label for="mascotte"> Mascotte</label><br>
          <input @click="handleCatFilter('Gastronomie')" type="checkbox" id="gastronomie" checked>
          <label for="gastronomie"> Gastronomie</label><br>
          <input @click="handleCatFilter('Événement')" type="checkbox" id="evenement" checked>
          <label for="evenement"> Événement</label>
        </div>
        <br><button @click="resetFilters()">Réinitialiser filtres</button>
      </div>
      <div class="listes">
        <div class="liste-prestataires" id="prestataires" v-if="filtreType === 'prestataires'">
          <h2>Activités</h2>
          <div class="prestataires-row" v-for="row in getPrestaRows()" :key="row[0].id">
            <div v-for="prestataire in row" :key="prestataire.id" class="prestataire-card">
              <CartePrestatairePerso :nom="prestataire.nom" :descriptionAccueil="prestataire.description_accueil"
                :image="prestataire.image" :pers-page-route="`/prestataire/${prestataire.id}`"></CartePrestatairePerso>
            </div>
          </div>
        </div>
        <div class="liste-prestataires" id="sponsors" v-if="filtreType === 'sponsors'">
          <h2>Sponsors</h2>
          <div class="prestataires-row" v-for="row in getSponsorsRows()" :key="row[0].id_sponsor">
            <div v-for="sponsor in row" :key="sponsor.id_sponsor" class="prestataire-card">
              <CartePrestatairePerso :nom="sponsor.nom_sponsor" :description-accueil="sponsor.description_accueil"
                :image="sponsor.image" :pers-page-route="`/sponsor/${sponsor.id_sponsor}`"></CartePrestatairePerso>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="duck-section">
      <img :src="require('@/assets/parade_canards.jpg')" alt="Défilé des Canards" class="duck-image">
      <div class="duck-text">
        <h3>Participez au Défilé des Canards !</h3>
        <p>
          Depuis les débuts du Festival des Canes, le Défilé des Canards a su se faire une place de choix 
          parmi les moments les plus attendus. Chaque année, des passionnés inscrivent leurs canards, fièrement présentés avec leur nom, 
          leur espèce et leur région d’origine. Donnez à votre canard l’occasion de défiler sous les projecteurs 
          et de faire sensation. C’est l’occasion parfaite de mêler originalité, bonne humeur et un peu de compétition amicale.Alors, prêt à faire briller vos plumes ?
          <router-link to="/inscription-canard" class="duck-link"> -> Inscrire un canard</router-link>
        </p>
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
import { filter } from "core-js/internals/array-iteration";

export default {
  name: "PagePrincipale",
  data() {
    return {
      prestatairesRows: [],
      filtreSearch: "",
      filtreCategory: ['Activité', 'Mascotte', 'Gastronomie', 'Événement'],
      filtreType: "prestataires",
    };
  },
  computed: {
    ...mapState('prestataire', ['prestataires']), // on récupère prestataires depuis le store
    ...mapState('sponsors', ['sponsors']),
  },
  methods: {
    filter,
    ...mapActions('prestataire', ['getAllPrestataires']), // on récupère la méthode de récupération des prestataires du store
    ...mapActions('sponsors', ['getAllSponsors']),
    getPrestaRows() {
      this.getAllPrestataires(); // charge les prestataires depuis les données
      let prestataires = this.getFilteredPrestataires(this.prestataires);
      let rows = [];
      for (let i = 0; i < prestataires.length; i += 4) { // Ajusté pour 4 blocs par ligne
        rows.push(prestataires.slice(i, i + 4));
      }
      return rows;
    },
    getSponsorsRows() {
      this.getAllSponsors(); // charge les prestataires depuis les données
      let sponsors = this.getFilteredSponsors(this.sponsors);
      let rows = [];
      for (let i = 0; i < sponsors.length; i += 4) { // Ajusté pour 4 blocs par ligne
        rows.push(sponsors.slice(i, i + 4));
      }
      return rows;
    },
    // Gère l'envoi de commentaire depuis une page prestataire
    handleCommentSent(data) {
      return data;
    },
    handleCatFilter(cat) {
      if (this.filtreCategory.includes(cat)) this.filtreCategory.splice(this.filtreCategory.findIndex((f) => f == cat), 1);
      else this.filtreCategory.push(cat);
    },
    getFilteredPrestataires(prestataires) {
      let catFilteredPrestataires = [];
      for (const cat of this.filtreCategory) {
        for (const prest of prestataires) {
          if (!catFilteredPrestataires.includes(prest) && prest.categorie === cat)
            catFilteredPrestataires.push(prest)
        }
      }
      return prestataires.filter((p) => p.nom.toLowerCase().includes(this.filtreSearch.toLowerCase()) && catFilteredPrestataires.includes(p));
    },
    getFilteredSponsors(sponsors) {
      return sponsors.filter(s => s.nom_sponsor.toLowerCase().includes(this.filtreSearch.toLowerCase()));
    },
    resetFilters(){
      this.filtreCategory = ['Activité', 'Mascotte', 'Gastronomie', 'Événement'];
      this.filtreType = 'prestataires';
      this.filtreSearch = '';
      document.getElementById("activite").checked = true;
      document.getElementById("mascotte").checked = true;
      document.getElementById("gastronomie").checked = true;
      document.getElementById("evenement").checked = true;
    }
  },
  components: {
    TotalDons,
    BanniereAccueil,
    CartePrestatairePerso,
  },
};
</script>


<style scoped>
.listes-container{
  display: flex;
  flex-direction: row;
  margin: 1%
}
.listes{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-left: auto;
  margin-right: auto;
}
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
  width: calc(25% - 20px);
  /* Ajusté pour quatre blocs par ligne avec espace */
  box-sizing: border-box;
  margin-bottom: 20px;
}

.duck-section {
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 20px auto;
  max-width: 900px;
}

.duck-image {
  flex-shrink: 0;
  width: 180px; /* Taille idéale pour plus d'impact */
  height: auto; 
  max-width: none;
}

.duck-text {
  flex: 1;
  max-width: 600px; /* Limite maximale pour équilibrer texte et image */
}


.duck-text h3 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
  color: #2c3e50;
}

.duck-text p {
  margin: 10px 0;
  font-size: 1rem;
  line-height: 1.4; 
  color: #4f4f4f;
}


.duck-link {
  display: inline-block;
  margin-top: 10px;
  font-size: 1rem;
  color: #27ae60;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.duck-link:hover {
  background-color: #286d46;
  color: #fff;
}


</style>
