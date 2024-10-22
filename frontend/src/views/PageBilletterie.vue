<template>
  <form @submit.prevent="submitForm" method="POST">
    <h2>Réservation de Billet</h2>

    <div class="form-group">
      <label for="firstName">Prénom :</label>
      <input v-model="form.firstName"   type="text" id="firstName" name="firstName" placeholder="Votre prénom" required>
    </div>

    <div class="form-group">
      <label for="lastName">Nom :</label>
      <input v-model="form.lastName" type="text" id="lastName" name="lastName" placeholder="Votre nom" required>
    </div>

    <div class="form-group">
      <label for="email">Email :</label>
      <input v-model="form.email"  type="email" id="email" name="email" placeholder="Votre email" required>
    </div>

    <div class="form-group">
      <label for="ticketType">Type de billet :</label>
      <select v-model="form.ticketType"  id="ticketType" name="ticketType" required>
        <option value="">-- Sélectionnez le type de billet --</option>
        <option value="adulte">Adulte - 10€</option>
        <option value="enfant">Enfant - 5€</option>
        <option value="senior">Senior - 7€</option>
      </select>
    </div>

    <div class="form-group">
      <label for="ticketQuantity">Nombre de billets :</label>
      <input v-model="form.ticketQuantity"  type="number" id="ticketQuantity" name="ticketQuantity" placeholder="Nombre de billets" min="1" max="10" required>
    </div>

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
        ticketType: '',
        ticketQuantity: '',
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
      const pricePerTicket = this.ticketPrices[this.form.ticketType] || 0;
      return pricePerTicket * this.form.ticketQuantity;
    }
  },
  methods: {
    async submitForm() {
      const response = await LocalSource.insertBillet(this, this.total);
      if (response.error === 0){
        // Gérer la réponse en cas de succès
        this.Message = "Réservation réussie ! Merci de votre achat.";

        // Optionnel : réinitialiser le formulaire
        this.form = {
          firstName: '',
          lastName: '',
          email: '',
          ticketType: '',
          ticketQuantity: '',
        }}
      else{
        this.Message = "Une erreur est survenue lors de la réservation.";
      }
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