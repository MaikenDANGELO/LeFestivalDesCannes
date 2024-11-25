<template>
    <div class="form-container">
      <form @submit.prevent="submitForm">
        <div class="form-title">
          <h2>Inscription de votre Canard</h2>
          <img src="@/assets/canard_ticket.svg" alt="Canard" class="duck-icon" />

        </div>
  
        <!-- Formulaire d'inscription -->
        <div class="form-group">
          <label for="proprietaire">Nom du propriétaire :</label>
          <input
            v-model="form.proprietaire"
            type="text"
            id="proprietaire"
            placeholder="Votre nom complet"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="nomCanard">Nom du canard :</label>
          <input
            v-model="form.nom"
            type="text"
            id="nomCanard"
            placeholder="Nom du canard"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="espece">Espèce du canard :</label>
          <input
            v-model="form.espece"
            type="text"
            id="espece"
            placeholder="Ex : Colvert, Mandarin..."
            required
          />
        </div>
  
        <div class="form-group">
          <label for="region">Région d'origine :</label>
          <input
            v-model="form.region"
            type="text"
            id="region"
            placeholder="Ex : Bretagne, Provence..."
            required
          />
        </div>
  
        <div class="form-group">
          <label for="numero">Numéro attribué :</label>
          <input
            type="text"
            id="numero"
            :value="numero"
            readonly
          />
        </div>
  
        <div class="form-group">
          <label for="heure">Heure du défilé :</label>
          <input
            type="text"
            id="heure"
            :value="heureDefile"
            readonly
          />
        </div>
  
        <button type="submit" class="submit-button">Enregistrer le canard</button>
      </form>
  
      <!-- Ticket affiché après inscription -->
      <div v-if="showTicket" class="ticket">
        <h3>Ticket d'Inscription</h3>
        <p><strong>Propriétaire :</strong> {{ lastSubmission.proprietaire }}</p>
        <p><strong>Nom du canard :</strong> {{ lastSubmission.nom }}</p>
        <p><strong>Espèce :</strong> {{ lastSubmission.espece }}</p>
        <p><strong>Région :</strong> {{ lastSubmission.region }}</p>
        <p><strong>Numéro :</strong> {{ lastSubmission.numero }}</p>
        <p><strong>Heure du défilé :</strong> {{ lastSubmission.heureDefile }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "PageInscriptionCanard",
    data() {
      return {
        form: {
          proprietaire: "",
          nom: "",
          espece: "",
          region: "",
        },
        lastSubmission: {
          proprietaire: "",
          nom: "",
          espece: "",
          region: "",
          numero: "",
          heureDefile: "",
        },
        numero: 1,
        heureDefile: "",
        showTicket: false,
      };
    },
    mounted() {
      this.fetchCurrentNumero();
      this.setHeureDefile();
    },
    methods: {
      fetchCurrentNumero() {
        this.numero = 6;
      },

      setHeureDefile() {
        if (!this.heureDefile) {
            // Initialisation : premier horaire par défaut à 16h00
            this.heureDefile = "16:00";
            return;
        }

        // Extraction des heures et minutes de l'heure actuelle
        const [currentHours, currentMinutes] = this.heureDefile
            .split(":")
            .map(Number);

        // Ajoute 5 minutes
        let newMinutes = currentMinutes + 5;
        let newHours = currentHours;

        // Gestion du dépassement des 60 minutes
        if (newMinutes >= 60) {
            newMinutes -= 60;
            newHours += 1;
        }

        // Si l'heure dépasse 19:00, recommence à 16:00 (nouvelle journée)
        if (newHours >= 19) {
            newHours = 16; // Redémarre à 16h
            newMinutes = 0; // Commence à l'heure pile
        }

        // Formate et met à jour l'heure du prochain défilé
        this.heureDefile = `${newHours.toString().padStart(2, "0")}:${newMinutes
            .toString()
            .padStart(2, "0")}`;
        }
        ,

      submitForm() {
        this.lastSubmission = {
          proprietaire: this.form.proprietaire,
          nom: this.form.nom,
          espece: this.form.espece,
          region: this.form.region,
          numero: this.numero,
          heureDefile: this.heureDefile,
        };
  
        this.showTicket = true;
  
        alert(
          `Votre canard "${this.form.nom}" a été inscrit avec succès pour le défilé à ${this.heureDefile} !`
        );
  
        this.numero++;
        this.form.proprietaire = "";
        this.form.nom = "";
        this.form.espece = "";
        this.form.region = "";
        this.setHeureDefile();
      },
    },
  };
  </script>
  
  <style scoped>
  /* Container du formulaire */
  .form-container {
    max-width: 500px;
    margin: 30px auto;
    padding: 20px;
    background: linear-gradient(135deg, #f9f9f9, #eaeaea);
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: 'Arial', sans-serif;
  }
  
  /* Titre avec l'image */
  .form-title {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .form-title h2 {
    font-size: 1.8rem;
    color: #2c3e50;
    margin: 0;
  }
  
  .duck-icon {
    width: 50px;
    height: auto;
  }
  
  /* Champs du formulaire */
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }
  
  input:focus {
    border-color: #27ae60;
    box-shadow: 0 0 6px rgba(39, 174, 96, 0.3);
    outline: none;
  }
  
  /* Bouton d'enregistrement */
  .submit-button {
    display: block;
    width: 100%;
    padding: 12px;
    font-size: 1.2rem;
    font-weight: bold;
    color: white;
    background-color: #27ae60;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  
  .submit-button:hover {
    background-color: #219150;
    transform: translateY(-2px);
  }
  
  .submit-button:active {
    background-color: #1f8a4c;
    transform: translateY(0);
  }
  
  /* Ticket d'inscription */
  .ticket {
    position: fixed;
    top: 20%;
    right: 20px;
    width: 300px;
    padding: 15px;
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    font-family: 'Arial', sans-serif;
  }
  
  .ticket h3 {
    margin: 0 0 10px;
    font-size: 1.4rem;
    font-weight: bold;
    color: #27ae60;
    text-align: center;
  }
  
  .ticket p {
    margin: 5px 0;
    font-size: 1rem;
    line-height: 1.5;
    color: #4f4f4f;
  }
  </style>
  