<template>
  <div class="boutique-container">
    <h1 class="boutique-title">🎁 Boutique Goodies 🎥</h1>
    <p class="boutique-subtitle">Découvrez les articles exclusifs du Festival de Cannes !</p>

    <div v-for="(goodies, categorie) in groupedGoodies" :key="categorie" class="boutique-section">
      <h2 class="boutique-section-title">{{ categoriesLabels[categorie] }}</h2>
      <div class="goodies-list">
        <div class="goodie-item" v-for="goodie in goodies" :key="goodie.id">
          <router-link :to="'/boutique/article/' + goodie.id">
            <img class="goodie-image" :src="require(`@/assets/Boutique/${goodie.categorie}/${goodie.image}`)" :alt="goodie.nom" />
          </router-link>
          <h3 class="goodie-name">{{ goodie.nom }}</h3>
          <p class="goodie-price">{{ goodie.prix }}€</p>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import { mapActions, mapState } from "vuex";
  
  export default {
    name: "PageBoutique",
    computed: {
      ...mapState("boutique", ["goodies", "panier"]),
  
      groupedGoodies() {
        if (!this.goodies || this.goodies.length === 0) return {};
        return this.goodies.reduce((acc, goodie) => {
          if (!acc[goodie.categorie]) acc[goodie.categorie] = [];
          acc[goodie.categorie].push(goodie);
          return acc;
        }, {});
      },
  
      totalPanier() {
        return this.panier.reduce((total, item) => total + item.prix * item.quantite, 0);
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
      ...mapActions("boutique", ["getAllGoodies", "ajouterAuPanier", "retirerDuPanier", "validerCommande"]),
    },
  
    created() {
      this.getAllGoodies();
    },
  };
  </script>
  
  <style scoped>
  .boutique-container {
    max-width: 1300px;
    margin: 30px auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
  }
  
  .boutique-title {
    text-align: center;
    font-size: 3.5rem;
    font-weight: bold;
    color: #1e8449;
    margin-bottom: 20px;
  }
  
  .boutique-subtitle {
    text-align: center;
    font-size: 1.5rem;
    color: #555;
    margin-bottom: 40px;
  }
  
  .boutique-section {
    margin-bottom: 60px;
  }
  
  .boutique-section-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #1e8449;
    margin-bottom: 25px;
    text-align: center;
    border-bottom: 3px solid #1e8449;
    padding-bottom: 15px;
  }
  
  .goodies-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
  }
  
  .goodie-item {
    background: white;
    border-radius: 15px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 350px;
    text-align: center;
    transition: transform 0.3s ease-in-out;
  }
  
  .goodie-item:hover {
    transform: scale(1.05);
  }
  
  .goodie-image {
    width: 100%;
    max-width: 320px;
    height: auto;
    max-height: 300px;
    object-fit: contain;
    border-radius: 10px;
  }
  
  .goodie-name {
    font-size: 1.7em;
    color: #1e8449;
    margin: 15px 0;
  }
  
  .goodie-price {
    font-size: 1.5em;
    font-weight: bold;
    color: #145a32;
  }
  </style>
  