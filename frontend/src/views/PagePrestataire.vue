<template>
  <body>
    <div class="prestataire-detail" v-if="prestataire !== null">
      <div class="image-container">
        <img class="animate-fade" :src="require(`@/assets/ImagesPrestataires/${prestataire.image}`)" alt="Logo du Prestataire">
        <div class="images-balade" v-if="prestataire.id === '8'">
          <img class="animate-fade" :src="require(`@/assets/ImagesBalade/img1.jpg`)" alt="image balade1">
          <img class="animate-fade" :src="require(`@/assets/ImagesBalade/img2.jpg`)" alt="image balade1">
          <img class="animate-fade" :src="require(`@/assets/ImagesBalade/img3.jpg`)" alt="image balade1">
          <img class="animate-fade" :src="require(`@/assets/ImagesBalade/img4.jpg`)" alt="image balade1">
          <img class="animate-fade" :src="require(`@/assets/ImagesBalade/img5.jpg`)" alt="image balade1">
      </div>
      </div>
      <div class="info-container animate-slide">
        <h1>{{ prestataire.nom }}</h1>
        <p>{{ prestataire.description }}</p>
        <ul>
          <li><strong>Catégorie:</strong> {{ prestataire.categorie }}</li>
          <li><strong>Emplacement:</strong> {{ prestataire.id_emplacement }}</li>
        </ul>
        <div class="restaurant-menu" v-if="prestataire.id === '2'">
          <h2>Horaires</h2>
          <ul>
            <li>Lundi : Fermé</li>
            <li>Mardi à Vendredi : 12h - 14h30 / 19h - 22h</li>
            <li>Samedi : 12h - 15h / 19h - 23h</li>
            <li>Dimanche : 12h - 16h</li>
          </ul>
          <h2>Menu</h2>
          <ul>
            <li>
              <span class="dish">Salade de Canard Fumé</span>
              <span class="price">12€</span>
              <p>Délicieux morceaux de canard fumé, servis sur un lit de roquette et de noix.</p>
            </li>
            <li>
              <span class="dish">Confit de Canard</span>
              <span class="price">18€</span>
              <p>Un classique savoureux, accompagné de pommes de terre sautées et de légumes de saison.</p>
            </li>
            <li>
              <span class="dish">Magret de Canard Sauce Orange</span>
              <span class="price">22€</span>
              <p>Magret de canard tendre, nappé d'une sauce à l'orange maison.</p>
            </li>
            <li>
              <span class="dish">Burger du Canard</span>
              <span class="price">15€</span>
              <p>Pain artisanal, effiloché de canard, et une touche de foie gras.</p>
            </li>
            <li>
              <span class="dish">Tarte Tatin aux Pommes et Canard</span>
              <span class="price">8€</span>
              <p>Un dessert audacieux combinant pommes caramélisées et effiloché de canard.</p>
            </li>
          </ul>
        </div>
        <div class="dons">
          <h2>Dons</h2>
          <div>
            <p class="total-dons-presta">Dons reçus: {{ montantDons }}€</p>
          </div>
          <div v-if="utilisateur.role === 'utilisateur'">
            <button @click="makeDonation()" class="make-donation">Faire un don</button>
          </div>
          <div v-else>
            <p>Vous devez être connecté(e) pour faire un don.</p>
          </div>
        </div>
        <div class="avis">
          <h2>Avis et commentaires</h2>
          <div v-if="utilisateur.role === 'utilisateur'" class="avis-input">
            <h3>Envoyer un avis:</h3>
            <div class="rating" id="rating">
              <input type="radio" name="rating" id="rating-5" v-model="user_note" value=5>
              <label for="rating-5"></label>

              <input type="radio" name="rating" id="rating-4" v-model="user_note" value=4>
              <label for="rating-4"></label>

              <input type="radio" name="rating" id="rating-3" v-model="user_note" value=3>
              <label for="rating-3"></label>

              <input type="radio" name="rating" id="rating-2" v-model="user_note" value=2>
              <label for="rating-2"></label>

              <input type="radio" name="rating" id="rating-1" v-model="user_note" value=1>
              <label for="rating-1"></label>
            </div><br>
            <label for="commentaire_input">Commentaire: </label>
            <input id="commentaire_input" type="text" v-model="user_comment">
            <button @click="sendCommentForm()">Envoyer</button>
          </div>
          <div v-else>Soyez connecté(e) pour poster un avis</div><br>
          <h3>Avis des utilisateurs</h3>
          <div v-for="(avis,index) in this.avis_prestataire" :key="avis['id']">
            <h4>{{ getUtilisateur(avis['id_utilisateur'])['nom_utilisateur'] }} - {{ avis['note'] }}/5</h4>
            <p>{{ avis['texte'] }}</p>
            <div class="avisButton">
              <button v-if="(avis['id_utilisateur'] === utilisateur.id || utilisateur.role === 'admin')" @click="deleteAvis(avis['id_commentaire'])">Supprimer</button>
              <button v-if="avis['id_utilisateur'] === utilisateur.id" @click="modifyAvis(index + 1,  avis['note'], avis['texte']  )">Modifier</button>
            </div>
          </div>
        </div>
        <div v-if="prestataire.id === '8'">

          <h2>Balades</h2>
          <ul>
            <li v-for="balade in balades" :key="balade.id_balade" class="balade-item">
              <div class="balade-details">
                <p>Ballade le {{balade.date_balade}} à {{balade.heure_balade}}</p>
              </div>
              <div v-if="utilisateur.role !== 'prestaire'" class="balade-actions">
                <div v-if="utilisateur.role === 'utilisateur'">
                  <p v-if="balade.reserved_user_id !== utilisateur.id && balade.reserved_user_id !== null" class="indisponible">indisponible</p>
                  <button v-if="balade.reserved_user_id === null" @click="reserverBalade(balade.id_balade, utilisateur.id)" class="btn reserver">Réserver</button>
                </div>
                <p v-if="utilisateur.role === 'admin' && balade.reserved_user_id !== null">Réservée par {{ getUtilisateur(balade.reserved_user_id).nom_utilisateur }}</p>
                <button v-if="balade.reserved_user_id === utilisateur.id || (utilisateur.role === 'admin' && balade.reserved_user_id !== null)" @click="cancelBalade(balade.id_balade)" class="btn annuler">Annuler</button>
                <p v-else>Aucune réservation</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Chargement des données...</p>
    </div>
  </body>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import prestatairesService from "@/services/prestataires.service";
import moneyService from '@/services/money.service';
import usersService from "@/services/users.service";
import baladesServices from "@/services/balades.services";


export default {
  name: "PrestataireDetail",
  data() {
    return {
      balades: [],
      prestataire: null,
      user_note: 0,
      user_comment: "",
      montantDons: 0,
      avisMofication:false,
      idAvisModification:null,
    };
  },
  computed: {
    ...mapState('utilisateurs', ['utilisateur', 'utilisateurs']),
    ...mapState('prestataire', ["avis_prestataire", "prestataires"]),
  },
  methods: {
    ...mapActions('prestataire', ['getPrestataireAvis', 'getAllPrestataires']),
    ...mapActions('utilisateurs', ['getAllUsers']),
    async reserverBalade(id,uid){
      console.log(id,uid)
      await baladesServices.reservebalade(id, uid);
      await this.fetchBalades();
    },
    async cancelBalade(id){
      //console.log('Annulation de la balade '+id)
      await baladesServices.cancelbalade(id);
      await this.fetchBalades();
    },
    async fetchBalades() {
      try {
        const response = await baladesServices.getAllBalades();
        if (response.error === 0) {
          this.balades = response.data;
        } else {
          console.error("Erreur lors du chargement des balades :", response.data);
        }
      } catch (error) {
        console.error("Impossible de récupérer les balades :", error.message);
      }
    },
    getUtilisateur(id) {
      return this.utilisateurs.find(u => u['id_utilisateur'] === id);
    },
    // Envoie les données entrée dans le formulaire de commentaire sous forme d'événement
    async sendCommentForm() {
      let data = [this.prestataire['id'], this.user_note, this.user_comment, this.utilisateur.id];
      if (this.avisMofication){
        await usersService.modifyAvis(data, this.idAvisModification)
        this.avisMofication = false;
        this.idAvisModification = null;
      }else{
        await prestatairesService.sendAvisOfUser(data);
      }
      this.user_comment = ''
      this.user_note = 0;
      await this.getPrestataireAvis(this.prestataire['id']);
    },
    makeDonation() {
      const id = this.$route.params.id;
      this.$router.push('/dons/' + id)
    },
    async getDonationAmount(){
      this.montantDons = await moneyService.getTotalDonsOf(this.prestataire.id);
      this.montantDons = this.montantDons['data']
    },
    async deleteAvis(id){
      await usersService.deleteAvis(id)
      await this.getPrestataireAvis(this.prestataire['id']);
    },
    modifyAvis(id, note, texte) {
      const target = document.getElementById("rating"); // Trouver l'élément cible
      this.user_comment = texte;
      this.user_note = note;
      console.log(this.user_comment)
      console.log(this.user_note)
      console.log(id)
      console.log(this.avis_prestataire)
      if (target) {
        target.scrollIntoView({ behavior: "smooth" }); // Défilement fluide
        this.avisMofication = true;
        this.idAvisModification = id;
      }
    },
    async loadPrestataireData(id) {
      this.prestataire = this.prestataires.find(p => p.id === id);
      if (this.prestataire) {
        await this.getPrestataireAvis(this.prestataire.id);
        await this.getDonationAmount();
        await this.fetchBalades();
      }
    },
  },
  async created() {
    this.getAllPrestataires();
    this.getAllUsers();
    this.loadPrestataireData(this.$route.params.id);

  },
  mounted: function () {
    if (!this.prestataires) window.location.reload();
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler(newId) {
        this.loadPrestataireData(newId);
      }
    }
  },
};
</script>

<style scoped>

/* Ensures each balade item is displayed on the same line */
.balade-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  margin-right: 50%;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}

/* Balade details (left-aligned) */
.balade-details {
  flex: 1;
}

/* Align actions (indisponible message and buttons) in one row */
.balade-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

/* Style for the unavailable message */
.indisponible {
  color: rgb(122, 122, 122);
  margin-right: 10px;
}

/* Button styles */
.btn {
  padding: 5px 10px;
  cursor: pointer;
}

.reserver {
  background-color: rgba(0, 128, 0, 0.46);
  color: white;
  border: none;
}

.annuler {
  background-color: rgba(255, 0, 0, 0.51);
  color: white;
  border: none;
}

.reserver:hover,
.annuler:hover {
  opacity: 0.8;
}

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

.images-balade{
  display: flex;
  flex-direction: row;
  height: 50vh;
  overflow-x: scroll;
  gap: 2%;
  box-shadow: 0px 0px 20px black;
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


.rating {
  display: flex;
  width: 100%;
  justify-content: left;
  overflow: hidden;
  flex-direction: row-reverse;
  position: relative;
}

.rating>input {
  display: none;
}

.rating>label {
  cursor: pointer;
  width: 40px;
  height: 40px;
  margin-top: auto;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='126.729' height='126.73'%3e%3cpath fill='%23e3e3e3' d='M121.215 44.212l-34.899-3.3c-2.2-.2-4.101-1.6-5-3.7l-12.5-30.3c-2-5-9.101-5-11.101 0l-12.4 30.3c-.8 2.1-2.8 3.5-5 3.7l-34.9 3.3c-5.2.5-7.3 7-3.4 10.5l26.3 23.1c1.7 1.5 2.4 3.7 1.9 5.9l-7.9 32.399c-1.2 5.101 4.3 9.3 8.9 6.601l29.1-17.101c1.9-1.1 4.2-1.1 6.1 0l29.101 17.101c4.6 2.699 10.1-1.4 8.899-6.601l-7.8-32.399c-.5-2.2.2-4.4 1.9-5.9l26.3-23.1c3.8-3.5 1.6-10-3.6-10.5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 76%;
  transition: .3s;
}

.rating>input:checked~label,
.rating>input:checked~label~label {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='126.729' height='126.73'%3e%3cpath fill='%23fcd93a' d='M121.215 44.212l-34.899-3.3c-2.2-.2-4.101-1.6-5-3.7l-12.5-30.3c-2-5-9.101-5-11.101 0l-12.4 30.3c-.8 2.1-2.8 3.5-5 3.7l-34.9 3.3c-5.2.5-7.3 7-3.4 10.5l26.3 23.1c1.7 1.5 2.4 3.7 1.9 5.9l-7.9 32.399c-1.2 5.101 4.3 9.3 8.9 6.601l29.1-17.101c1.9-1.1 4.2-1.1 6.1 0l29.101 17.101c4.6 2.699 10.1-1.4 8.899-6.601l-7.8-32.399c-.5-2.2.2-4.4 1.9-5.9l26.3-23.1c3.8-3.5 1.6-10-3.6-10.5z'/%3e%3c/svg%3e");
}


.rating>input:not(:checked)~label:hover,
.rating>input:not(:checked)~label:hover~label {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='126.729' height='126.73'%3e%3cpath fill='%23d8b11e' d='M121.215 44.212l-34.899-3.3c-2.2-.2-4.101-1.6-5-3.7l-12.5-30.3c-2-5-9.101-5-11.101 0l-12.4 30.3c-.8 2.1-2.8 3.5-5 3.7l-34.9 3.3c-5.2.5-7.3 7-3.4 10.5l26.3 23.1c1.7 1.5 2.4 3.7 1.9 5.9l-7.9 32.399c-1.2 5.101 4.3 9.3 8.9 6.601l29.1-17.101c1.9-1.1 4.2-1.1 6.1 0l29.101 17.101c4.6 2.699 10.1-1.4 8.899-6.601l-7.8-32.399c-.5-2.2.2-4.4 1.9-5.9l26.3-23.1c3.8-3.5 1.6-10-3.6-10.5z'/%3e%3c/svg%3e");
}
</style>