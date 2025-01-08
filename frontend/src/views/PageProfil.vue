<template>
  <div id="app">
    <nav class="vertical-navbar">
      <div class="nav-links">
        <button class="nav-link" @click="setCurrentView('myProfil')">Mon Profil</button>
        <button class="nav-link" @click="setCurrentView('myReservations')">Mes réservations</button>
        <button class="nav-link" @click="setCurrentView('myNotif')">
          Mes notifications
          <div class="notification-wrapper">
            <p v-if="notifications.length !== 0" class="circle">{{ notifications.length }}</p>
            <div class="cloche notification-cloche">
              <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path d="M 25 1 A 4 4 0 0 0 25 9 A 4 4 0 0 0 25 1 z M 19.400391 7.0996094 C 14.800391 8.9996094 12 13.4 12 19 C 12 29.4 9.2 31.9 7.5 33.5 C 6.7 34.2 6 34.9 6 36 C 6 40 12.2 42 25 42 C 37.8 42 44 40 44 36 C 44 34.9 43.3 34.2 42.5 33.5 C 40.8 31.9 38 29.4 38 19 C 38 13.3 35.299609 8.9996094 30.599609 7.0996094 C 29.799609 9.3996094 27.6 11 25 11 C 22.4 11 20.200391 9.3996094 19.400391 7.0996094 z M 19.099609 43.800781 C 19.499609 46.800781 22 49 25 49 C 28 49 30.500391 46.800781 30.900391 43.800781 C 29.000391 44.000781 27 44 25 44 C 23 44 20.999609 44.000781 19.099609 43.800781 z"/></svg>
            </div>
          </div>
        </button>
      </div>
    </nav>


    <div class="main" v-if="currentView === 'myProfil' && utilisateur">
      <h1>Mon Profil</h1>
      <div class="case" v-if="modifyPassword === false">
        <div>
          <h3>Données personnelles </h3>
          <div>
            <button v-if="modifyPersonnalData === false" @click="clickModifyPersonnalData()">Modifier</button>
            <button v-if="modifyPersonnalData === true" @click="changePersonnalData()" class="second-button">Sauvegarder les modifications</button>
          </div>
        </div>
        <div class="personnal-info">

          <div class="form-group">
            <label for="name">M./Mme</label>
            <p v-if="modifyPersonnalData === false">{{this.utilisateur.nom}}</p>
            <input v-else type="text" id="name" placeholder="Votre nom et prénom"  v-model="nom_utilisateur">
          </div>

          <div class="form-group">
            <label for="numero">Numéro de télephone</label>
            <p v-if="modifyPersonnalData === false">{{this.utilisateur.numero}}</p>
            <input v-else type="text" id="numero" placeholder="Votre numéro de téléphone"  v-model="telephone">
          </div>

          <div class="form-group">
            <label for="email">Email :</label>
            <p v-if="modifyPersonnalData === false">{{this.utilisateur.email}}</p>
            <input v-else type="text" id="email" name="email" placeholder="Votre email" v-model="email_utilisateur">
          </div>

          <div class="form-group">
            <label for="adresse">Adresse :</label>
            <p v-if="modifyPersonnalData === false">{{this.utilisateur.adresse}}</p>
            <input v-else type="text" id="adresse" name="adresse" placeholder="Votre adresse" v-model="adresse_utilisateur">
          </div>
        </div>
      </div>


      <div class="case" v-if="modifyPersonnalData === false">
        <h3>Mot de passe</h3>
        <button v-if="modifyPassword ===false" @click="clickModifyPassword()" class="third-button">Changer de mot de passe</button>
        <button v-if="modifyPassword === true" @click="changePassword()" class="third-button">Accepter</button>
        <div v-if="modifyPassword === true">

          <div class="password">
            <div class="actuel-password">
              <label for="mdp">Mot de passe actuel :</label>
              <input v-model="actualPassword" :type="isPasswordVisible ? 'text' : 'password'" id="mdp" name="mdp" placeholder="Votre mot de passe" required >
              <button class="password-icon" type="button" @click="togglePasswordVisibility">
                <i :class="isPasswordVisible ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
              </button>
            </div>

            <div class="newpassword">
              <label for="nmdp">Nouveau mot de passe :</label>
              <input @input="checkPasswordStrength" v-model="newPassword" :type="isPasswordVisible2 ? 'text' : 'password'" id="nmdp" name="nmdp" placeholder="Votre mot de passe" required>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: strengthPercentage + '%', backgroundColor: strengthColor }"></div>
              </div>
              <button style="top: 33%" class="password-icon" type="button" @click="togglePasswordVisibility2">
                <i :class="isPasswordVisible2 ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
              </button>
            </div>
            <div class="verif">
              <label for="nmdp2">Vérification mot de passe :</label>
              <input @input="checkSamePassword($event)" id="nmdp2" name="nmdp2"  type="password" placeholder="Votre mot de passe" required  :class="inputClass">
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="main" v-if="currentView === 'myReservations'">

      <h1>Mes Réservations : </h1>

      <div v-if="reservations.length !== 0">
        <div class="case" v-for="(reservation) in reservations" :key="reservation.id_reservation" >
          <div class="reservation-details">
            <h2>{{ reservation.type_reservation }}</h2>
            <p>Réservation le {{reservation.date_reservation}} à {{reservation.heure_reservation}}</p>
            <p v-if="reservation.data">{{ reservation.data }}</p>
            <button @click="cancelReservation(reservation.id_reservation)">Annuler</button>
          </div>
        </div>
      </div>
    </div>

    <div class="main" v-if="currentView === 'myNotif'">
      <h1>Mes Notifications</h1>
      <div v-if="notifications.length !== 0">
        <div class="case" v-for="(notif) in notifications" :key="notif.id" >
          <div class="notification">
            {{notif.message}}
          </div>
        </div>
      </div>
      <div v-else>
        <h2>Aucune notifications</h2>
      </div>


    </div>
    <router-view />
  </div>

</template>

<script>
import {mapActions, mapState} from 'vuex';
import usersService from "@/services/users.service";
import prestatairesService from "@/services/prestataires.service"

export default {
  data(){
    return{
      currentView: 'myProfil',
      modifyPersonnalData:false,
      modifyPassword:false,
      strengthPercentage: 0,
      strengthColor: 'red',
      actualPassword:'',
      newPassword:'',
      isPasswordVisible: false,
      isPasswordVisible2: false,
      samePassword: false,
      notifications: [],
      reservations : [],
      nom_utilisateur:'',
      email_utilisateur:'',
      adresse_utilisateur:'',
      telephone:'',
    }
  },
  computed: {
    ...mapState('utilisateurs', ['utilisateur']),
    inputClass() {
      if (this.newPassword === '') {
        return '';
      } else if (this.samePassword) {
        return 'input-success';
      } else {
        return 'input-error';
      }
    }
  },
  methods:{
    ...mapActions('utilisateurs', ['getAllUsers', 'logIn']),
    async cancelReservation(id){
      console.log('Annulation de la réservation '+id)
      await prestatairesService.cancelReservation(id, this.utilisateur.role);
      await this.fetchUserReservations()
      await this.getNotificationByID(this.utilisateur.id)
    },
    async fetchUserReservations(){
      try {
        const response = await prestatairesService.getReservationsfromUid(this.utilisateur.id);
        if (response.error === 0) {
          this.reservations = response.data;
          console.log(this.reservations)
        } else {
          console.error("Erreur lors du chargement des réservations :", response.data);
        }
      } catch (error) {
        console.error("Impossible de récupérer les réservations :", error.message);
      }
    },
    setCurrentView(view) {
      console.log(view)
      this.currentView = view;
      console.log(this.currentView)
    },
    clickModifyPersonnalData(){
      this.modifyPersonnalData = !this.modifyPersonnalData;
    },
    clickModifyPassword(){
      this.modifyPassword = !this.modifyPassword;
    },
    checkPasswordStrength() {
      const password = this.newPassword;
      let score = 0;

      if (password.length >= 8) score++;
      if (/[A-Z]/.test(password)) score++;
      if (/[a-z]/.test(password)) score++;
      if (/\d/.test(password)) score++;
      if (/[\W_]/.test(password)) score++;

      this.strengthPercentage = (score / 5) * 100;

      if (score === 0) {
        this.strengthColor = 'red';
      } else if (score <= 2) {
        this.strengthColor = 'orange';
      } else if (score <= 4) {
        this.strengthColor = 'yellow';
      } else {
        this.strengthColor = 'green';
      }
      this.inputClass
    },
    checkSamePassword(event){
      this.samePassword = (this.newPassword === event.target.value)
      this.inputClass
    },
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
    togglePasswordVisibility2() {
      this.isPasswordVisible2 = !this.isPasswordVisible2;
    },
    async getNotificationByID(id){
      let notif = await usersService.getNotificationByUserID(id);
      this.notifications = notif.data;
    },
    validatePhone(phone) {
      const regex = /^\d{10}$/; // Exemple pour un numéro à 10 chiffres
      return regex.test(phone);
    },
    async changePersonnalData() {
      if (!this.validatePhone(this.telephone)) {
        alert('Veuillez saisir un numéro de téléphone valide.');
        return;
      }
      let response = await usersService.changePersonnalData(
          { nom: this.nom_utilisateur,
            email: this.email_utilisateur,
            numero: this.telephone,
            adresse:this.adresse_utilisateur,
            },
            this.utilisateur.id)
      this.nom_utilisateur=''
      this.email_utilisateur=''
      this.adresse_utilisateur=''
      this.telephone=''
      this.logIn(response.data);
      this.clickModifyPersonnalData()
    },
    async markNotificationsAsRead() {
      await usersService.markAllAsRead(this.utilisateur.id);
      this.notifications = [];
    },
    async changePassword(){
      if (this.samePassword){
        let response = await usersService.changePassword(this.utilisateur.id, this.actualPassword, this.newPassword)
        alert(response.data)
        if (response.error === 0){
          this.clickModifyPassword()
          this.actualPassword = ''
          this.newPassword = ''
          this.samePassword = false
          this.strengthPercentage= 0
          this.strengthColor= 'red'
          this.actualPassword=''
          this.newPassword=''
          this.isPasswordVisible= false
          this.isPasswordVisible2= false
        }
      }

    }
  },
  async created(){
    await this.fetchUserReservations();
    await this.getNotificationByID(this.utilisateur.id)
    this.nom_utilisateur = this.utilisateur.nom
    this.email_utilisateur = this.utilisateur.email
    this.adresse_utilisateur = this.utilisateur.adresse
    this.telephone = this.utilisateur.numero
  },
};
</script>

<style scoped>
#app {
  display: flex;
}
.balade-details button{
  left : 80%;
}

.vertical-navbar {
  position: initial;
  margin-top: 5%;
  margin-left: 5%;
  width: 300px;
  height: 100%;
  background-color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  z-index: 0;
}


.nav-links {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
}

.nav-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 20px;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, transform 0.3s ease;
}

.nav-link:hover {
  background-color: #575757;
  transform: scale(1.1);
}

.notification-wrapper {
  display: flex;
  align-items: center;
  position: relative; /* Pour positionner les éléments correctement */
}

.notification-cloche {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-left: 8px;
  width: 25px;
  height: 25px;
}


.notification-cloche svg path{
  fill: white;
}

.main{
  margin-top: 4%;
  margin-left: 2%;
  width: 100%;
}

.personnal-info {
  position: relative;
  width: 100%;
  height: 300px;
  display: flex;
  flex-wrap: wrap;
}

.form-group {
  position: absolute;
  width: 45%;
  margin-top: 2%;
}

.form-group:nth-child(1) { /* Input dans le coin en haut à gauche */
  top: 0;
  left: 0;
}

.form-group:nth-child(2) { /* Input dans le coin en haut à droite */
  top: 0;
  right: 0;
}

.form-group:nth-child(3) { /* Input dans le coin en bas à gauche */
  bottom: 0;
  left: 0;
}

.form-group:nth-child(4) { /* Input dans le coin en bas à droite */
  bottom: 0;
  right: 0;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input {
  width: 70%;
  padding: 8px;
  box-sizing: border-box;
  font-size: large;
}



.main button {
  position: absolute;
  top: 5%;
  left: 59%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #555;
}

.main .second-button{
  margin-left: 7%;
}

.case {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin: 20px 0;
  position: relative;
}

.case h3 {
  margin-top: 0;
}
.case p{
  font-size: large;
}

.actuel-password,
.newpassword,
.verif{
  position: relative;
  width: 25%;

}
.password input{
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  font-size: large;
}
.password label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.password .password-icon{
  left: 90%;
  top: 40%;
}
.case .third-button{
  left: 64%;
}

.newpassword{
  margin-top: 2%;
}

.newpassword label{
  margin-top: 3%;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 5px;
}

.progress-fill {
  height: 100%;
  width: 0; /* La largeur est définie dynamiquement */
  transition: width 0.3s, background-color 0.3s;
}
.input-success {
  border-color: green;
  background-color: #e0f8e0;
}
.input-error {
  border-color: red;
  background-color: #f8e0e0;
}

.circle {
  width: 25px;
  height: 25px;
  background-color: #ffffff;
  color: black;
  align-content: center;
  align-items: center;
}


</style>
