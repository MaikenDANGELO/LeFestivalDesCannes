<template>
    <div>
        <h1>Page d'administration</h1>
        <div class="list-prestataires">
            <h2>Prestataires</h2>
            <div class="prestataire" v-for="prestataire in this.getPrestataires()" :key="prestataire.id">
                <div class="presta-top"><h3>{{ prestataire.nom }}</h3></div>
                <div class="presta-sbody">
                    <div class="presta-body">
                        <div class="presta-icon"><img class="prestataire-img" alt="prestimg" :src="require(`../assets/${prestataire.image}`)" /></div>
                        <div class="presta-text">{{ prestataire.description_accueil }}</div>
                        <div class="presta-actions">
                            <button @click="handlePrestaGoToPage(prestataire.id)">Accéder à la page</button>
                            <button>action..</button>
                            <button>action..</button>
                            <button>action..</button>
                        </div>
                    </div>
                    <div class="presta-bottom">
                        <button class="show-services">Afficher services</button>
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
        data : () => ({

        }),
        computed: {
            ...mapState('prestataire',['prestataires']),
        },
        methods: {
            ...mapActions('prestataire', ['getAllPrestataires']),
            getPrestataires(){
                this.getAllPrestataires();
                return this.prestataires;
            },
            handlePrestaGoToPage(id){
                this.$router.push("/prestataire/"+id);
            }
        }
    }
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
        width: 150px;
    }
</style>