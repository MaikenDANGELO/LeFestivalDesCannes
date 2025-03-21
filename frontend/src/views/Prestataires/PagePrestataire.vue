<template>
  <div class="container">
    <div class="carte">
      <InteractiveMap :selectedPrestataireId="parseInt(prestataire.id)" @new-location="onNewLocation"/>
    </div>

    <div class="texte-container">
      <div class="prestataire-detail" v-if="prestataire !== null">
        <div class="image-container">
          <img class="animate-fade" :src="require(`@/assets/ImagesPrestataires/${prestataire.image}`)" alt="Logo du Prestataire">
          <div class="images-balade" v-if="prestataire.id === '8'">
            <img class="animate-fade" :src="require(`@/assets/ImagesBalade/img1.jpg`)" alt="balade1">
            <img class="animate-fade" :src="require(`@/assets/ImagesBalade/img2.jpg`)" alt="balade2">
            <img class="animate-fade" :src="require(`@/assets/ImagesBalade/img3.jpg`)" alt="balade3">
            <img class="animate-fade" :src="require(`@/assets/ImagesBalade/img4.jpg`)" alt="balade4">
            <img class="animate-fade" :src="require(`@/assets/ImagesBalade/img5.jpg`)" alt="balade5">
          </div>
        </div>
        <div class="info-container animate-slide">
          <h1>{{ prestataire.nom }}</h1>
          <p>{{ prestataire.description }}</p>
          <ul>
            <li><strong>Catégorie:</strong> {{ prestataire.categorie }}</li>
            <li><strong>Emplacement:</strong> {{ prestataire.id_emplacement }}</li>
          </ul>

          <div class="messageToAdmin" v-if="this.utilisateur.role === 'admin'">
            <p>Cliquer sur la carte pour changer l'emplacement du prestataire</p>
          </div>

          <button v-if="isEditingLocation" @click="confirmNewLocation">Modifier l'emplacement</button>




          <div class="restaurant-menu" v-if="prestataire.id  === 2">
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
              <div class="group" :class="{ 'has-value': user_comment }">
                <input class="input_comment" id="commentaire_input" type="text" v-model="user_comment">
                <span class="highlight"></span>
                <span class="bar"></span>
                <label for="commentaire_input">Commentaire: </label>
              </div>
              <button @click="sendCommentForm()">Envoyer</button>
            </div>
            <div v-else>Soyez connecté(e) pour poster un avis</div><br>
            <h3>Avis des utilisateurs</h3>
            <div v-if="Array.isArray(avis_prestataire) && avis_prestataire.length > 0">
              <div v-for="(avis) in avis_prestataire" :key="avis['id']" >
                <h4>{{ getUtilisateur(avis['id_utilisateur'])?.nom_utilisateur || 'Utilisateur inconnu' }} - {{ avis['note'] }}/5</h4>
                <p>{{ avis['texte'] }}</p>
                <div class="avisButton">
                  <button v-if="(avis['id_utilisateur'] === utilisateur.id || utilisateur.role === 'admin')" @click="deleteAvis(avis['id'])">Supprimer</button>
                  <button v-if="avis['id_utilisateur'] === utilisateur.id" @click="modifyAvis(avis.id, avis['note'], avis['texte'])">Modifier</button>
                </div>
              </div>
            </div>
            <div v-else>
              <p>Aucun avis pour le moment</p>
            </div>
          </div>
          <div v-if="this.prestataire.id === 6 ">
            <h2>Classement du concours</h2>
            <div class="classement">
              <div class="classement-place" v-for="(pl) of classement" :key="pl.id_classement">
                <p>{{ pl.place }} - {{ getUserFromClassement(pl.id_participant).nom_utilisateur }}</p>
              </div>
            </div>
          </div>

          <div v-if="this.prestataire.id  === 8">
            <h2>Balades</h2>
            <p v-if="this.utilisateur.role === ''">Veuillez être enregistré pour réserver une balade</p>

           <input type="date" id="date" v-model="day" @change="fetchBalades" min="2025-09-01" max="2025-09-03" >


            <ul>
              <li v-for="balade in balades" :key="balade.id_balade" class="balade-item">
                <div class="balade-details">
                  <p>Ballade le {{ balade.date }} à {{ balade.heure }}</p>
                </div>
                <div class="balade-actions">
                  <div v-if="utilisateur.role === 'utilisateur'">
                    <p v-if="balade.reserved_user_id !== utilisateur.id && balade.reserved_user_id !== null" class="indisponible">indisponible</p>
                    <button v-if="balade.reserved_user_id === null" @click="reserverBalade(balade.id, utilisateur.id)" class="btn reserver">Réserver</button>
                  </div>
                  <p v-if="utilisateur.role === 'admin' && balade.reserved_user_id !== null">Réservée par {{ getUtilisateur(balade.reserved_user_id).nom_utilisateur || 'Utilisateur inconnu' }}</p>
                  <button v-if="balade.reserved_user_id === utilisateur.id || (utilisateur.role === 'admin' && balade.reserved_user_id !== null)" @click="cancelBalade(balade.id)" class="btn annuler">Annuler</button>
                  <p v-if="balade.reserved_user_id === null">Aucune réservation</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="services" v-if="prestataire.services && prestataire.services.length">
            <h2>Services proposés</h2>
            <ul>
              <li v-for="service in prestataire.services" :key="service.id_service">
                <div v-if="service.statut_service">
                  <strong>{{ service.nom_service }}</strong>
                  <p>{{ service.description_service }}</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
      <div v-else>
        <p>Chargement des données...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import prestatairesService from "@/services/prestataires.service";
import moneyService from "@/services/money.service";
import usersService from "@/services/users.service";
import baladesServices from "@/services/balades.services";
import InteractiveMap from "@/components/CarteInteractive2.vue";
import mapDataService from "@/services/map_data.service";

export default {
  name: "PrestataireDetail",
  components: {
    InteractiveMap,
  },
  data() {
    return {
      isEditingLocation : false,
      newCoords : null,
      day: "2025-09-01",
      balades: [],
      classement: [],
      prestataire: null,
      user_note: 0,
      user_comment: null,
      montantDons: 0,
      avisMofication: false,
      idAvisModification: null,
    };
  },
  computed: {
    ...mapState('utilisateurs', ['utilisateur', 'utilisateurs']),
    ...mapState('prestataire', ["avis_prestataire", "prestataires"]),
  },
  methods: {
    ...mapActions('prestataire', ['getPrestataireAvis', 'getAllPrestataires', 'makeReservation']),
    ...mapActions('utilisateurs', ['getAllUsers']),

    onNewLocation(coords) {
      if (this.utilisateur.role === 'admin') {
        this.isEditingLocation = true; // Active l'affichage du bouton
        this.newCoords = coords; // Stocke les nouvelles coordonnées
      }
    },

    async updatePrestaEmplacement(lat, lng) {
      if (!this.prestataire || !this.prestataire.id) {
        return;
      }

      await mapDataService.updateEmplacement(this.prestataire.id, [lat, lng]);

      window.confirm("Emplacement modifié avec succès")
      if (this.$route.path !== `/prestataire/${this.prestataire.id}`) {
        await this.$router.push(`/prestataire/${this.prestataire.id}`);
      } else {
        await this.loadPrestataireData(this.prestataire.id);
      }
    },

    async confirmNewLocation() {
      if (this.newCoords && this.prestataire) {
        await this.updatePrestaEmplacement(this.newCoords.lat, this.newCoords.lng);
        this.isEditingLocation = false; // Cache le bouton après la mise à jour
      }
    },

    compareClassement(a,b){
      return a.place - b.place;
    },
    async getClassementConcours(){
      let classement = await prestatairesService.getAllClassementConcours();
      this.classement = classement.data.filter(e => e.concours === "cuisine");
      this.classement.sort(this.compareClassement);
    },
    getUserFromClassement(id){
      return this.utilisateurs.find(e => e.id_utilisateur === parseInt(id));
    },
    async reserverBalade(id, uid) {
      await baladesServices.reservebalade(id, uid);
      await this.fetchBalades();
    },
    async cancelBalade(id) {
      await baladesServices.cancelbalade(id);
      await this.fetchBalades();
    },
    async fetchBalades() {
      const response = await baladesServices.getAllBalades();
      if (response.error === 0) {
        this.balades = response.data.filter(balade => balade.date.slice(0, 10) === this.day);
      } else {
        console.error("Erreur lors du chargement des balades :", response.data);
      }
    },
    getUtilisateur(id) {
      return this.utilisateurs.find(u => u.id === id);
    },
    async sendCommentForm() {
      const data = [this.prestataire['id'], this.user_note, this.user_comment, this.utilisateur.id];
      if (this.avisMofication) {
        await usersService.modifyAvis(data, this.idAvisModification);
        this.avisMofication = false;
        this.idAvisModification = null;
      } else {
        await prestatairesService.sendAvisOfUser(data);
      }
      this.user_comment = '';
      this.user_note = 0;
      await this.getPrestataireAvis(this.prestataire['id']);
    },
    makeDonation() {
      const id = this.$route.params.id;
      this.$router.push('/dons/' + id);
    },
    async getDonationAmount() {
      let r = await moneyService.getTotalDonsOf(this.prestataire.id)
      if (r.error === 0) this.montantDons = r.data;
    },
    async deleteAvis(id) {
      await usersService.deleteAvis(id);
      await this.getPrestataireAvis(this.prestataire['id']);
    },
    modifyAvis(id, note, texte) {
      const target = document.getElementById("rating");
      this.user_comment = texte;
      this.user_note = note;
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        this.avisMofication = true;
        this.idAvisModification = id;
      }
    },
    async loadPrestataireData(id) {
      this.prestataire = this.prestataires.find(p => p.id === Number(id));
      if (this.prestataire) {
        await this.getPrestataireAvis(this.prestataire.id);
        await this.getDonationAmount();
        await this.fetchBalades();

      }
    },
  },
  async created() {
    await this.getAllPrestataires();
    await this.getAllUsers();
    await this.loadPrestataireData(this.$route.params.id);
    await this.getClassementConcours();
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler(newId) {
        this.loadPrestataireData(newId);
      }
    }
  }
};
</script>

<style scoped>

body {
  font-family: 'Roboto', Arial, sans-serif;
  background-color: #F5F5F5;
  color: #333333;
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
}

.carte, .texte-container {
  flex: 1 1 48%;
  margin: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  background: white;
}

.image-container img {
  width: 100%;
  border-radius: 8px;
}

.restaurant-menu .dish {
  font-weight: bold;
  color: #0056D2;
}

.restaurant-menu .price {
  font-weight: bold;
  float: right;
  color: #FFA726;
}



button {
  background-color: #0056D2;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #003E99;
}

.avis, .dons, .classement, .services {
  margin-top: 20px;
  padding: 10px;
  background: #FAFAFA;
  border-radius: 8px;
}



.avis .avis-input {
  padding-bottom: 20px;
}

.animate-fade {
  animation: fadeIn 0.8s ease-in-out;
}

.animate-slide {
  animation: slideIn 1s ease-in-out;
}



@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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

.group 			  {
  position:relative;
  margin-bottom:45px;
}

.input_comment 				{
  font-size:18px;
  padding:10px 10px 10px 5px;
  display:block;
  width:300px;
  border:none;
  border-bottom:1px solid #757575;
}
.input_comment:focus{ outline:none; }

/* LABEL ======================================= */
.group label 				 {
  color:#999;
  font-size:18px;
  font-weight:normal;
  position:absolute;
  pointer-events:none;
  left:5px;
  top:10px;
  transition:0.2s ease all;
  -moz-transition:0.2s ease all;
  -webkit-transition:0.2s ease all;
}

/* active state */
.group.has-value label,
.input_comment:focus ~ label 		{
  top:-20px;
  font-size:14px;
  color:#5264AE;
}

/* BOTTOM BARS ================================= */
.bar 	{ position:relative; display:block; width:300px; }
.bar:before, .bar:after 	{
  content:'';
  height:2px;
  width:0;
  bottom:1px;
  position:absolute;
  background:#5264AE;
  transition:0.2s ease all;
  -moz-transition:0.2s ease all;
  -webkit-transition:0.2s ease all;
}
.bar:before {
  left:50%;
}
.bar:after {
  right:50%;
}

/* active state */
.input_comment:focus ~ .bar:before, .input_comment:focus ~ .bar:after {
  width:50%;
}

/* HIGHLIGHTER ================================== */
.highlight {
  position:absolute;
  height:60%;
  width:100px;
  top:25%;
  left:0;
  pointer-events:none;
  opacity:0.5;
}

/* active state */
.input_comment:focus ~ .highlight {
  -webkit-animation:inputHighlighter 0.3s ease;
  -moz-animation:inputHighlighter 0.3s ease;
  animation:inputHighlighter 0.3s ease;
}

/* ANIMATIONS ================ */
@-webkit-keyframes inputHighlighter {
  from { background:#5264AE; }
  to 	{ width:0; background:transparent; }
}
@-moz-keyframes inputHighlighter {
  from { background:#5264AE; }
  to 	{ width:0; background:transparent; }
}
@keyframes inputHighlighter {
  from { background:#5264AE; }
  to 	{ width:0; background:transparent; }
}

</style>