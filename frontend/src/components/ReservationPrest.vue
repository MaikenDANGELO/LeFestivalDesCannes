<template>
  <div>
    <!-- Image avec titre et phrase accrocheuse -->
    <div class="header-image-container">
      <div class="header-container">
        <div>
          <h1 class="header-title">{{prestataire.nom}}</h1>
          <p class="header-subtitle">{{ $t('pagePrestaTexts.restaurantSubtitle') }} </p>
          <!-- Bouton Accédez au menu -->
          <div class="menu-button-container">
            <button class="menu-button" @click="$router.push('/menu')">{{ $t('pagePrestaTexts.menuButton') }}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Formulaire -->
    <div class="reservation-container">
      <h1 class="reservation-title">
        <img src="@/assets/canard_ticket.svg" alt="Ticket Icon" class="ticket-icon">
        {{ $t('pagePrestaTexts.reserveTableTitle') }}
        <img src="@/assets/canard_ticket.svg" alt="Ticket Icon" class="ticket-icon">
      </h1>
      <p class="reservation-description">
        {{ $t('pagePrestaTexts.reserveTableDescription') }}
      </p>
      <form @submit.prevent="handleSubmit" class="reservation-form">
        <div class="form-group">
          <label for="date">{{ $t('pagePrestaTexts.dateLabel') }}</label>
          <input type="date" id="date" v-model="reservationDate" @change="updateAvailableTimes" min="2025-09-01" max="2025-09-03"  required>
        </div>
        <div class="form-group">
          <label for="time">{{ $t('pagePrestaTexts.timeLabel') }}</label>
          <select id="time" v-model="reservationTime" required>
            <option v-for="time in availableTimes" :key="time" :value="time">
              {{ time }}
            </option>
            <option v-if="!availableTimes.length" disabled>
              {{ $t('pagePrestaTexts.noAvailableTimes') }}           </option>
          </select>
        </div>
        <div class="form-group">
          <label for="special-info">{{ $t('pagePrestaTexts.specialInfoLabel') }}</label>
          <textarea id="special-info" v-model="specialInfo" placeholder="Exemple : anniversaire, allergies alimentaires..." rows="3"></textarea>
        </div>
        <div class="form-group">
          <label for="guests">{{ $t('pagePrestaTexts.guestsLabel') }} </label>
          <input type="number" id="guests" v-model="guestCount" min="1" max="10" placeholder="Exemple : 4" required>
        </div>
        <div v-if="timeMessage" class="message">{{ timeMessage }}</div>
        <button type="submit" class="reservation-button">{{ $t('pagePrestaTexts.confirmReservationButton') }}</button>
      </form>
    </div>
  </div>
</template>




<script>
import {mapState } from 'vuex';
import PrestatairesService from "@/services/prestataires.service";

export default {
  name: "PageReservationRestaurant",
  props:{
    id: String
  },
  data() {
    return {
      prestataire: {},
      reservationDate: "",
      reservationTime: "",
      specialInfo: "",
      guestCount: 1,
      timeMessage: "",
      availableTimes: [], // Heures disponibles basées sur la date sélectionnée
    };
  },
  computed: {
    ...mapState("utilisateurs", ['utilisateur']),
    ...mapState('prestataire', ['prestataires'])
  },
  mounted() {
    this.fillUserInformation();
  },
  methods: {
    fillUserInformation(){
      if(this.utilisateur.estConnecte){
        this.clientFullName = this.utilisateur.nom;
        this.clientEmail = this.utilisateur.email;
      }
    },
    async updateAvailableTimes() {
      let disponibilitesResto = await PrestatairesService.getAllDisponibiliteResto(this.id);
      disponibilitesResto = disponibilitesResto.data;
      this.availableTimes = disponibilitesResto
          .filter(reservation => reservation.date === this.reservationDate)
          .map(reservation => reservation.heure);
    },
    async handleSubmit() {
      this.reservationTime = this.reservationTime.replace(/h/, ":") + ":00";
      this.reservationDate = new Date(this.reservationDate).toISOString()

      const response = await PrestatairesService.makeReservation({user_id : this.utilisateur.id,date: this.reservationDate,hour : this.reservationTime, prestataire_id : this.id, options: {info: this.specialInfo, guest_count: this.guestCount}});
      if (response.error === 0) {
        alert(
            `Réservation confirmée pour ${this.clientFullName}. Un ticket a été envoyé à ${this.clientEmail}.`
        );
      }

      // TODO: Ajouter l'envoi d'un email avec le ticket
    },
  },
  created() {
    this.prestataire = this.prestataires.find(prestataire => prestataire.id === Number(this.id));
  }
};
</script>


<style scoped>
.reservation-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.reservation-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.ticket-icon {
  width: 40px;
  height: 40px;
}

.reservation-description {
  font-size: 1.2rem;
  color: #4f4f4f;
  margin-bottom: 20px;
  line-height: 1.6;
}

.reservation-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.form-group label {
  font-size: 1rem;
  color: #34495e;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.message {
  font-size: 1rem;
  color: #e74c3c;
  font-weight: bold;
  margin-top: -10px;
}

.reservation-button {
  background-color: #27ae60;
  color: #fff;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.reservation-button:hover {
  background-color: #1e8449;
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
  background-image: url('@/assets/restaurant.jpg');
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

.menu-button-container {
  text-align: center;
  margin-top: 20px;
}

.menu-button {
  background-color: #35414e; /* Couleur bleue moderne */
  color: white;
  padding: 15px 30px;
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
}

.menu-button:hover {
  background-color: #357ab8; /* Couleur légèrement plus foncée au survol */
  transform: scale(1.05);
}

.menu-button:active {
  background-color: #2b6392; /* Couleur encore plus foncée au clic */
  transform: scale(1);
}


</style>
