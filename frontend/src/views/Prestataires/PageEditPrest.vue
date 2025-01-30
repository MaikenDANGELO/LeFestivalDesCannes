<template>
  <div class="edit-prestataire">
    <h1>Modifier les informations du prestataire</h1>
    <form @submit.prevent="updatePrestataire">
      <!-- Nom -->
      <div class="form-group">
        <label for="nom">Nom</label>
        <input
            type="text"
            id="nom"
            v-model="prestataire.nom"
            class="form-control"
            required
        />
      </div>

      <!-- Description -->
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
            id="description"
            v-model="prestataire.description"
            class="form-control"
            required
        ></textarea>
      </div>

      <!-- Description Accueil -->
      <div class="form-group">
        <label for="description_accueil">Description d'accueil</label>
        <input
            type="text"
            id="description_accueil"
            v-model="prestataire.description_accueil"
            class="form-control"
        />
      </div>

      <!-- Catégorie -->
      <div class="form-group">
        <label for="categorie">Catégorie</label>
        <input
            type="text"
            id="categorie"
            v-model="prestataire.categorie"
            class="form-control"
            required
        />
      </div>

      <!-- Image -->
      <div class="form-group">
          <label for="image">Image :</label>
          <input type="file" id="image" @change="handleFileUpload" accept=".png, .jpeg, .jpg"/>
      </div>
      <div v-if="previewImage">
        <img :src="previewImage" alt="Prévisualisation de l'image" style="max-width: 100%; margin-top: 10px;" />
      </div>

      <!-- Services -->
      <div v-for="(service, index) in prestataire.services" :key="service.id_service" class="service-form-group">
        <h3>Service {{ index + 1 }}</h3>
        <div class="form-group">
          <label :for="'service-name-' + index">Nom du service</label>
          <input
              type="text"
              :id="'service-name-' + index"
              v-model="service.nom_service"
              class="form-control"
              required
          />
        </div>

        <div class="form-group">
          <label :for="'service-description-' + index">Description</label>
          <textarea
              :id="'service-description-' + index"
              v-model="service.description_service"
              class="form-control"
              required
          ></textarea>
        </div>

        <div class="form-group">
          <label :for="'service-link-' + index ">Lien du service</label>
          <input
              type="text"
              :id="'service-link-' + index"
              v-model="service.lien_service"
              class="form-control"
          />
        </div>

        <div class="form-group">
          <label :for="'service-status-' + index">Statut</label>
          <select
              :id="'service-status-' + index"
              v-model="service.statut_service"
              class="form-control"
          >
            <option value="actif">Actif</option>
            <option value="inactif">Inactif</option>
          </select>
        </div>

        <!-- Button to remove the service -->
        <button @click.prevent="removeService(index)" v-if="prestataire.services.length > 1" class="btn btn-danger">
          Supprimer le service
        </button>
      </div>

      <!-- Button to add a new service -->
      <div class="form-group">
        <button @click.prevent="addService" class="btn btn-success">
          Ajouter un service
        </button>
      </div>

      <!-- Save button -->
      <div class="form-group">
        <button type="submit" class="btn btn-primary">Enregistrer</button>
      </div>
    </form>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import PrestatairesService from "@/services/prestataires.service";

export default {
  data() {
    return {
      prestataire: {},
      previewImage: null
    };
  },
  computed:{
    ...mapState('utilisateurs', ['utilisateur']),
    ...mapState('prestataire', ['prestataires'])
  },
  methods: {
    ...mapActions('prestataire', ['getAllPrestataires']),
    async updatePrestataire() {
      let response = await PrestatairesService.changeDataPrestService(this.prestataire)
      if (response.error === 0) {
        await this.getAllPrestataires();
      }
      alert(response.data);

    },
    addService() {
      this.prestataire.services.push({
        id_service: "",
        nom_service: "",
        description_service: "",
        lien_service: "",
        statut_service: "actif"
      });
    },
    removeService(index) {
      this.prestataire.services.splice(index, 1);
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
        this.event.image = file;

        // Générer une prévisualisation de l'image
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Veuillez sélectionner une image au format PNG, JPEG ou JPG.');
      }
    },
  },
  mounted() {
    this.prestataire = this.prestataires.find(prestataire => prestataire.id_utilisateur === this.$route.params.id);
    this.previewImage = require("@/assets/ImagesPrestataires/" + this.prestataire.image);
  }
};
</script>

<style scoped>
.edit-prestataire {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 15px;
}

input, textarea, select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}

button {
  margin-top: 10px;
}
</style>
