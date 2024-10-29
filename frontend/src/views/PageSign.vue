<template>
  <body>
  <div class="main">
    <input type="checkbox" id="chk" aria-hidden="true">

    <div class="signup">
      <form @submit.prevent="signUp" method="post">
        <label class="title" for="chk" aria-hidden="true">Sign up</label>

        <input v-model="userName" type="text" name="txt" placeholder="User name" required="">
        <input v-model="adresse" type="text" name="txt" placeholder="Adresse" required="">
        <input v-model="login" type="email" name="email" placeholder="Email" required="">
        <input v-model="tel" type="number" name="tel" placeholder="N° Télephone" required="">
        <input v-model="password" :type="isPasswordVisible ? 'text' : 'password'" id="mdp" name="mdp" placeholder="Votre mot de passe" required>
        <button class="password-icon" type="button" @click="togglePasswordVisibility">
          <i :class="isPasswordVisible ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
        </button>
        <button class="submit" type="submit">Sign up</button>
        <p>{{message}}</p>
      </form>
    </div>

    <div class="login">
      <form @submit.prevent="connexion" method="POST" >
        <label class="title" for="chk" aria-hidden="true">Login</label>

        <label for="login">Email:</label>
        <input v-model="login" type="text" id="login" name="login" placeholder="Votre login" required>

        <label for="mdp">Mot de passe :</label>
        <input v-model="password" :type="isPasswordVisible ? 'text' : 'password'" id="mdp" name="mdp" placeholder="Votre mot de passe" required>
        <button class="password-icon" type="button" @click="togglePasswordVisibility">
          <i :class="isPasswordVisible ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
        </button>

        <button class="submit" type="submit">Login</button>
        <p>{{message}}</p>
      </form>
    </div>
  </div>
  </body>
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
      userName:'',
      tel:0,
      adresse:'',
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
    },
    async signUp(){
      try {
        const response = await LocalSource.signUp(this.login, this.password, this.tel, this.userName, this.adresse);
        if (response.error === 0) {
          await this.logIn(response.data);
          this.$router.push({ name: "home" });
        } else {
          console.log(this.login, this.password, this.tel, this.userName, this.adresse)
          this.message = response.data;
        }
      } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        this.message = "Une erreur est survenue. Veuillez réessayer."; // Gestion d'erreur
      }
    },
  }
}

</script>

<style scoped>
body{
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Jost', sans-serif;
  background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
}
.main{
  width: 350px;
  height: 600px;
  background: red;
  overflow: hidden;
  background: url("https://doc-08-2c-docs.googleusercontent.com/docs/securesc/68c90smiglihng9534mvqmq1946dmis5/fo0picsp1nhiucmc0l25s29respgpr4j/1631524275000/03522360960922298374/03522360960922298374/1Sx0jhdpEpnNIydS4rnN4kHSJtU1EyWka?e=view&authuser=0&nonce=gcrocepgbb17m&user=03522360960922298374&hash=tfhgbs86ka6divo3llbvp93mg4csvb38") no-repeat center/ cover;
  border-radius: 10px;
  box-shadow: 5px 20px 50px #000;
}
#chk{
  display: none;
}
.signup{
  position: relative;
  width:100%;
  height: 100%;
}
.title{
  color: #fff;
  font-size: 2.3em;
  justify-content: center;
  display: flex;
  margin: 50px;
  font-weight: bold;
  cursor: pointer;
  transition: .5s ease-in-out;
}

label{
  justify-content: center;
  display: flex;
}
input{
  width: 60%;
  height: 10px;
  background: #e0dede;
  justify-content: center;
  display: flex;
  margin: 15px auto;
  padding: 12px;
  border: none;
  outline: none;
  border-radius: 5px;
}
button{
  width: 60%;
  height: 40px;
  margin: 10px auto;
  justify-content: center;
  display: block;
  color: #fff;
  background: #573b8a;
  font-size: 1em;
  font-weight: bold;
  margin-top: 30px;
  outline: none;
  border: none;
  border-radius: 5px;
  transition: .2s ease-in;
  cursor: pointer;
}
.submit:hover{
  background: #6d44b8;
}
.login{
  height: 560px;
  background: #eee;
  border-radius: 70% / 10%;
  transform: translateY(-180px);
  transition: .8s ease-in-out;
}
.login .title{
  color: #573b8a;
  transform: scale(.6);
}

#chk:checked ~ .login{
  transform: translateY(-570px);
}
#chk:checked ~ .login label{
  transform: scale(1);
}
#chk:checked ~ .signup label{
  transform: scale(.6);
}

.password-icon{
  display: flex;
  align-items: center;
  position: absolute;
  right: 20%;
  transform: translateY(-50%);
  width: 20px;
  height: 10px;
  color: #000000;
  background-color: white;
  transition: all 0.2s;
  border: 0;
}

.login .password-icon {
  top: 34.5%;
}

.signup .password-icon{
  top: 45.75%;
}

</style>