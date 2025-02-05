<template>
    <div class="details-container">
      <h1 class="details-title">✨ Découvrez notre produit exclusif !</h1>
  
      <div class="details-content">
        <img class="details-image" :src="require(`@/assets/Boutique/${article.categorie}/${article.image}`)" :alt="article.nom" />
  
        <div class="details-info">
          <h2 class="details-name">{{ article.nom }}</h2>
          <p class="details-category"><strong>Catégorie :</strong> {{ categoriesLabels[article.categorie] }}</p>
          <p class="details-description">{{ article.description }}</p>
          <p class="details-stock"><strong>Stock disponible :</strong> {{ article.stock }}</p>
          <p class="details-price"><strong>Prix :</strong> {{ article.prix }}€</p>
  
          <div v-if="article.couleurs.length">
            <h3>Couleurs disponibles :</h3>
            <div class="color-options">
              <span v-for="couleur in article.couleurs" :key="couleur" class="color-circle" :style="{ backgroundColor: couleur }"></span>
            </div>
          </div>
  
          <div v-if="article.tailles.length">
            <h3>Tailles disponibles :</h3>
            <p class="details-sizes">{{ article.tailles.join(', ') }}</p>
          </div>
  
          <button class="btn-add" @click="ajouterAuPanier(article)">Ajouter au panier 🛒</button>
        </div>
      </div>
  
      <!-- Icône du panier -->
      <div class="cart-icon" @click="goToPanier">
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
      const id = this.$route.params.id;
      return this.goodies.find((item) => item.id === parseInt(id));
    },

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
      this.$router.push({ name: "PanierPage" });
    },
  },
};
</script>

<style scoped>
.details-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.details-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.details-content {
  display: flex;
  gap: 30px;
  align-items: flex-start;
}

.details-image {
  max-width: 400px;
  border-radius: 10px;
  object-fit: cover;
}

.details-info {
  flex: 1;
}

.details-name {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.details-category,
.details-description,
.details-stock,
.details-price {
  margin-bottom: 10px;
}

.color-options {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.color-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #ccc;
}

.details-sizes {
  margin-top: 10px;
}

.btn-add {
  background-color: #1e8449;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.btn-add:hover {
  background-color: #145a32;
}

.cart-icon {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #1e8449;
  color: white;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.cart-count {
  background: white;
  color: #1e8449;
  border-radius: 50%;
  padding: 5px;
  font-size: 1rem;
  margin-left: 5px;
}
</style>