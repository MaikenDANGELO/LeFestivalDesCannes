<template>
  <div>
    <div class="header-image-container">
      <div class="header-container">
        <div>
          <h1 class="header-title">{{ $t('inscriptionCanardTexts.title') }}</h1>
          <p class="header-subtitle">{{ $t('inscriptionCanardTexts.subtitle') }}</p>
        </div>
      </div>
    </div>
    <div class="form-container">
      <form @submit.prevent="submitForm">
        <div class="form-title">
          <img src="@/assets/canard_ticket.svg" alt="Canard" class="duck-icon" />
          <h2>{{ $t('inscriptionCanardTexts.inscriptionTitle') }}</h2>
          <img src="@/assets/canard_ticket.svg" alt="Canard" class="duck-icon" />
        </div>

        <div class="form-group">
          <label for="proprietaire">{{ $t('inscriptionCanardTexts.ownerLabel') }}</label>
          <input
              v-model="form.proprietaire"
              type="text"
              id="proprietaire"
              :placeholder="$t('inscriptionCanardTexts.ownerPlaceholder')"
              required
          />
        </div>

        <div class="form-group">
          <label for="nomCanard">{{ $t('inscriptionCanardTexts.duckNameLabel') }}</label>
          <input
              v-model="form.nom"
              type="text"
              id="nomCanard"
              :placeholder="$t('inscriptionCanardTexts.duckNamePlaceholder')"
              required
          />
        </div>

        <div class="form-group">
          <label for="espece">{{ $t('inscriptionCanardTexts.speciesLabel') }}</label>
          <input
              v-model="form.espece"
              type="text"
              id="espece"
              :placeholder="$t('inscriptionCanardTexts.speciesPlaceholder')"
              required
          />
        </div>

        <div class="form-group">
          <label for="region">{{ $t('inscriptionCanardTexts.regionLabel') }}</label>
          <input
              v-model="form.region"
              type="text"
              id="region"
              :placeholder="$t('inscriptionCanardTexts.regionPlaceholder')"
              required
          />
        </div>

        <div class="form-group">
          <label for="numero">{{ $t('inscriptionCanardTexts.numberLabel') }}</label>
          <input
              type="text"
              id="numero"
              :value="numero"
              readonly
          />
        </div>

        <div class="form-group">
          <label for="heure">{{ $t('inscriptionCanardTexts.timeLabel') }}</label>
          <input
              type="text"
              id="heure"
              :value="heureDefile"
              readonly
          />
        </div>

        <button type="submit" :disabled="heureDefile === null" class="submit-button">{{ $t('inscriptionCanardTexts.submitButton') }}</button>
      </form>
    </div>
  </div>
</template>



<script>
import { mapState } from 'vuex';
import usersService from "@/services/users.service";

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
        numero: 1,
        heureDefile: "",
        showTicket: false,
      };
    },
    mounted() {
      this.fetchCurrentNumero();
      this.setHeureDefile();
      if(this.utilisateur.estConnecte){
        this.form.proprietaire = this.utilisateur.nom
      }
    },
    computed:{
      ...mapState("utilisateurs", ['utilisateur']),
    },
    methods: {
      async fetchCurrentNumero() {
        const response = await usersService.getNextCanardDefileIDService();
        if (response.error === 0) {
          this.numero = response.data;
        }
      },

      async setHeureDefile() {
        const response = await usersService.getNextTimeDefile()
        if (response.error === 0) {
          this.heureDefile = response.data;
        }

        if (!this.heureDefile) {
          this.heureDefile = "16:00";
          return;
        }



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
           this.heureDefile = null
          return;
        }

        // Formate et met à jour l'heure du prochain défilé
        this.heureDefile = `${newHours.toString().padStart(2, "0")}:${newMinutes
            .toString()
            .padStart(2, "0")}`;
        }
        ,

      async submitForm() {
        this.lastSubmission = {
          nom: this.form.nom,
          idproprietaire: this.utilisateur.id,
          espece: this.form.espece,
          region: this.form.region,
          heureDefile: this.heureDefile,
        };

        const response  = await usersService.insertCanardDefileService(this.lastSubmission)
        if (response.error === 0) {
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
        }
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

  .header-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.header-container > * {
  position: relative;
  z-index: 2;
}

.header-container {
  position: relative;
  width: 100%;
  height: 70vh;
  background-image: url('@/assets/canard.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-title {
  font-size: 6.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 10px;
  text-shadow: 0px 6px 15px rgba(0, 0, 0, 0.8);
  letter-spacing: 2px;
}

.header-subtitle {
  font-size: 2rem;
  font-weight: 500;
  color: white;
  margin-top: 15px;
  text-shadow: 0px 4px 12px rgba(0, 0, 0, 0.7);
  font-style: italic;
}

/* Formulaire CSS (inchangé pour harmonie) */
.form-container {
  max-width: 500px;
  margin: 30px auto;
  padding: 20px;
  background: linear-gradient(135deg, #f9f9f9, #eaeaea);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}
  </style>
  