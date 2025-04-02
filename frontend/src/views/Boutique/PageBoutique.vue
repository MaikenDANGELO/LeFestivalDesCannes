<template>
  <div>
    <div class="disabledShopView" v-if="!shopStatus && utilisateur.role!='admin'">
      <h1>{{ $t('boutiqueTexts.boutiqueFermee') }}</h1>
      <h2>{{ $t('boutiqueTexts.revenezPlusTard') }}</h2>
    </div>
    <div class="boutique-container">
      <div class="adminToggle" v-if="(utilisateur.role=='prestataire'&&utilisateur.id_prestataire==4)||(utilisateur.role=='admin')">
        <button @click="ToggleBoutique">{{ $t('boutiqueTexts.toggleBoutique') }}</button>
        <p>{{ $t('boutiqueTexts.status') }}: {{ shopStatus ? $t('boutiqueTexts.activee') : $t('boutiqueTexts.desactivee') }}</p>
      </div>
      <div class="boutiqueChiffreAffaire" v-if="(utilisateur.role=='prestataire'&&utilisateur.id_prestataire==4)||(utilisateur.role=='admin')">
        <p>Chiffre d'affaire: {{ chiffreDaffaire }}€</p>
      </div>
      <h1 class="boutique-title">{{ $t('boutiqueTexts.titre') }}</h1>
      <p class="boutique-subtitle">{{ $t('boutiqueTexts.sousTitre') }}</p>

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
  </div>
</template>


<script>
  import { mapActions, mapState } from "vuex";
  import prestataireServices from "@/services/prestataires.service"
  
  export default {
    name: "PageBoutique",
    data: () => ({
      shopStatus: true,
      chiffreDaffaire: 0
    }),
    computed: {
      ...mapState("boutique", ["goodies", "panier"]),
      ...mapState("utilisateurs", ["utilisateur"]),
  
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
      async getShopStatusFromId(){
        let res = await prestataireServices.getShopStatusFromId(9);
        this.shopStatus = res.data;
        return res.data;
      },
      async ToggleBoutique(){
        let res = await prestataireServices.changeShopStatusFromId(9);
        this.shopStatus = res.data;
        await this.getShopStatusFromId(1)
        return res.data;
      },
      async getChiffreDAffaire(){
        let res = await prestataireServices.getBoutiqueChiffreDaffaire();
        return res.data
      }
    },
  
    created() {
      this.getAllGoodies();
    },
    async mounted(){
      await this.getShopStatusFromId();
      this.chiffreDaffaire = await this.getChiffreDAffaire();
    }
  };
  </script>
  
  <style scoped>
.disabledShopView{
  text-align: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.8);
  color: white;
  position: fixed;
  bottom: 0px;
}

.disabledShopView h1{
  margin-bottom: auto;
  justify-self: center;
  align-self: center;
  margin-top: 200px;
  font-size: 58px;
}

  .boutique-container {
    max-width: 1200px;
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
  