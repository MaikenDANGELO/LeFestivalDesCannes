<template>
    <div>
        <h1 style="text-align: center;">Page d'administration</h1>
        <div class="switch-admin">
            <button @click="handleShowPrestataires()"><h2>Prestataires</h2></button>
            <button @click="handleShowSponsors()"><h2>Sponsors</h2></button>
        </div>
        <div v-if="showPrestataires" class="list-prestataires">
            <h2>Prestataires</h2>
            <div class="prestataire" v-for="prestataire in prestataires" :key="prestataire.id">
                <div class="presta-top"><h3>{{ prestataire.nom }}</h3></div>
                <div class="presta-sbody">
                    <div class="presta-body">
                        <div class="presta-icon">
                            <img class="prestataire-img" alt="prestimg" :src="require(`../assets/${prestataire.image}`)" />
                        </div>
                        <div class="presta-text">{{ prestataire.description_accueil }}</div>
                        <div class="presta-actions">
                            <button @click="handlePrestaGoToPage(prestataire.id)">Accéder à la page</button>
                            <button>Modifier prestataire</button>
                            <button>Supprimer prestataire</button>
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
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: "PageAdministrateur",
    data() {
        return {
            showServices: [],
            showPrestataires: true,
            showSponsors: false,
        };
    },
    computed: {
        ...mapState('prestataire', ['prestataires']),
        ...mapState('sponsors', ['sponsors']),
        ...mapState('utilisateurs', ['utilisateur']),
    },
    created() {
        if(this.utilisateur.role !== "admin") this.$router.push("/"); // renvoie un utilisateur non administrateur vers la page d'accueil lors du chargement
        this.getAllPrestataires();
        this.getAllSponsors();
        console.log(this.sponsors);
    },
    watch: {
        prestataires(newPrestataires) {
            this.showServices = Array.from({ length: newPrestataires.length }, () => false);
        }
    },
    methods: {
        ...mapActions('prestataire', ['getAllPrestataires']),
        ...mapActions('sponsors', ['getAllSponsors']),
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
        },
        handleShowSponsors(){
            this.showPrestataires = false;
            this.showSponsors = true;
        }
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
        margin-left: auto;
        display: flex;
        flex-direction: row;
        align-items: center;
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