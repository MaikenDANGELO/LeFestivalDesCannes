<template>
  <body>
  <div class="main">
    <div class="formulaire-evenement">
      <h2 class="title">{{ $t('prestataireTexts.title') }}</h2>
      <form @submit.prevent="submitForm">
        <!-- Champ Nom -->
        <div>
          <label for="nom">{{ $t('prestataireTexts.nom') }}</label>
          <input v-model="event.nom" id="nom" type="text" required />
        </div>

        <!-- Champ Nom en Anglais-->
        <div>
          <label for="nom_en">{{ $t('prestataireTexts.nom_en') }}</label>
          <input v-model="event.nom_en" id="nom_en" type="text" required />
        </div>

        <!-- Champ Description -->
        <div>
          <label for="description">{{ $t('prestataireTexts.description') }}</label>
          <textarea v-model="event.description" id="description" required></textarea>
        </div>

        <!-- Champ Description en anglais-->
        <div>
          <label for="description_en">{{ $t('prestataireTexts.description_en') }}</label>
          <textarea v-model="event.description_en" id="description_en" required></textarea>
        </div>

        <!-- Champ Description d'accueil -->
        <div>
          <label for="description_accueil">{{ $t('prestataireTexts.descriptionAccueil') }}</label>
          <textarea v-model="event.description_accueil" id="description_accueil" required></textarea>
        </div>

        <!-- Champ Description d'accueil en anglais -->
        <div>
          <label for="description_accueil_en">{{ $t('prestataireTexts.descriptionAccueil_en') }}</label>
          <textarea v-model="event.description_accueil_en" id="description_accueil_en" required></textarea>
        </div>

          <!-- Champ Catégorie -->
          <div>
            <label for="categorie">{{ $t('prestataireTexts.categorie') }}</label>
            <select v-model="event.categorie" id="categorie" required>
              <option v-for="categorie in categories" :key="categorie.id" :value="categorie.id">{{categorie.nom}}</option>
            </select>
          </div>

        <!-- Champ ID Emplacement -->
        <div>
          <label for="id_emplacement">{{ $t('prestataireTexts.idEmplacement') }}</label>
          <input v-model="event.id_emplacement" id="id_emplacement" type="text" required />
        </div>

        <!-- Champ Image -->
        <div>
          <label for="image">{{ $t('prestataireTexts.image') }}</label>
          <input type="file" id="image" @change="handleFileUpload" accept=".png, .jpeg, .jpg"/>
        </div>
        <div v-if="previewImage">
          <img :src="previewImage" :alt="$t('prestataireTexts.previewImageAlt')" style="max-width: 100%; margin-top: 10px;" />
        </div>

        <!-- Section Services -->
        <div class="services-section">
          <h3 class="underTitle">{{ $t('prestataireTexts.servicesSectionTitle') }}</h3>
          <div v-for="(service, index) in event.services" :key="service.id_service" class="service">
            <label>{{ $t('prestataireTexts.nomService') }}</label>
            <input v-model="service.nom_service" type="text" required />

            <label>{{ $t('prestataireTexts.descriptionService') }}</label>
            <input v-model="service.description_service" type="text" required />

            <label>{{ $t('prestataireTexts.lienService') }}</label>
            <input v-model="service.lien_service" type="text" required />

            <label>{{ $t('prestataireTexts.statutService') }}</label>
            <select v-model="service.statut_service" required>
              <option value="actif">{{ $t('prestataireTexts.statutActif') }}</option>
              <option value="inactif">{{ $t('prestataireTexts.statutInactif') }}</option>
            </select>

            <button @click="removeService(index)" type="button" class="service-button">{{ $t('prestataireTexts.supprimerService') }}</button>
          </div>
          <button type="button" @click="addService" class="add-service-button">{{ $t('prestataireTexts.ajouterService') }}</button>
        </div>

        <!-- Bouton de Soumission -->
        <button type="submit" class="submit-button">{{ $t('prestataireTexts.soumettre') }}</button>
      </form>
    </div>
  </div>
  </body>
</template>

<script>
import prestatairesService from "@/services/prestataires.service";
import {mapState} from "vuex";
export default {
  data() {
    return {
      event: {
        id: "",
        nom: "",
        nom_en: "",
        description: "",
        description_en : "",
        description_accueil: "",
        description_accueil_en : "",
        categorie: "",
        id_emplacement: "",
        image: null,
        services: [
          {
            id_service: "1",
            nom_service: "",
            description_service: "",
            lien_service: "",
            statut_service: "actif",
          },
        ],
      },
      previewImage: null,
    };
  },
  computed:{
    ...mapState('utilisateurs', ['utilisateur']),
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {

        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
          this.event.image = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Veuillez sélectionner une image au format PNG, JPEG ou JPG.');
      }
    },
    addService() {
      this.event.services.push({
        id_service: (this.event.services.length + 1).toString(),
        nom_service: "",
        description_service: "",
        lien_service: "",
        statut_service: "actif",
      });
    },
    removeService(index) {
      this.event.services.splice(index, 1);
    },
    async submitForm() {
      const response  = await prestatairesService.sendFormPrestataire({form:this.event, id_utilisateur:this.utilisateur.id})
      console.log(response)
      if (response.error === 0) {
        this.$router.push({name: "home"});
        alert("Formulaire soumis !");
      }
      else {
        alert(response.data)
      }
    },
  },
  async created() {
    const response = await prestatairesService.getAllCategorieService()
    this.categories = response.data
  }
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Jost', sans-serif;
  background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.formulaire-evenement {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 5px 20px 50px rgba(0, 0, 0, 0.5);
  width: 90%;
  max-width: 600px;
}

.title {
  color: #fff;
  text-align: center;
  font-size: 2em;
  margin-bottom: 20px;
}

.underTitle{
  color: #fff;
  text-align: left;
  font-size: 1.5em;
}

label {
  color: #fff;
  font-weight: bold;
  display: block;
  margin-top: 15px;
}

input,
textarea,
select{
  width: 90%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: none;
  background: #e0dede;
  outline: none;
}

button {
  width: 100%;
  padding: 10px;
  color: #fff;
  background-color: #573b8a;
  font-size: 1em;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  transition: background-color 0.2s;
  cursor: pointer;
  margin: 20px auto;
}

.submit-button:hover {
  background-color: #6d44b8;
}

.services-section {
  margin-top: 30px;
}

.service-button,
.add-service-button {
  background-color: #3498db;
}

.service-button:hover,
.add-service-button:hover {
  background-color: #2980b9;
}

textarea {
  resize: vertical;
}

.service {
  margin-top: 20px;
  padding: 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.service select{
  width: 95%;
}
</style>
