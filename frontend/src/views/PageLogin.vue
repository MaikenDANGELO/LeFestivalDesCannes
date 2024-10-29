<template>
  <form @submit.prevent="connexion" method="POST">
    <h2>Connexion</h2>

    <div class="form-group">
      <label for="login">Login :</label>
      <input v-model="login" type="text" id="login" name="login" placeholder="Votre login" required>
    </div>

    <div class="form-group">
      <label for="mdp">Mot de passe :</label>
      <input v-model="password" :type="isPasswordVisible ? 'text' : 'password'" id="mdp" name="mdp" placeholder="Votre mot de passe" required>
      <button class="password-icon" type="button" @click="togglePasswordVisibility">
        <i :class="isPasswordVisible ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
      </button>
    </div>
    <button type="submit">Connexion</button>
    <p>{{message}}</p>
  </form>

</template>

<script>
import LocalSource from "@/datasource/controller";
import {mapActions} from "vuex";

export default {
  name: 'LoginForm',
  data() {
    return {
      login:'',
      password:'',
      isPasswordVisible: false,
      message:'',
    }
  },
  methods:{
    ...mapActions('utilisateurs', [ 'logIn']),
    async connexion(){
      try {
        const response = await LocalSource.connexion(this.login, this.password);
        if (response.error === 0) {
          await this.logIn(response.data);
          this.$router.push({ name: "home" });
        } else {
          this.message = response.data;
        }
      } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        this.message = "Une erreur est survenue. Veuillez réessayer."; // Gestion d'erreur
      }
    },
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
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
  position: relative;
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
.form-group .password-icon {
  display: flex;
  align-items: center;
  position: absolute;
  top: 70%;
  right: 3%;
  transform: translateY(-50%);
  width: 20px;
  height: 10px;
  color: #000000;
  background-color: white;
  transition: all 0.2s;
  border: 0;
}
</style>