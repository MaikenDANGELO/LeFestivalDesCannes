<template>
  <div class="prestataire-detail" v-if="prestataire">
    <div class="image-container">
      <img class="animate-fade" :src="require(`@/assets/${prestataire.image}`)" alt="Logo du Prestataire">
    </div>
    <div class="info-container animate-slide">
      <h1>{{ prestataire.nom }}</h1>
      <p>{{ prestataire.description }}</p>
      <ul>
        <li><strong>Catégorie:</strong> {{ prestataire.categorie }}</li>
        <li><strong>Emplacement:</strong> {{ prestataire.id_emplacement }}</li>
      </ul>

      <div class="avis">
        <h2>Avis et commentaires</h2>
        <div v-if="utilisateur.estConnecte" class="avis-input">
          <h3>Envoyer un avis:</h3>
            <label for="note_input">Note: </label>
            <input id="note_input" type="number" max="5" min="0" v-model="user_note"><br>
            <label for="commentaire_input">Commentaire: </label>
            <input id="commentaire_input" type="text" v-model="user_comment">
            <button @click="sendCommentForm()">Envoyer</button>
        </div>
        <div v-else>Soyez connecté pour poster un avis</div><br>
        <h3>Avis des utilisateurs</h3>
        <div v-for="avis in this.avis_prestataire" :key="avis['id']">
          <h4>{{ getUtilisateur(avis['id_utilisateur'])['nom_utilisateur'] }} - {{ avis['note'] }}/5</h4>
          <p>{{ avis['texte'] }}</p>
        </div>
    </div>
    </div>
  </div>
  <div v-else>
    <p>Chargement des données...</p>
  </div>
</template>

<script>
import {prestataires, utilisateurs} from '@/datasource/data';
import {mapActions, mapState} from 'vuex';
import controller from "@/datasource/controller";

export default {
  name: "PrestataireDetail",
  data() {
    return {
      prestataire: null,
      user_note: 0,
      user_comment: "",
    };
  },
  methods:{

    ...mapActions(['getPrestataireAvis']),
    getUtilisateur(id){
      return utilisateurs.find(u => u['id_utilisateur'] === id);
    },
    // Envoie les données entrée dans le formulaire de commentaire sous forme d'événement
    sendCommentForm(){
      // Il faudra ajouter l'id de l'utilisateur courant lorsqu'il existera !
      let data = [this.prestataire['id'],this.user_note, this.user_comment, this.utilisateur.id];
      console.log(data);
      // Appeler la méthode pour insérer un commentaire ici -- à faire lorsque la connexion des utilisateurs sera implémentée.
      controller.sendAvisOfUser(data);
    }
  },
  computed: {
    ...mapState(['avis_prestataire', 'utilisateur']),
  },
  created() {
    const id = this.$route.params.id;
    this.prestataire = prestataires.find(p => p.id === id); // récupère le prestataire d'après l'id renseignée depuis la Page  principale
    this.getPrestataireAvis(this.prestataire['id']) // récupère les avis du prestataire
  },
};
</script>

<style scoped>
.prestataire-detail {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 16px;
}

.image-container {
  flex: 1;
  padding: 10px;
}

.image-container img {
  max-width: 75%;
  /* Réduire la taille de l'image */
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: opacity 0.5s ease-in-out;
  /* Animation */
}

.info-container {
  flex: 2;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: slideIn 0.5s forwards;
  /* Animation */
}

h1 {
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

ul li {
  margin-bottom: 5px;
  color: #666;
}

ul li strong {
  color: #333;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.animate-fade {
  animation: fadeIn 1s ease-in-out;
}

@keyframes slideIn {
  from {
    transform: translateX(-20px);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide {
  animation: slideIn 1s ease-in-out;
}
</style>