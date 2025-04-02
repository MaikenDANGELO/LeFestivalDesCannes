<template>
    <div class="commandes">
        <h1>Commandes utilisateur</h1>
        <div class="commande" v-for="commande in commandes" :key="commande.id">
            <p>ID: {{ commande.id }}</p>
            <p>Acheteur: {{ commande.acheteur }}</p>
            <p>Adresse: {{ commande.adresse }}</p>
            <p>Total: {{ commande.total }}</p>
            <p>Statut: {{ commande.status }}</p>
            <div v-if="commande.status == 'en attente'">
                <button @click="validateCommande(commande.id)">Valider</button>
                <button @click="cancelCommande(commande.id)">Annuler</button>
            </div>
        </div>
    </div>
</template>

<script>
import prestatairesService from '@/services/prestataires.service';
import { mapState } from 'vuex';

export default {
    data: () => ({
        commandes: []
    }),
    computed: {
        ...mapState('utilisateurs', ['utilisateur'])
    },
    methods: {
        async getCommandes(){
            let res = await prestatairesService.getAllBoutiqueCommandes();
            return res.data
        },
        async cancelCommande(id){
            console.log("annulation")
            await prestatairesService.cancelBoutiqueCommande(id)
        },
        async validateCommande(id){
            console.log("validation")
            await prestatairesService.validateBoutiqueCommande(id)
        }
    },
    async mounted() {
        if(!this.utilisateur.estConnecte || !((this.utilisateur.role=='prestataire'&&this.utilisateur.id_prestataire==4)||(this.utilisateur.role=='admin'))){
            this.$router.push('/')
        }
        this.commandes = await this.getCommandes();
    }
}
</script>

<style scoped>
    .commandes{
        display: flex;
        flex-direction: column;
        margin: 5%;
    }
    .commande{
        display: flex;
        flex-direction: row;
        border: 1px solid black;
        border-radius: 15px;
        padding: 15px;
        gap: 5%;
    }
</style>