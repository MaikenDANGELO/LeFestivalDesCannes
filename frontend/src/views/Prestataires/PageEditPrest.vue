<template>
  <div class="edit-prestataire">
    <h1>Modifier les informations du prestataire</h1>
    <form @submit.prevent="updatePrestataire">
      <div class="form-group">
        <label for="nom">Nom</label>
        <input type="text" id="nom" v-model="prestataire.nom" class="form-control" required />
      </div>

      <!-- Description -->
      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="prestataire.description" class="form-control" required></textarea>
      </div>

      <!-- Description Accueil -->
      <div class="form-group">
        <label for="description_accueil">Description d'accueil</label>
        <input type="text" id="description_accueil" v-model="prestataire.description_accueil" class="form-control" />
      </div>

      <!-- Catégorie -->
      <div class="form-group">
        <label for="categorie">Catégorie</label>
        <input type="text" id="categorie" v-model="prestataire.categorie" class="form-control" required />
      </div>

      <!-- Image -->
      <div class="form-group">
        <label for="image">Image :</label>
        <input type="file" id="image" @change="handleFileUpload" accept=".png, .jpeg, .jpg"/>
      </div>
      <div v-if="previewImage">
        <img :src="previewImage" alt="Prévisualisation de l'image" class="preview-image" />
      </div>

      <h2>Services proposés</h2>
      <table v-if="prestataire.services.length" class="table-services">
        <thead>
          <tr>
            <th>Nom du service</th>
            <th>Description</th>
            <th>Lien</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(service, index) in prestataire.services" :key="index">
            <td>{{ service.nom_service }}</td>
            <td>{{ service.description_service }}</td>
            <td>{{ service.lien_service || '—' }}</td>
            <td>{{ service.statut_service }}</td>
            <td>
              <img src="@/assets/edit.png" @click="editService(index)" class="icon" alt="Modifier">
              <img src="@/assets/delete.png" @click="removeService(index)" class="icon" alt="Supprimer">
            </td>
          </tr>
        </tbody>
      </table>

      <div class="form-group">
        <button @click.prevent="addService" class="btn btn-success">
          Ajouter un service
        </button>
      </div>

      <h2>Types d'articles proposés</h2>
      <table v-if="prestataire.typesArticles.length" class="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Prix (€)</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(article, index) in prestataire.typesArticles" :key="index">
            <td>{{ article.nom }}</td>
            <td>{{ article.description }}</td>
            <td>{{ article.prix }}</td>
            <td>{{ article.statut }}</td>
            <td>
              <img src="@/assets/edit.png" @click="editArticleType(index)" class="icon" alt="Modifier">
              <img src="@/assets/delete.png" @click="removeArticleType(index)" class="icon" alt="Supprimer">
            </td>
          </tr>
        </tbody>
      </table>

      <div class="form-group">
        <button @click.prevent="addArticleType" class="btn btn-info">
          Ajouter un type d'article
        </button>
      </div>

      <div class="form-group">
        <button type="submit" class="btn btn-primary">Enregistrer</button>
      </div>
    </form>
  </div>
</template>


<script>
import { mapActions, mapState } from "vuex";
import PrestatairesService from "@/services/prestataires.service";

export default {
  data() {
    return {
      prestataire: {},
      previewImage: null
    };
  },
  computed: {
    ...mapState('utilisateurs', ['utilisateur']),
    ...mapState('prestataire', ['prestataires'])
  },
  methods: {
    ...mapActions('prestataire', ['getAllPrestataires']),
    
    async updatePrestataire() {
      let response = await PrestatairesService.changeDataPrestService(this.prestataire);
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
      this.$forceUpdate();
    },

    editService(index) {
      let service = this.prestataire.services[index];
      let newNom = prompt("Modifier le nom du service", service.nom_service);
      let newDesc = prompt("Modifier la description", service.description_service);
      let newLien = prompt("Modifier le lien", service.lien_service);
      let newStatut = prompt("Modifier le statut (actif/inactif)", service.statut_service);

      if (newNom !== null) service.nom_service = newNom;
      if (newDesc !== null) service.description_service = newDesc;
      if (newLien !== null) service.lien_service = newLien;
      if (newStatut !== null) service.statut_service = newStatut;

      this.$forceUpdate();
    },

    addArticleType() {
      this.prestataire.typesArticles.push({
        nom: "",
        description: "",
        prix: 0,
        statut: "actif"
      });
      this.$forceUpdate();
    },

    removeArticleType(index) {
      this.prestataire.typesArticles.splice(index, 1);
      this.$forceUpdate();
    },

    editArticleType(index) {
      let article = this.prestataire.typesArticles[index];
      let newNom = prompt("Modifier le nom", article.nom);
      let newDesc = prompt("Modifier la description", article.description);
      let newPrix = prompt("Modifier le prix", article.prix);

      if (newNom !== null) article.nom = newNom;
      if (newDesc !== null) article.description = newDesc;
      if (newPrix !== null) article.prix = parseFloat(newPrix);

      this.$forceUpdate();
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
        this.prestataire.image = file;

        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Veuillez sélectionner une image au format PNG, JPEG ou JPG.');
      }
    }
  },

  mounted() {
    this.prestataire = this.prestataires.find(prestataire => prestataire.id_utilisateur === this.$route.params.id);
    this.previewImage = require("@/assets/ImagesPrestataires/" + this.prestataire.image);
    
    if (!this.prestataire.typesArticles) {
      this.prestataire.typesArticles = [];
    }
  }
};
</script>


<style scoped>
.edit-prestataire {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  max-width: 900px;
  margin: auto;
}

/* Espacement amélioré entre les boutons */
.form-group button {
  margin-right: 10px;
  margin-bottom: 10px; 
}

/* Image de prévisualisation réduite */
.preview-image {
  max-width: 200px;
  height: auto;
  display: block;
  margin-top: 10px;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
}

.table, .table-services {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.table th, .table td, 
.table-services th, .table-services td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

.table th, .table-services th {
  background-color: #f8f9fa;
  color: #333;
  font-weight: bold;
}

.table tr:nth-child(even), .table-services tr:nth-child(even) {
  background-color: #f2f2f2;
}

.icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: transform 0.2s;
  margin-left: 8px;
}

.icon:hover {
  transform: scale(1.1);
}

/* Champs de formulaire */
input, textarea, select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover {
  background-color: #218838;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-info:hover {
  background-color: #138496;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

</style>