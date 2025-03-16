<template>
  <div class="details-container">
    <h1 class="details-title">{{ $t('boutiqueTexts.decouvrezProduit') }}</h1>

    <div class="details-content">
      <img
          class="details-image"
          :src="require(`@/assets/Boutique/${article.categorie}/${article.image}`)"
          :alt="article.nom"
      />

      <div class="details-info">
        <h2 class="details-name">{{ article.nom }}</h2>
        <p class="details-category">
          <strong>{{ $t('boutiqueTexts.categorie') }}</strong> {{ categoriesLabels[article.categorie] }}
        </p>
        <p class="details-description">{{ article.description }}</p>
        <p class="details-stock">
          <strong>{{ $t('boutiqueTexts.stockDisponible') }}</strong> {{ article.stock }}
        </p>
        <p class="details-price"><strong>{{ $t('boutiqueTexts.prix') }}</strong> {{ article.prix }}€</p>

        <div v-if="article.couleurs && article.couleurs.length">
          <h3>{{ $t('boutiqueTexts.couleursDisponibles') }}</h3>
          <div class="color-options">
            <span
                v-for="couleur in article.couleurs"
                :key="couleur"
                class="color-circle"
                :style="{ backgroundColor: couleur }"
            ></span>
          </div>
        </div>

        <div v-if="article.tailles && article.tailles.length">
          <h3>{{ $t('boutiqueTexts.taillesDisponibles') }}</h3>
          <p class="details-sizes">{{ article.tailles.join(", ") }}</p>
        </div>

        <button class="btn-add" @click="ajouterAuPanier(article)">{{ $t('boutiqueTexts.ajouterAuPanier') }}</button>
      </div>
    </div>

    <div class="cart-icon-header" @click="goToPanier">
      🛒 <span class="cart-count">{{ panierCount }}</span>
    </div>
  </div>
</template>


<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "PageDetailsArticle",
  computed: {
    ...mapState("boutique", ["goodies", "panier"]),

    article() {
      const id = parseInt(this.$route.params.id, 10);
      return this.goodies.find((item) => item.id === id) || null; 
    },

    // Calcul du nombre total d'articles dans le panier
    panierCount() {
      return this.panier.reduce((total, item) => total + item.quantite, 0);
    },

    categoriesLabels() {
      return {
        accessoire_et_lifestyle: "👜 Accessoires & Lifestyle",
        aliments: "🍫 Aliments & Confiseries",
        objet_cinema_tech: "🎬 Objets Cinéma & Tech",
        papeterie_collection: "📖 Papeterie & Collection",
        premium: "🏆 Éditions Limitées & Premium",
        textiles_et_modes: "👕 Textiles & Mode",
      };
    },
  },
  methods: {
    ...mapActions("boutique", ["ajouterAuPanier"]),

    goToPanier() {
      this.$router.push({ name: "PagePanier" });
    },
  },

  created() {
    if (!this.article) {
      alert("Cet article n'existe pas ou n'est plus disponible !");
      this.$router.push({ name: "PageBoutique" }); // Redirige vers la boutique
    }
  },
};
</script>

<style scoped>
.details-container {
  max-width: 1400px; /* Augmente la largeur maximale */
  margin: 0 auto;
  padding: 40px; /* Plus d'espace autour */
  font-family: 'Arial', sans-serif;
  background: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.details-title {
  text-align: center;
  font-size: 3rem; /* Augmente la taille du titre */
  font-weight: bold;
  margin-bottom: 30px;
  color: #1e8449; /* Vert du thème */
}

.details-content {
  display: flex;
  gap: 50px; /* Plus d’espace entre l’image et les infos */
  align-items: center;
}

.details-image {
  max-width: 500px; /* Image plus grande */
  height: auto; /* Ajustement automatique */
  border-radius: 15px;
  object-fit: cover;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.details-info {
  flex: 1;
  font-size: 1.4rem; /* Texte plus grand */
}

.details-name {
  font-size: 2.5rem; /* Titre du produit plus grand */
  font-weight: bold;
  margin-bottom: 15px;
  color: #1e8449;
}

.details-category,
.details-description,
.details-stock,
.details-price {
  margin-bottom: 15px;
  font-size: 1.3rem; /* Agrandir le texte des infos */
  color: #444;
}

.color-options {
  display: flex;
  gap: 12px;
  margin-top: 15px;
}

.color-circle {
  width: 30px; /* Rendre les pastilles de couleur plus visibles */
  height: 30px;
  border-radius: 50%;
  border: 3px solid #ccc;
}

.details-sizes {
  margin-top: 15px;
  font-size: 1.3rem; /* Texte des tailles plus grand */
}

.btn-add {
  background-color: #1e8449;
  color: white;
  border: none;
  padding: 15px 25px; /* Agrandir le bouton */
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.5rem; /* Texte plus grand */
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.btn-add:hover {
  background-color: #145a32;
  transform: scale(1.1);
}

/* Icône du panier en bas à droite */
.cart-icon-header {
  position: fixed;
  bottom: 30px; /* Plus d’espace depuis le bas */
  right: 30px; /* Plus d’espace depuis la droite */
  background-color: #1e8449;
  color: white;
  border-radius: 50%;
  width: 90px; /* Icône plus grande */
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem; /* Taille de l'icône plus grande */
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, background-color 0.3s ease;
  z-index: 1000;
}

.cart-icon-header:hover {
  background-color: #145a32;
  transform: scale(1.2);
}

.cart-count {
  background: white;
  color: #1e8449;
  border-radius: 50%;
  padding: 10px 12px;
  font-size: 1.2rem;
  font-weight: bold;
  margin-left: 10px;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.2);
}
</style>