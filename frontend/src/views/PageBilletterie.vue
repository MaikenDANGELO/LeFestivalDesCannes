<template>
  <form @submit.prevent="submitForm" method="POST">
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
      <label>Type de billet :</label>
      <select v-model="ticket.type" required>
        <option value="">-- Sélectionnez le type de billet --</option>
        <option value="adulte">Adulte - 10€</option>
        <option value="enfant">Enfant - 5€</option>
        <option value="senior">Senior - 7€</option>
      </select>

      <label for="ticketQuantity">Nombre de billets :</label>
      <input v-model="ticket.quantity" type="number" placeholder="Nombre de billets" min="1" max="10" required>

      <button type="button" @click="removeTicket(index)">Supprimer ce type de billet</button>
    </div>

    <button type="button" @click="addTicket">Ajouter un type de billet</button>

    <div class="form-group">
      <p><strong>Total: {{ total }} €</strong></p>
    </div>

    <button type="submit">Réserver</button>
    <p>{{Message}}</p>
  </form>

</template>

<script>
import LocalSource from "@/datasource/controller";

export default {
  name: 'BilletterieForm',
  data() {
    return {
      form: {
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
    };
  },
  computed: {
    total() {
      if (typeof this.form.tickets === 'undefined') return 0
      let total = 0
      for (let i = 0; i < this.form.tickets.length; i++) {
        total += (this.ticketPrices[this.form.tickets[i].type] || 0) * this.form.tickets[i].quantity;
      }
      return total;
    }
  },
  methods: {
    async submitForm() {
      if (this.form.tickets.length === 0){
        this.Message = "Une erreur est survenue lors de la réservation.";
        return;
      }
      const response = await LocalSource.insertBillet(this, this.total);
      if (response.error === 0){
        // Gérer la réponse en cas de succès
        this.Message = "Réservation réussie ! Merci de votre achat.";

        // Optionnel : réinitialiser le formulaire
        this.form = {
          firstName: '',
          lastName: '',
          email: '',
          tickets: [],
        }}
      else{
        this.Message = "Une erreur est survenue lors de la réservation.";
      }
    },
    addTicket() {
      this.form.tickets.push({ type: '', quantity: 1 });
    },
    removeTicket(index) {
      this.form.tickets.splice(index, 1);
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