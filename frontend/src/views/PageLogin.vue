<template>
  <form @submit.prevent="connexion" method="POST">
    <h2>Connexion</h2>

    <div class="form-group">
      <label for="login">Login :</label>
      <input v-model="login" type="text" id="login" name="login" placeholder="Votre login" required>
    </div>

    <div class="form-group">
      <label for="mdp">Mot de passe :</label>
      <input v-model="password" type="text" id="mdp" name="mdp" placeholder="Votre mot de passe" required>
    </div>
    <button type="submit">Connexion</button>
  </form>

</template>

<script>
import LocalSource from "@/datasource/controller";

export default {
  name: 'LoginForm',
  data() {
    return {
      login:'',
      password:''
    }
  },
  methods:{
    async connexion(){
      const response = await LocalSource.connexion(this.login, this.password);
      if (response.error === 0){
        console.log(response)
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