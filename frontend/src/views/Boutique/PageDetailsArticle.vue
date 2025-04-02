<template>
  <div class="details-container">
    <h1 class="details-title">{{ $t('boutiqueTexts.decouvrezProduit') }}</h1>

    <div class="details-content" id="article">
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
        <p class="details-price"><strong>{{ $t('boutiqueTexts.prix') }}</strong> {{ prixActuel }}€</p>

      <!-- Sélection Taille -->
      <div v-if="article.tailles && article.tailles.length">
        <h3>{{ $t('boutiqueTexts.taillesDisponibles') }}</h3>
        <div class="size-options">
          <span
            v-for="taille in article.tailles"
            :key="taille"
            class="size-circle"
            :class="{ selected: taille === tailleSelectionnee }"
            @click="selectTaille(taille)"
          >
            {{ taille }}
          </span>
        </div>
      </div>


        <button class="btn-add" @click="ajouterAuPanier(article)">
          {{ $t('boutiqueTexts.ajouterAuPanier') }}
        </button>
      </div>
    </div>

    <!-- Détails supplémentaires -->
    <div id="details" class="details-section">
      <h2>Détails du Produit</h2>
      <p><strong>Pays de fabrication :</strong> {{ article.pays_fabrication }}</p>
      <p><strong>Composition :</strong> {{ article.composition }}</p>
      <p><strong>Temps de livraison :</strong> {{ article.temps_livraison }}</p>
    </div>


    <!-- Avis Utilisateurs -->
    <div id="avis" class="details-section">
      <h2>Avis des Clients</h2>

      <!-- Affichage des avis existants -->
      <div v-if="article.avis && article.avis.length">
        <div v-for="avis in article.avis" :key="avis.id" class="avis-card">
          <p><strong>{{ avis.utilisateur }}</strong> - 
            <span class="stars">{{ '⭐'.repeat(avis.note) }}</span>
          </p>
          <p>{{ avis.commentaire }}</p>
        </div>
      </div>
      <p v-else>Aucun avis pour cet article.</p>

      <!-- Ajouter un avis -->
      <h3>Ajoutez votre avis :</h3>
      <input type="text" v-model="nouvelAvis.utilisateur" placeholder="Votre nom" required/>
      <select v-model="nouvelAvis.note">
        <option v-for="n in 5" :key="n" :value="n">{{ n }}⭐</option>
      </select>
      <textarea v-model="nouvelAvis.commentaire" placeholder="Votre commentaire" required></textarea>
      <button @click="ajouterAvis">Poster</button>
    </div>

    <!-- Articles similaires -->
    <div id="autres" class="details-section">
      <h2>Articles Similaires</h2>
      <div class="similar-items">
        <div v-for="produit in articlesSimilaires" :key="produit.id" class="similar-item">
          <img :src="require(`@/assets/Boutique/${produit.categorie}/${produit.image}`)" alt="" />
          <p>{{ produit.nom }}</p>
          <p class="similar-price">{{ produit.prix }}€</p>
          <button @click="goToArticle(produit.id)">Voir</button>
        </div>
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
  data() {
    return {
      tailleSelectionnee: null,
      prixActuel: null,
      nouvelAvis: { utilisateur: "", note: 5, commentaire: "" },
    };
  },
  computed: {
    ...mapState("boutique", ["goodies", "panier"]),
    
    article() {
      const id = parseInt(this.$route.params.id, 10);
      return this.goodies.find((item) => item.id === id) || null; 
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

    articlesSimilaires() {
      return this.goodies.filter(
        (item) => item.categorie === this.article.categorie && item.id !== this.article.id
      );
    },
  },
  methods: {
    ...mapActions("boutique", ["ajouterAuPanier"]),

    selectTaille(taille) {
    this.tailleSelectionnee = taille;
    this.updatePrix();
    },

    updatePrix() {
      if (!this.tailleSelectionnee) {
        this.prixActuel = this.article.prix; // Prix de base si aucune taille n'est sélectionnée
        return;
      }

      // Augmentation du prix à partir de XXL (+5€)
      const taillesAvecSupplements = ["XXL", "XXXL"];
      this.prixActuel = this.article.prix + (taillesAvecSupplements.includes(this.tailleSelectionnee) ? 5 : 0);
    },
    ajouterAvis() {
      if (this.nouvelAvis.utilisateur.trim() && this.nouvelAvis.commentaire.trim()) {
        this.article.avis.push({ 
          id: Date.now(),
          utilisateur: this.nouvelAvis.utilisateur, 
          note: this.nouvelAvis.note, 
          commentaire: this.nouvelAvis.commentaire 
        });
        this.nouvelAvis = { utilisateur: "", note: 5, commentaire: "" };
      }
    },
    
    goToPanier() {
      this.$router.push({ name: "PagePanier" });
    },
    
  goToArticle(id) {
    this.$router.push({ name: "PageDetailsArticle", params: { id } });
    window.scrollTo(0, 0); // Remonte en haut de la page
  }, 
    ajouterAuPanier(article) {
    if (!this.tailleSelectionnee) {
      alert("Veuillez sélectionner une taille !");
      return;
    }

    const articleAjoute = {
      ...article,
      tailleSelectionnee: this.tailleSelectionnee,
    };
    this.$store.dispatch("boutique/ajouterAuPanier", articleAjoute);
  },
  },
  created() {
    if (!this.article) {
      alert("Cet article n'existe pas ou n'est plus disponible !");
      this.$router.push({ name: "PageBoutique" });
    }
    this.prixActuel = this.article.prix;
  }
};
</script>

<style scoped >

.details-container {
  max-width: 1400px; /* Largeur maximale */
  margin: 0 auto;
  padding: 40px;
  font-family: 'Arial', sans-serif;
  background: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.details-title {
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 30px;
  color: #1e8449;
}

.details-content {
  display: flex;
  gap: 50px;
  align-items: center;
}

.details-image {
  max-width: 500px;
  height: auto;
  border-radius: 15px;
  object-fit: cover;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.details-info {
  flex: 1;
  font-size: 1.4rem;
}

.details-name {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #1e8449;
}

.details-category,
.details-description,
.details-stock,
.details-price {
  margin-bottom: 15px;
  font-size: 1.3rem;
  color: #444;
}

/* Sélection des tailles sous forme de ronds */
.size-options {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.size-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 2px solid #ccc;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
  background-color: white;
}

.size-circle.selected {
  background-color: #1e8449;
  color: white;
  border-color: #1e8449;
}

.size-circle:hover {
  transform: scale(1.1);
  border-color: #145a32;
}

.btn-add {
  margin-top: 25px; /* espace entre les tailles et le bouton */
  background-color: #1e8449;
  color: white;
  padding: 15px 25px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.5rem;
  transition: background-color 0.3s ease, transform 0.2s ease;
}


.btn-add:hover {
  background-color: #145a32;
  transform: scale(1.1);
}

/* Icône du panier en bas à droite */
.cart-icon-header {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #1e8449;
  color: white;
  border-radius: 50%;
  width: 90px;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
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

/* Navbar flottante visible seulement après un certain scroll */
.floating-navbar {
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  background: white;
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transform: translateY(-100%);
  transition: transform 0.3s ease-in-out;
}

.floating-navbar.visible {
  transform: translateY(0);
}

.details-section {
  padding: 20px;
  border-top: 1px solid #ddd;
  margin-top: 30px;
}

.similar-items {
  display: flex;
  gap: 15px;
  overflow-x: auto; /* Permet un défilement horizontal si besoin */
  padding: 10px 0;
}

.similar-item {
  width: 180px;
  text-align: center;
  background: #fff;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.similar-item img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 5px;
}

.similar-price {
  font-weight: bold;
  color: #1e8449;
}

.similar-item button {
  margin-top: 10px;
  background-color: #1e8449;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.similar-item button:hover {
  background-color: #145a32;
}

</style>