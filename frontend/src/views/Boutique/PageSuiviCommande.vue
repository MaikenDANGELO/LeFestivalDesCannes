<template>
    <div class="suivi-container">
      <h1 class="suivi-title">📦 Suivi de votre commande</h1>
  
      <div class="progress-container">
        <div class="progress-bar">
          <div class="progress" :style="{ width: progressWidth }"></div>
        </div>
  
        <div class="etapes">
          <div v-for="(etape, index) in etapes" :key="index" class="etape">
            <div 
              class="etape-icon" 
              :class="{ active: index <= etapeActuelle }"
            >
              {{ etape.emoji }}
            </div>
            <p>{{ etape.nom }}</p>
          </div>
        </div>
      </div>
  
      <div class="status-message">
        <h2>{{ etapes[etapeActuelle].message }}</h2>
      </div>
  
      <button class="btn-retour" @click="retourAccueil">🏠 Retour à l'accueil</button> 
    </div>
  </template>

<script>
export default {
  name: "PageSuiviCommande",
  data() {
    return {
      etapeActuelle: 0, // Étape actuelle de la commande
      etapes: [
        { nom: "Commande confirmée", emoji: "✅", message: "Votre commande a été confirmée." },
        { nom: "Préparation", emoji: "👨‍🍳", message: "Votre commande est en cours de préparation." },
        { nom: "Expédition", emoji: "🚚", message: "Votre colis a été expédié." },
        { nom: "En livraison", emoji: "📍", message: "Votre commande est en route vers chez vous." },
        { nom: "Livrée", emoji: "🎁", message: "Votre commande a été livrée ! 🎉" }
      ],
    };
  },//ça aussi je vais mettre dans datasource après.
  computed: {
    progressWidth() {
      return `${(this.etapeActuelle / (this.etapes.length - 1)) * 100}%`;
    }
  },
  mounted() {
    this.simulerSuiviCommande();
  },
  methods: {
    simulerSuiviCommande() {
      let interval = setInterval(() => {
        if (this.etapeActuelle < this.etapes.length - 1) {
          this.etapeActuelle++;
        } else {
          clearInterval(interval);
        }
      }, 5000); // Change d'étape toutes les 5 secondes
    },
    retourAccueil() {
      this.$router.push({ name: "home" });//ne marche pas pour le moment. 
    }
  }
};
</script>

<style scoped>
.suivi-container {
  max-width: 800px;
  margin: auto;
  text-align: center;
  padding: 20px;
}

.suivi-title {
  font-size: 2rem;
  color: #1e8449;
  margin-bottom: 30px;
}

.progress-container {
  margin: 20px 0;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background: #ddd;
  border-radius: 5px;
  position: relative;
}

.progress {
  height: 100%;
  background: #1e8449;
  border-radius: 5px;
  transition: width 1s ease-in-out;
}

.etapes {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.etape {
  text-align: center;
  flex: 1;
}

.etape-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  margin: auto;
  transition: background 0.5s ease;
}

.etape-icon.active {
  background: #1e8449;
  color: white;
}

.status-message {
  margin-top: 30px;
  font-size: 1.5rem;
  color: #1e8449;
  font-weight: bold;
}

.btn-retour {
  background: #1e8449;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 20px;
}

.btn-retour:hover {
  background: #145a32;
}
</style>