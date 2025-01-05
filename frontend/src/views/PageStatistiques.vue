<template>
    <div class="statistiques-container">
      <h1 class="statistiques-title">Statistiques de l'Évènement</h1>
  
      <!-- Section Revenus générés -->
      <section class="stat-section">
        <h2>Revenus générés</h2>
        <div class="stat-content">
          <img src="@/assets/statistiques/revenus.png" alt="Revenus générés" class="stat-image" />
          <div class="stat-value">
            <p><strong>Billetterie :</strong> {{ revenusBilletterie }} €</p>
            <p><strong>Ventes (menu) :</strong> {{ revenusVentes }} €</p>
            <p><strong>Total :</strong> {{ revenusTotal }} €</p>
          </div>
        </div>
      </section>
  
      <!-- Section Classement des activités -->
      <section class="stat-section">
        <h2>Classement des Activités (Popularité)</h2>
        <div class="stat-content">
          <img src="@/assets/statistiques/activites.png" alt="Activités populaires" class="stat-image" />
          <ol>
            <li v-for="activite in classementActivites" :key="activite.id">
              {{ activite.nom }} - {{ activite.visiteurs }} visiteurs
            </li>
          </ol>
        </div>
      </section>
  
      <!-- Section Nombre total de visiteurs -->
      <section class="stat-section">
        <h2>Nombre Total de Visiteurs</h2>
        <div class="stat-content">
          <img src="@/assets/statistiques/visiteurs.png" alt="Nombre de visiteurs" class="stat-image" />
          <div class="stat-value">
            <p><strong>{{ totalVisiteurs }}</strong> visiteurs</p>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  
  <script>
  import { billetterie, prestataires } from "@/datasource/data";
  
  export default {
    name: "PageStatistiques",
    data() {
      return {
        revenusBilletterie: 0,
        revenusVentes: 0,
        classementActivites: [],
        totalVisiteurs: 0,
      };
    },
    created() {
      this.calculerRevenusBilletterie();
      this.calculerRevenusVentes();
      this.calculerClassementActivites();
      this.calculerTotalVisiteurs();
    },
    computed: {
      revenusTotal() {
        return this.revenusBilletterie + this.revenusVentes;
      },
    },
    methods: {
      calculerRevenusBilletterie() {
        this.revenusBilletterie = billetterie.reduce(
          (total, billet) => total + billet.prix,
          0
        );
      },
      calculerRevenusVentes() {
        const ventesSimulees = [
          { id: 1, montant: 250 },
          { id: 2, montant: 180 },
          { id: 3, montant: 300 },
        ];
        this.revenusVentes = ventesSimulees.reduce(
          (total, vente) => total + vente.montant,
          0
        );
      },
      calculerClassementActivites() {
        this.classementActivites = prestataires
          .map((prestataire) => ({
            id: prestataire.id,
            nom: prestataire.nom,
            visiteurs: Math.floor(Math.random() * 500) + 100,
          }))
          .sort((a, b) => b.visiteurs - a.visiteurs);
      },
      calculerTotalVisiteurs() {
        this.totalVisiteurs = this.classementActivites.reduce(
          (total, activite) => total + activite.visiteurs,
          0
        );
      },
    },
  };
  </script>
  
  <style scoped>
  .statistiques-container {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
  }
  
  .statistiques-title {
    text-align: center;
    font-size: 2.5rem;
    font-weight: bold;
    color: #34495e;
    margin-bottom: 20px;
  }
  
  .stat-section {
    margin-bottom: 30px;
    padding: 20px;
    border: 1px solid #ecf0f1;
    border-radius: 10px;
    background-color: #f9f9f9;
  }
  
  .stat-section h2 {
    font-size: 1.8rem;
    color: #27ae60;
    margin-bottom: 15px;
    border-bottom: 2px solid #27ae60;
    padding-bottom: 5px;
  }
  
  .stat-value {
    font-size: 1.2rem;
    color: #2c3e50;
  }
  
  .stat-value p {
    margin: 5px 0;
  }
  
  ol {
    padding-left: 20px;
  }
  
  li {
    font-size: 1.1rem;
    color: #34495e;
    margin-bottom: 5px;
  }

  .statistiques-container {
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.statistiques-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: #34495e;
  margin-bottom: 20px;
}

.stat-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ecf0f1;
  border-radius: 10px;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  gap: 20px;
}

.stat-section h2 {
  font-size: 1.8rem;
  color: #27ae60;
  margin-bottom: 15px;
  border-bottom: 2px solid #27ae60;
  padding-bottom: 5px;
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.stat-image {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.stat-value {
  font-size: 1.2rem;
  color: #2c3e50;
}

.stat-value p {
  margin: 5px 0;
}

ol {
  padding-left: 20px;
}

li {
  font-size: 1.1rem;
  color: #34495e;
  margin-bottom: 5px;
}
  </style>
  