<template>
  <form action="/submit-ticket" method="POST">
    <h2>Réservation de Billet</h2>

    <div class="form-group">
      <label for="firstName">Prénom :</label>
      <input type="text" id="firstName" name="firstName" placeholder="Votre prénom" required>
    </div>

    <div class="form-group">
      <label for="lastName">Nom :</label>
      <input type="text" id="lastName" name="lastName" placeholder="Votre nom" required>
    </div>

    <div class="form-group">
      <label for="email">Email :</label>
      <input type="email" id="email" name="email" placeholder="Votre email" required>
    </div>

    <div class="form-group">
      <label for="ticketType">Type de billet :</label>
      <select id="ticketType" name="ticketType" required>
        <option value="">-- Sélectionnez le type de billet --</option>
        <option value="adulte">Adulte</option>
        <option value="enfant">Enfant</option>
        <option value="senior">Senior</option>
      </select>
    </div>

    <div class="form-group">
      <label for="ticketQuantity">Nombre de billets :</label>
      <input type="number" id="ticketQuantity" name="ticketQuantity" placeholder="Nombre de billets" min="1" max="10" required>
    </div>

    <button type="submit">Réserver</button>
  </form>
</template>

<script setup>

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