<template>
  <div class="hello">
    <BanniereAccueil></BanniereAccueil>
    <h2>{{ $t('pagePrincipaleTexts.titre') }}</h2>
    <div class="listes-container">
      <div class="filtre">
        <label for="search">{{ $t('pagePrincipaleTexts.recherche') }}</label>
        <input v-model="filtreSearch" type="search" id="search"><br>
        <div class="filtre-check" id="filtre-type">
          <h3>{{ $t('pagePrincipaleTexts.type') }}</h3>
          <input type="radio" id="prestataires" value="prestataires" v-model="filtreType">
          <label for="prestataires"> {{ $t('pagePrincipaleTexts.activites') }}</label><br>
          <input type="radio" id="sponsors" value="sponsors" v-model="filtreType">
          <label for="sponsors">{{ $t('pagePrincipaleTexts.sponsors') }}</label>
        </div>
        <div class="filtre-check" id="filtre-cat" v-if="filtreType === 'prestataires'">
          <h3>{{ $t('pagePrincipaleTexts.categorie') }}</h3>
          <div v-for="cat in uniqueCategories" :key="cat">
            <input @click="handleCatFilter(cat)" type="checkbox" :id="cat" :checked="filtreCategory.includes(cat)">
            <label :for="cat">{{ cat }}</label><br>
          </div>
        </div>
        <br><button @click="resetFilters()">{{ $t('pagePrincipaleTexts.resetFiltres') }}</button>
      </div>
      <div class="listes">
        <div class="liste-prestataires" id="prestataires" v-if="filtreType === 'prestataires'">
          <h2>{{ $t('pagePrincipaleTexts.activitesTitre') }}</h2>
          <div v-for="row in prestaRows" :key="row[0].id" class="prestataires-row">
            <div v-for="prestataire in row" :key="prestataire.id" class="prestataire-card">
                <CartePrestatairePerso
                    :nom="prestataire.nom"
                    :nom_en="prestataire.nom_en"
                    :descriptionAccueil="prestataire.description_accueil"
                    :descriptionAccueil_en="prestataire.description_accueil_en"
                    :image="prestataire.image"
                    :pers-page-route="`/prestataire/${prestataire.id}`"
                ></CartePrestatairePerso>
            </div>
          </div>
        </div>
        <div class="liste-prestataires" id="sponsors" v-if="filtreType === 'sponsors'">
          <h2>{{ $t('pagePrincipaleTexts.sponsorsTitre') }}</h2>
          <div v-for="row in sponsorRows" :key="row[0].id_sponsor" class="prestataires-row">
            <div v-for="sponsor in row" :key="sponsor.id_sponsor" class="prestataire-card">
              <CartePrestatairePerso
                  :nom="sponsor.nom_sponsor"
                  :description-accueil="sponsor.description_accueil"
                  :image="sponsor.image"
                  :pers-page-route="`/sponsor/${sponsor.id}`">
              </CartePrestatairePerso>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="duck-section" v-if="utilisateur.estConnecte">
      <img :src="require('@/assets/parade_canards.jpg')" alt="Défilé des Canards" class="duck-image">
      <div class="duck-text" >
        <h3>{{ $t('pagePrincipaleTexts.participerDefile') }}</h3>
        <p>
          {{ $t('pagePrincipaleTexts.texteDefile') }}
          <router-link to="/inscription-canard" class="duck-link">{{ $t('pagePrincipaleTexts.inscriptionCanardLink') }}</router-link>
        </p>
      </div>
    </div>
    <ReservationTable v-if="utilisateur.estConnecte"></ReservationTable>
    <AchatBillet></AchatBillet>
    <BoutiqueGoodies></BoutiqueGoodies>
    <page-associations></page-associations>
    <page-classement-activites></page-classement-activites>
    <TotalDons></TotalDons>
    <br>
  </div>
</template>



<script>
import BanniereAccueil from "@/components/BanniereAccueil.vue";
import CartePrestatairePerso from "@/components/CartePrestatairePerso.vue";
import { mapState, mapActions } from "vuex";
import TotalDons from "@/components/totalDons.vue";
import ReservationTable from "@/components/ReservationTable.vue";
import AchatBillet from "@/components/AchatBillet.vue";
import BoutiqueGoodies from "@/components/BoutiqueGoodies.vue";
import AssociationsPresentes from "@/components/AssociationsPresentes.vue";
import ClassementActivites from "@/components/ClassementActivites.vue";

export default {
  name: "PagePrincipale",
  data() {
    return {
      prestatairesRows: [],
      filtreSearch: "",
      filtreCategory: [],
      filtreType: "prestataires",
    };
  },
  computed: {
    ...mapState('prestataire', ['prestataires']),
    ...mapState('sponsors', ['sponsors']),
    ...mapState('utilisateurs', ['utilisateur']),
    filteredPrestataires() {
      return this.getFilteredPrestataires(this.prestataires);
    },
    prestaRows() {
      const rows = [];
      for (let i = 0; i < this.filteredPrestataires.length; i += 4) {
        rows.push(this.filteredPrestataires.slice(i, i + 4));
      }
      return rows;
    },
    filteredSponsors() {
      return this.getFilteredSponsors(this.sponsors);
    },
    sponsorRows() {
      const rows = [];
      for (let i = 0; i < this.filteredSponsors.length; i += 4) {
        rows.push(this.filteredSponsors.slice(i, i + 4));
      }
      return rows;
    },
    uniqueCategories() {
      const categories = this.prestataires.map(prestataire => prestataire.relationCategorie.nom);
      return [...new Set(categories)];

    },
  },
  methods: {
    ...mapActions('prestataire', ['getAllPrestataires']),
    ...mapActions('sponsors', ['getAllSponsors']),
    handleCatFilter(cat) {
      if (this.filtreCategory.includes(cat)) {
        this.filtreCategory.splice(this.filtreCategory.indexOf(cat), 1);
      } else {
        this.filtreCategory.push(cat);
      }
    },
    getFilteredPrestataires(prestataires) {
      if (this.filtreCategory.length === 0) {
        return [];
      }

      // Filtrer d'abord par catégorie
      let catFilteredPrestataires = prestataires.filter(prest =>
          this.filtreCategory.includes(prest.relationCategorie.nom)
      );

      catFilteredPrestataires = catFilteredPrestataires.filter(prest => {
        if (prest.accepted === true) {
          return prest;
        }
      })

      // Ensuite, appliquer le filtre de recherche
      return catFilteredPrestataires.filter(prest =>
          prest.nom.toLowerCase().includes(this.filtreSearch.toLowerCase())
      );
    },
    getFilteredSponsors(sponsors) {
      return sponsors.filter(s =>
          s.nom_sponsor.toLowerCase().includes(this.filtreSearch.toLowerCase())
      );
    },
    resetFilters() {
      this.filtreType = 'prestataires';
      this.filtreSearch = '';
      this.filtreCategory = [...this.uniqueCategories];
    },
  },
  async mounted() {
    await this.getAllPrestataires();
    await this.getAllSponsors();
    this.resetFilters();
  },
  components: {
    PageClassementActivites: ClassementActivites,
    PageAssociations: AssociationsPresentes,
    TotalDons,
    BanniereAccueil,
    CartePrestatairePerso,
    ReservationTable,
    AchatBillet,
    BoutiqueGoodies,
  },
};
</script>


<style scoped>
/* Conteneur principal */
.listes-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 90%;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Titre principal avec animation */
h2 {
  font-size: 2.5rem;
  text-align: center;
  color: #333;
  font-weight: bold;
  margin-bottom: 20px;
  animation: fadeSlideIn 1s ease-in-out;
}

/* Animation pour le titre */
@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(-15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Zone du filtre */
.filtre {
  flex: 1;
  max-width: 25%;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Titre des sections dans le filtre */
.filtre h3 {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 10px;
  border-bottom: 2px solid #ddd;
  padding-bottom: 5px;
}

/* Champs de recherche */
.filtre label {
  font-size: 1rem;
  color: #555;
}

.filtre input[type="search"] {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Boutons radio et checkboxes */
.filtre-check {
  margin-top: 15px;
}

.filtre-check input {
  margin-right: 10px;
}

.filtre-check label {
  font-size: 1rem;
  color: #444;
}

.filtre button {
  margin-top: 20px;
  width: 100%;
  padding: 10px 15px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filtre button:hover {
  background-color: #1e8449;
}

/* Zone des listes */
.listes {
  flex: 3; /* Plus grand pour équilibrer avec le filtre */
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Rangées de prestataires */
.prestataires-row {
  display: flex;
  justify-content: space-between;
  gap: 20px; /* Espacement entre les cartes */
  margin-bottom: 20px;
}

/* Cartes des prestataires */
.prestataire-card {
  flex: 1 1 calc(25% - 20px); /* 4 cartes par ligne */
  max-width: calc(25% - 20px); /* Limite de largeur */
  background-color: #ffffff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* Effet au survol */
.prestataire-card:hover {
  transform: scale(1.05); /* Zoom léger */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

/* Images des prestataires */
.prestataire-card img {
  width: 100%;
  height: auto;
  border-radius: 6px;
  margin-bottom: 10px;
}

/* Titre dans les cartes */
.prestataire-card h3 {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.prestataire-card p {
  font-size: 0.9rem;
  color: #555;
}

/* Responsivité */
@media (max-width: 1024px) {
  .prestataire-card {
    flex: 1 1 calc(50% - 20px); /* Passe à 2 cartes par ligne */
  }
}

@media (max-width: 768px) {
  .listes-container {
    flex-direction: column; /* Pile le filtre et les listes */
    gap: 20px;
  }

  .filtre {
    max-width: 100%;
  }

  .prestataire-card {
    flex: 1 1 100%; /* Une carte par ligne sur mobile */
    max-width: 100%;
  }
}

/* Conteneur principal pour la section */
/* Ajout d'un espace au-dessus de la section des canards */
.duck-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  margin: 60px auto 40px; /* Augmenter la marge supérieure pour espacement */
  padding: 20px;
  max-width: 1200px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  opacity: 0; /* Invisible au départ */
  animation: fadeIn 2s ease-in-out forwards; /* Animation de fondu plus lente */
}

/* Image des canards */
.duck-image {
  flex: 1; /* Laisse l'image prendre une proportion flexible */
  max-width: 300px; /* Taille maximale de l'image */
  height: auto; /* Garde les proportions */
  border-radius: 10px; /* Coins arrondis */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); /* Ombre subtile */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Animation sur le hover */
}

.duck-image:hover {
  transform: scale(1.05); /* Zoom léger au survol */
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2); /* Ombre accentuée */
}

/* Texte associé */
.duck-text {
  flex: 2; /* Laisse le texte occuper plus de place que l'image */
  color: #2c3e50; /* Couleur de texte élégante */
  line-height: 1.6; /* Espacement pour une meilleure lisibilité */
  padding: 10px;
}

/* Style du titre */
.duck-text h3 {
  font-size: 2rem; /* Augmenter légèrement la taille pour plus d'impact */
  font-weight: 800; /* Plus imposant avec un poids de police élevé */
  color: #2c3e50; /* Une couleur moderne, sombre et élégante */
  text-transform: uppercase; /* Pour un effet plus imposant */
  letter-spacing: 2px; /* Espacement des lettres pour un style raffiné */
}


/* Texte descriptif */
.duck-text p {
  font-size: 1rem;
  color: #4f4f4f; /* Couleur de texte contrastée */
  margin-bottom: 15px;
  line-height: 1.8; /* Espacement accru */
}

/* Lien d'inscription */
.duck-link {
  display: inline-block;
  margin-top: 10px;
  font-size: 1.1rem; /* Taille légèrement agrandie */
  color: #27ae60; /* Couleur vive pour le lien */
  font-weight: bold; /* Texte en gras */
  text-decoration: none;
  background-color: #ecf9f0; /* Fond doux */
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

/* Effet au survol pour le lien */
.duck-link:hover {
  background-color: #27ae60;
  color: #fff; /* Contraste inversé */
  transform: translateY(-3px); /* Légère élévation */
}

/* Animation de fondu */
@keyframes fadeIn {
  0% {
    opacity: 0; /* Début invisible */
  }
  100% {
    opacity: 1; /* Fin complètement visible */
  }
}


</style>
