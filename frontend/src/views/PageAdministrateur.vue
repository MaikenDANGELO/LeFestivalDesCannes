<template>
    <div>
        <h1 style="text-align: center;">Page d'administration</h1>
        <div class="switch-admin">
            <button @click="handleShowPrestataires()"><h2>Prestataires</h2></button>
            <button @click="handleShowSponsors()"><h2>Sponsors</h2></button>
            <button @click="handleShowAssociations()"><h2>Associations</h2></button>
            <button @click="handleShowDemandes()"><h2>Demande Prestaires</h2></button>
        </div>
        <div v-if="showPrestataires" class="list-prestataires">
            <h2>Prestataires <button @click="getAllPrestataires()">Refresh</button></h2>
            <div class="prestataire" v-for="prestataire in prestataires" :key="prestataire.id">
                <div class="presta-top"><h3>{{ prestataire.nom }}</h3></div>
                <div class="presta-sbody">
                    <div class="presta-body">
                        <div class="presta-icon">
                            <img class="prestataire-img" alt="prestimg" :src="require(`../assets/ImagesPrestataires/${prestataire.image}`)" />
                        </div>
                        <div class="presta-text">{{ prestataire.description_accueil }}</div>
                        <div class="presta-actions">
                            <div class="prest-actions-btn">
                                <button @click="handlePrestaGoToPage(prestataire.id)">Accéder à la page</button>
                                <button>Modifier prestataire</button>
                                <button>Supprimer prestataire</button>
                            </div>
                            <div class="prest-actions-emplacement">
                                <p>Emplacement actuel: {{ prestataire.id_emplacement }}</p>
                                <label for="emplacement">Modifier </label><input id="emplacement" placeholder="Ex: 3" v-model="emplacementsPrestataire[prestataire.id-1]">
                                <button @click="handleModifyEmplacementPrestataire((prestataire.id),emplacementsPrestataire[(prestataire.id)-1])">Valider</button>
                            </div>
                            <div class="prest-dons">
                                <p>Total des dons: {{ montantDons[prestataire.id-1] }}€</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showPrestataires" class="list-prestataires">
            <h2>Prestataires <button @click="getAllPrestataires()">Refresh</button></h2>
            <div class="prestataire" v-for="prestataire in prestataires" :key="prestataire.id">
                <div class="presta-top"><h3>{{ prestataire.nom }}</h3></div>
                <div class="presta-sbody">
                    <div class="presta-body">
                        <div class="presta-icon">
                            <img class="prestataire-img" alt="prestimg" :src="require(`../assets/ImagesPrestataires/${prestataire.image}`)" />
                        </div>
                        <div class="presta-text">{{ prestataire.description_accueil }}</div>
                        <div class="presta-actions">
                            <div class="prest-actions-btn">
                                <button @click="handlePrestaGoToPage(prestataire.id)">Accéder à la page</button>
                                <button>Modifier prestataire</button>
                                <button>Supprimer prestataire</button>
                            </div>
                            <div class="prest-actions-emplacement">
                                <p>Emplacement actuel: {{ prestataire.id_emplacement }}</p>
                                <label for="emplacement">Modifier </label><input id="emplacement" placeholder="Ex: 3" v-model="emplacementsPrestataire[prestataire.id-1]">
                                <button @click="handleModifyEmplacementPrestataire((prestataire.id),emplacementsPrestataire[(prestataire.id)-1])">Valider</button>
                            </div>
                            <div class="prest-dons">
                                <p>Total des dons: {{ montantDons[prestataire.id-1] }}€</p>
                            </div>
                        </div>
                    </div>
                    <div class="presta-bottom">
                        <button class="show-services" @click="handleShowServices(prestataire.id - 1)">Afficher services</button>
                        <div v-if="showServices[prestataire.id - 1]">
                            <h3>Liste des services :</h3>
                            <div v-for="service in prestataire.services" :key="service.id" class="service">
                                <div class="service-top"><h4>{{ service.nom_service }}</h4></div>
                                <div class="service-body">
                                    <p>{{ service.description_service }}</p>
                                    <div class="service-actions">
                                        <button>Accéder au service</button>
                                        <button>Activer/Désactiver service</button>
                                        <button>Supprimer service</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showSponsors" class="list-prestataires">
            <h2>Sponsors</h2>
            <div class="prestataire" v-for="sponsor in sponsors" :key="sponsor.id_sponsor">
                <div class="presta-top"><h3>{{ sponsor.nom_sponsor }}</h3></div>
                <div class="presta-sbody">
                    <div class="presta-body">
                        <div class="presta-icon">
                            <img class="prestataire-img" alt="prestimg" :src="require(`../assets/${sponsor.image}`)" />
                        </div>
                        <div class="presta-text">{{ sponsor.description_accueil }}</div>
                        <div class="presta-actions">
                            <button @click="handleSponsorGoToPage(sponsor.id_sponsor)">Accéder à la page</button>
                            <button>Modifier sponsor</button>
                            <button>Supprimer sponsor</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showAssociations" class="list-prestataires">
            <h2>Sponsors</h2>
            <div class="prestataire" v-for="association in associations" :key="association.id_association">
                <div class="presta-top"><h3>{{ association.nom_association }}</h3></div>
                <div class="presta-sbody">
                    <div class="presta-body">
                        <div class="presta-icon">
                            <img class="prestataire-img" alt="prestimg" :src="require(`../assets/${association.image}`)" />
                        </div>
                        <div class="presta-text">{{ association.description_accueil }}</div>
                        <div class="presta-actions">
                            <button @click="handleSponsorGoToPage(association.id_association)">Accéder à la page</button>
                            <button>Modifier association</button>
                            <button>Supprimer association</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showDemandes" class="list-prestataires">
          <div v-if="demandePrestataires.length === 0">
            <h1>Aucune demande n'a été envoyée</h1>
          </div>
          <div v-else>
            <div class="prestataire" v-for="(prestataire, index) in demandePrestataires" :key="prestataire.id">
              <div class="presta-top"><h3>{{ prestataire.nom }}</h3></div>
              <div class="presta-sbody">
                <div class="presta-body">
                  <div class="presta-icon">
                    <img  class="prestataire-img" alt="prestimg" :src="require(`../assets/ImagesPrestataires/${prestataire.image}`)" />
                  </div>
                  <div class="presta-text">{{ prestataire.description_accueil }}</div>
                  <div class="presta-actions">
                    <div class="prest-actions-emplacement">
                      <p>Emplacement demandées: {{ prestataire.id_emplacement }}</p>
                      <label for="emplacement">Modifier </label><input id="emplacement" placeholder="Ex: 3" v-model="emplacementsPrestataire[prestataire.id-1]">
                      <button @click="handleModifyEmplacementPrestataire((prestataire.id),emplacementsPrestataire[(prestataire.id)-1])">Valider</button>
                    </div>
                  </div>
                  <div class="service-actions">
                    <button @click="acceptDemandePrest(prestataire, index)">Accepter</button>
                    <button @click="declineDemandePrest(index)">Refuser</button>
                  </div>
                </div>
                <div class="presta-bottom">
                  <button class="show-services" @click="handleShowServices(prestataire.id - 1)">Afficher services</button>
                  <div v-if="showServices[prestataire.id - 1]">
                    <h3>Liste des services :</h3>
                    <div v-for="service in prestataire.services" :key="service.id" class="service">
                      <div class="service-top"><h4>{{ service.nom_service }}</h4></div>
                      <div class="service-body">
                        <p>{{ service.description_service }}</p>
                        <div class="service-actions">
                          <button>Accéder au service</button>
                          <button>Activer/Désactiver service</button>
                          <button>Supprimer service</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import moneyService from '@/services/money.service';
import prestatairesService from "@/services/prestataires.service";

export default {
    name: "PageAdministrateur",
    data() {
        return {
            showServices: [],
            showPrestataires: true,
            showSponsors: false,
            showAssociations: false,
            showDemandes: false,
            emplacementsPrestataire: [],
            montantDons: [],
            demandePrestataires: [],
        };
    },
    computed: {
        ...mapState('prestataire', ['prestataires']),
        ...mapState('sponsors', ['sponsors']),
        ...mapState('utilisateurs', ['utilisateur']),
        ...mapState('associations', ['associations']),
    },
    created() {
        if(this.utilisateur.role !== "admin") this.$router.push("/"); // renvoie un utilisateur non administrateur vers la page d'accueil lors du chargement
        this.getAllPrestataires();
        this.getAllSponsors();
        this.getAllAssociations();
        this.maintainEmplacementPrest(this.prestataires);
        this.maintainDonsPrest();
        this.getAllDemandePrestataire();

    },
    watch: {
        prestataires(newPrestataires) {
            this.showServices = Array.from({ length: newPrestataires.length }, () => false);
            this.maintainEmplacementPrest();
            this.maintainDonsPrest();
        }
    },
    methods: {
        ...mapActions('prestataire', ['getAllPrestataires','modifyEmplacementPrestataire']),
        ...mapActions('sponsors', ['getAllSponsors']),
        ...mapActions('associations', ['getAllAssociations']),
        async getDonationAmount(id){
            return await moneyService.getTotalDonsOf(id);
        },
        handlePrestaGoToPage(id) {
            this.$router.push("/prestataire/" + id);
        },
        handleSponsorGoToPage(id){
            this.$router.push("/sponsor/" + id);
        },
        handleShowServices(index) {
            this.$set(this.showServices, index, !this.showServices[index]);
        },
        handleShowPrestataires(){
            this.showPrestataires = true;
            this.showSponsors = false;
            this.showAssociations = false;
            this.showDemandes = false;
        },
        handleShowSponsors(){
            this.showPrestataires = false;
            this.showSponsors = true;
            this.showAssociations = false;
            this.showDemandes = false;
        },
        handleShowAssociations(){
            this.showPrestataires = false;
            this.showSponsors = false;
            this.showAssociations = true;
            this.showDemandes = false;
        },
        handleShowDemandes(){
          this.showPrestataires = false;
          this.showSponsors = false;
          this.showAssociations = false;
          this.showDemandes = true;
        },
        maintainEmplacementPrest(){
            this.getAllPrestataires();
            let prests = this.prestataires;
            this.emplacementsPrestataire = [];
            for(let prest of prests){
                this.emplacementsPrestataire.push(prest.id_emplacement);
            }
        },
        async maintainDonsPrest(){
            this.montantDons = [];
            for(let prest of this.prestataires){
                this.montantDons.push((await this.getDonationAmount(prest.id)).data);
            }
        },
        handleModifyEmplacementPrestataire(prestId, value){
            this.modifyEmplacementPrestataire([prestId, value]);
            this.maintainEmplacementPrest();
        },
        async getAllDemandePrestataire() {
          const response = await prestatairesService.getAllDemandePrestataire();
          this.demandePrestataires = response.data;

          for (let i = 0; i < this.demandePrestataires.length; i++) {
            const file = this.demandePrestataires[i].image  // Récupère le premier fichier sélectionné

            if (file && typeof file === Blob) {// Vérifie que le fichier est une image
              const reader = new FileReader();

              reader.onload = (e) => {
                this.demandePrestataires[i].image = e.target.result;
              };

              reader.readAsDataURL(file);
            }
          }
        },
        async declineDemandePrest(id) {
          await prestatairesService.declineDemandePrest(id)
        },
        async acceptDemandePrest(prest, index){
          await prestatairesService.acceptDemandePrest(prest)
          await this.declineDemandePrest(index)
        },
    }
};
</script>


<style scoped>
    .list-prestataires{
        display: flex;
        flex-direction: column;
        margin: 5%;
    }
    .prestataire{
        display: flex;
        flex-direction: column;
        margin-top: 1%;
        margin-bottom: 1%;
    }
    .presta-sbody{
        border: 1px solid black;
        border-radius: 5px;
    }
    .presta-body{
        display: flex;
        flex-direction: row;
        text-align: center;
        align-items: center;
        gap: 5%;
        padding: 1%;
    }
    .presta-bottom{
        padding: 1%;
    }
    .show-services{
        width: 100%;
        border: none;
    }
    .presta-actions{
        margin-left: 5%;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1%;
    }
    .prest-actions-btn{
        display: flex;
        flex-direction: row;
        gap: 4%;
    }

    .presta-actions button{
        width: 200px;
    }
    .service{
        border-bottom: 1px solid black;

    }
    .service-body{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .service-actions{
        margin-left: auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 4%;
    }
    .service-actions button{
        width: 200px;
    }
    .switch-admin{
        justify-content: center;
        margin-left: auto;
        margin-right: auto;
        align-items: center;
        display: flex;
        flex-direction: row;
        gap: 4%;
    }

    .switch-admin button{
        width: 300px;
    }
</style>