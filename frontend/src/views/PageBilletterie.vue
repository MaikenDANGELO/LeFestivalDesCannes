<template>
  <form v-if="currentStep === 1" @submit.prevent="goToPayment" method="POST">
    <h2>Réservation de Billet</h2>

    <div class="form-group">
      <label for="firstName">Prénom :</label>
      <input v-model="form.firstName" type="text" id="firstName" name="firstName" placeholder="Votre prénom" required>
    </div>

    <div class="form-group">
      <label for="lastName">Nom :</label>
      <input v-model="form.lastName" type="text" id="lastName" name="lastName" placeholder="Votre nom" required>
    </div>

    <div class="form-group">
      <label for="email">Email :</label>
      <input v-model="form.email" type="email" id="email" name="email" placeholder="Votre email" required>
    </div>

    <div class="form-group" v-for="(ticket, index) in form.tickets" :key="index">
      <label for="type">Type de billet :</label>
      <select id="type" v-model="ticket.type" required>
        <option value="">-- Sélectionnez le type de billet --</option>
        <option value="adulte">Adulte - 10€</option>
        <option value="enfant">Enfant - 5€</option>
        <option value="senior">Senior - 7€</option>
      </select>

      <label for="ticketQuantity">Nombre de billets :</label>
      <input id="ticketQuantity" v-model="ticket.quantity" type="number" placeholder="Nombre de billets" min="1" max="10" required>

      <button type="button" @click="removeTicket(index)">Supprimer ce type de billet</button>
    </div>

    <button type="button" @click="addTicket">Ajouter un type de billet</button>

    <div class="form-group">
      <p><strong>Total: {{ totalForm }} €</strong></p>
    </div>

    <button type="submit">Passer au paiement</button>
    <p>{{Message}}</p>

    <div v-if="orderSummary">
      <h2>Récapitulatif de la commande</h2>
      <p><strong>Prénom :</strong> {{ recap.firstName }}</p>
      <p><strong>Nom :</strong> {{ recap.lastName }}</p>
      <p><strong>Email :</strong> {{ recap.email }}</p>
      <h3>Billets :</h3>
      <ul>
        <li v-for="(ticket, index) in recap.tickets" :key="index">
          {{ ticket.quantity }} x {{ ticket.type }} ({{ ticket.type === 'adulte' ? '10€' : ticket.type === 'enfant' ? '5€' : '7€' }} par billet)
        </li>
      </ul>
      <p><strong>Total :</strong> {{ totalRecap }} €</p>
    </div>
  </form>



  <form v-else-if="currentStep === 2" @submit.prevent="processPayment">
    <h2>Paiement</h2>

    <div class="form-group">
      <label for="cardNumber">Numéro de carte :</label>
      <input v-model="payment.cardNumber" type="text" id="cardNumber" pattern="\d{16,}" placeholder="Numéro de carte" required>
    </div>

    <div class="form-group">
      <label for="expirationDate">Date d'expiration :</label>
      <input v-model="payment.expirationDate" type="text" id="expirationDate"  pattern="^(0[1-9]|1[0-2])\/\d{2}$" placeholder="MM/AA" required>
    </div>

    <div class="form-group">
      <label for="cvv">CVV :</label>
      <input v-model="payment.cvv" type="text" id="cvv" placeholder="CVV" required>
    </div>

    <div class="form-group">
      <p><strong>Total à payer : {{ totalForm }} €</strong></p>
    </div>

    <button type="submit">Payer</button>
  </form>

</template>

<script>
import LocalSource from "@/datasource/controller";

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
    }
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
      const response = await LocalSource.insertBillet(this, this.totalForm);
      if (response.error === 0){
        // Gérer la réponse en cas de succès
        this.Message = "Réservation réussie ! Merci de votre achat.";
      }
      else{
        this.Message = "Une erreur est survenue lors de la réservation.";
      }

      //Translation des variables de form dans recap
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

    },
    resetPayment() {
      // Réinitialiser les champs de paiement
      this.payment.cardNumber = '';
      this.payment.expirationDate = '';
      this.payment.cvv = '';
    }
  }
}
</script>


<style scoped>
form {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  margin: 0 auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
h2 {
  text-align: center;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
input, select, button {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
button {
  background-color: #333;
  color: white;
  cursor: pointer;
}
button:hover {
  background-color: #555;
}
</style>