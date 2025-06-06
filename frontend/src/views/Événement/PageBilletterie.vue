<template>
  <div class="page-container">
    <!-- Header avec image -->
    <div class="header-image-container">
      <div class="header-container">
        <div>
          <h1 class="header-title">{{ $t('billeterieTexts.titre') }}</h1>
          <p class="header-subtitle">{{ $t('billeterieTexts.sousTitre') }}</p>
        </div>
      </div>
    </div>

    <form v-if="currentStep === 1" @submit.prevent="goToPayment" class="form-container" method="POST">
      <img src="../../assets/canard_ticket.svg" alt="Ticket Icon" class="ticket-icon">
      <h2>{{ $t('billeterieTexts.reservationTitre') }}</h2>

      <div class="form-group">
        <label for="firstName">{{ $t('billeterieTexts.prenom') }} :</label>
        <input v-model="form.firstName" type="text" id="firstName" name="firstName" :placeholder="$t('billeterieTexts.prenomPlaceholder')" required>
      </div>

      <div class="form-group">
        <label for="lastName">{{ $t('billeterieTexts.nom') }} :</label>
        <input v-model="form.lastName" type="text" id="lastName" name="lastName" :placeholder=" $t('billeterieTexts.nomPlaceholder') " required>
      </div>

      <div class="form-group">
        <label for="email">{{ $t('billeterieTexts.email') }} :</label>
        <input v-model="form.email" type="email" id="email" name="email" :placeholder="$t('billeterieTexts.emailPlaceholder')" required>
      </div>

      <div class="form-group" v-for="(ticket, index) in form.tickets" :key="index">
        <label for="type">{{ $t('billeterieTexts.typeBillet') }} :</label>
        <select id="type" v-model="ticket.type" required>
          <option value="">{{ $t('billeterieTexts.selectType') }}</option>
          <option value="adulte">{{ $t('billeterieTexts.adulte') }} - 10€</option>
          <option value="enfant">{{ $t('billeterieTexts.enfant') }} - 5€</option>
          <option value="senior">{{ $t('billeterieTexts.senior') }} - 7€</option>
        </select>

        <label for="ticketQuantity">{{ $t('billeterieTexts.quantiteBillet') }} :</label>
        <input id="ticketQuantity" v-model="ticket.quantity" type="number" :placeholder="$t('billeterieTexts.quantiteBilletPlaceholder')" min="1" max="10" required>

        <button type="button" @click="removeTicket(index)">{{ $t('billeterieTexts.supprimerBillet') }}</button>
      </div>

      <button type="button" @click="addTicket">{{ $t('billeterieTexts.ajouterBillet') }}</button>

      <div class="form-group">
        <p><strong>{{ $t('billeterieTexts.total') }}: {{ totalForm }} €</strong></p>
      </div>

      <button type="submit">{{ $t('billeterieTexts.passerPaiement') }}</button>
      <p>{{Message}}</p>

      <div v-if="orderSummary">
        <h2>{{ $t('billeterieTexts.recapitulatifCommande') }}</h2>
        <p><strong>{{ $t('billeterieTexts.prenom') }} :</strong> {{ recap.firstName }}</p>
        <p><strong>{{ $t('billeterieTexts.nom') }} :</strong> {{ recap.lastName }}</p>
        <p><strong>{{ $t('billeterieTexts.email') }} :</strong> {{ recap.email }}</p>
        <h3>{{ $t('billeterieTexts.billets') }} :</h3>
        <ul>
          <li v-for="(ticket, index) in recap.tickets" :key="index">
            {{ ticket.quantity }} x {{ ticket.type }} ({{ ticket.type === 'adulte' ? '10€' : ticket.type === 'enfant' ? '5€' : '7€' }} par billet)
          </li>
        </ul>
        <p><strong>{{ $t('billeterieTexts.total') }} :</strong> {{ totalRecap }} €</p>
      </div>
    </form>

    <form v-else-if="currentStep === 2" @submit.prevent="processPayment" class="form-container">
      <h2>{{ $t('billeterieTexts.paiementTitre') }}</h2>

      <div class="form-group">
        <label for="cardNumber">{{ $t('billeterieTexts.numCarte') }} :</label>
        <input v-model="payment.cardNumber" type="text" id="cardNumber" pattern="\d{16,}" :placeholder="$t('billeterieTexts.numCartePlaceholder')" required>
      </div>

      <div class="form-group">
        <label for="expirationDate">{{ $t('billeterieTexts.dateExpiration') }} :</label>
        <input v-model="payment.expirationDate" type="text" id="expirationDate"  pattern="^(0[1-9]|1[0-2])\/\d{2}$" placeholder="MM/AA" @input="formatExpirationDate" required>
      </div>

      <div class="form-group">
        <label for="cvv">{{ $t('billeterieTexts.cvv') }} :</label>
        <input v-model="payment.cvv" type="text" id="cvv" :placeholder="$t('billeterieTexts.cvvPlaceholder')" required>
      </div>

      <div class="form-group">
        <p><strong>{{ $t('billeterieTexts.totalAPayer') }} : {{ totalForm }} €</strong></p>
      </div>

      <button type="submit">{{ $t('billeterieTexts.payer') }}</button>
    </form>
  </div>
</template>


<script>
import {mapState} from "vuex";
import moneyService from '@/services/money.service';

export default {
  name: 'BilletterieForm',
  data() {
    return {
      currentStep: 1,
      form: {
        firstName: '',
        lastName: '',
        email: '',
        tickets: [],
      },
      recap:{
        firstName: '',
        lastName: '',
        email: '',
        tickets: [],
      },
      Message: '',
      ticketPrices: {
        adulte: 10,
        enfant: 5,
        senior: 7
      },
      payment: {
        cardNumber: '',
        expirationDate: '',
        cvv: ''
      },
      orderSummary: false,
    };
  },
  computed: {
    ...mapState('utilisateurs', [ 'utilisateur']),
    totalForm() {
      if (typeof this.form.tickets === 'undefined') return 0
      let total = 0
      for (let i = 0; i < this.form.tickets.length; i++) {
        total += (this.ticketPrices[this.form.tickets[i].type] || 0) * this.form.tickets[i].quantity;
      }
      return total;
    },
    totalRecap() {
      if (typeof this.recap.tickets === 'undefined') return 0
      let total = 0
      for (let i = 0; i < this.recap.tickets.length; i++) {
        total += (this.ticketPrices[this.recap.tickets[i].type] || 0) * this.recap.tickets[i].quantity;
      }
      return total;
    },

  },
  methods: {
    addTicket() {
      this.form.tickets.push({ type: '', quantity: 1 });
    },
    removeTicket(index) {
      this.form.tickets.splice(index, 1);
    },
    goToPayment() {
      if (this.form.tickets.length === 0){
        this.Message = "Donner le type et le nombre de tickets.";
        return;
      }
      // Transition vers la page de paiement
      this.currentStep = 2;
    },
    async processPayment() {
      // Simuler le paiement et retourner au formulaire avec le récapitulatif
      // Vous pouvez ajouter ici un vrai traitement de paiement via une API
      setTimeout(() => {
        this.currentStep = 1;
        this.orderSummary = true; // Afficher le récapitulatif de la commande
      }, 1000); // Simuler un délai de traitement

      if (this.form.tickets.length === 0){
        this.Message = "Donner le type et le nombre de tickets.";
        return;
      }
      const response = await moneyService.paidTicketService({form: this.form, total: this.totalForm})
      if (response.error === 0){
        this.Message = "Réservation réussie ! Merci de votre achat.";
        this.recap.firstName = this.form.firstName;
        this.recap.lastName = this.form.lastName;
        this.recap.email = this.form.email;
        this.recap.tickets = [...this.form.tickets];

        //Rénitialisation de form et des informations de payment
        this.form = {
          firstName: '',
          lastName: '',
          email: '',
          tickets: [],
        }
        this.resetPayment();
      }
      else{
        this.Message = "Une erreur est survenue lors de la réservation.";
      }


    },
    resetPayment() {
      // Réinitialiser les champs de paiement
      this.payment.cardNumber = '';
      this.payment.expirationDate = '';
      this.payment.cvv = '';
    },
    formatExpirationDate() {
      let value = this.payment.expirationDate.replace(/\D/g, ''); // Supprime tout sauf les chiffres

      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
      }

      this.payment.expirationDate = value.substring(0, 5); // Limite à 5 caractères
    }
  },
  mounted(){
    if(this.utilisateur.estConnecte){
      let name = this.utilisateur.nom.split(' ');
      if(name.length == 2){
        this.form.firstName = name[0];
        this.form.lastName = name[1];
      }else{
        this.form.firstName = this.utilisateur.nom
      }
      this.form.email = this.utilisateur.email
    }
  }
}
</script>


<style scoped>
/* Header avec image de fond */
.header-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Voile noir transparent */
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
  background-image: url('@/assets/ticket.jpg'); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-title {
  font-size: 6.5rem; /* Taille imposante pour le titre principal */
  font-weight: 700;
  color: white;
  margin-bottom: 10px;
  text-shadow: 0px 6px 15px rgba(0, 0, 0, 0.8);
  letter-spacing: 2px;
}

.header-subtitle {
  font-size: 2rem; /* Taille légèrement plus grande pour le sous-titre */
  font-weight: 500;
  color: white;
  margin-top: 15px;
  text-shadow: 0px 4px 12px rgba(0, 0, 0, 0.7);
  font-style: italic;
}

/* Formulaire */
.form-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
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

.form-group input,
.form-group select,
button {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

button {
  background-color: #27ae60;
  color: #fff;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #1e8449;
}

.ticket-icon {
  width: 40px;
  height: 40px;
}

</style>