<template>
    <div>
        <h1 style="text-align: center;">Page d'administration</h1>
        <div class="list-prestataires">
            <div class="switch-admin">
                <button><h2>Sponsors</h2></button>
                <button><h2>Prestataires</h2></button>
            </div>
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
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: "PageAdministrateur",
    data() {
        return {
            showServices: []
        };
    },
    computed: {
        ...mapState('prestataire', ['prestataires']),
    },
    created() {
        this.getAllPrestataires();
    },
    watch: {
        prestataires(newPrestataires) {
            this.showServices = Array.from({ length: newPrestataires.length }, () => false);
        }
    },
    methods: {
        ...mapActions('prestataire', ['getAllPrestataires']),
        handlePrestaGoToPage(id) {
            this.$router.push("/prestataire/" + id);
        },
        handleShowServices(index) {
            this.$set(this.showServices, index, !this.showServices[index]);
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
</style>