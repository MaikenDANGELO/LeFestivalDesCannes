<template>
    <div class="prestataire-detail" v-if="prestataire">
        <h1>Faire un don à {{ prestataire.nom }}</h1>
        <div>
            <input @change="checkIsMontantValide()" id="montant5" type="radio" value="5" v-model="montantDon">
            <label for="montant5">5€ </label>
            <input @change="checkIsMontantValide()" id="montant10" type="radio" value="10" v-model="montantDon">
            <label for="montant10">10€ </label>
            <input @change="checkIsMontantValide()" id="montant20" type="radio" value="20" v-model="montantDon">
            <label for="montant20">20€ </label>
            <input @change="checkIsMontantValide()" id="montant0" type="radio" value="0" v-model="montantDon">
            <label for="montant0">Choisir un montant personnalisé </label><br>
            <div v-if="!premadeAmount.includes(montantDon)">
                <label for="personnalise">Entrer un montant personnalisé: </label>
                <input id="personnalise" type="text" @change="updateMontantDon()" v-model="userInput">
            </div>
            <div v-if="isDonValide">
                <p>Montant choisi: {{ montantDon }} €</p><br>
                <label for="message">Message personnalisé (optionnel): </label>
                <input id="message" type="text" style="overflow-y: scroll;" placeholder="Message optionnel"
                    v-model="message"><br><br>
                <div>
                    <form @submit.prevent="makeDonation">
                        <h2>Paiement</h2>

                        <div class="form-group">
                            <label for="cardNumber">Numéro de carte :</label>
                            <input v-model="payment.cardNumber" type="text" id="cardNumber" pattern="\d{16,}"
                                placeholder="Numéro de carte" required>
                        </div>

                        <div class="form-group">
                            <label for="expirationDate">Date d'expiration :</label>
                            <input v-model="payment.expirationDate" type="text" id="expirationDate"
                                pattern="^(0[1-9]|1[0-2])\/\d{2}$" placeholder="MM/AA" required>
                        </div>

                        <div class="form-group">
                            <label for="cvv">CVV :</label>
                            <input v-model="payment.cvv" type="text" id="cvv" placeholder="CVV" required>
                        </div>

                        <div class="form-group">
                            <p><strong>Total à payer : {{ montantDon }} €</strong></p>
                        </div>
                        <input type="submit" :value="'Faire un don de '+montantDon+'€'">
                    </form>
                </div>
            </div>
            <div v-else>
                <p style="color: red;">Veuillez entrer un montant valide</p>
            </div>
        </div>
    </div>
    <div v-else>
        <p>Chargement des données...</p>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import moneyService from '@/services/money.service';

export default {
    name: "PageDon",
    data() {
        return {
            prestataire: null,
            premadeAmount: ["5", "10", "20"],
            userInput: "0",
            montantDon: "5",
            isDonValide: true,
            message: "",
            payment: {
                cardNumber: "",
                expirationDate: "",
                cvv: "",
            },
        };
    },
    methods: {
        ...mapActions('prestataire', ['getAllPrestataires']),
        ...mapActions('utilisateurs', ['getAllUsers']),
        getUtilisateur(id) {
            return this.utilisateurs.find(u => u['id_utilisateur'] === id);
        },
        checkIsMontantValide() {
            if (this.montantDon > 0) this.isDonValide = true;
            else this.isDonValide = false;
        },
        updateMontantDon() {
            if (parseInt(this.userInput) && this.userInput > 0) {
                this.montantDon = this.userInput;
                this.isDonValide = true;
            } else {
                this.isDonValide = false;
            }
        },
        async makeDonation() {
            let response;
            console.log("Réalisation d'un don..")
            try {
                console.log(this.utilisateur.id, this.prestataire.id, parseInt(this.montantDon), this.message)
                response = await moneyService.makeDonation(parseInt(this.utilisateur.id), this.prestataire.id, parseInt(this.montantDon), this.message);
                console.log(response)
            } catch (e) {
                response = e;
            }

            return response;
        }
    },
    computed: {
        ...mapState('utilisateurs', ['utilisateur', 'utilisateurs']),
        ...mapState('prestataire', ["avis_prestataire", "prestataires"])
    },
    async created() {
        if (!this.utilisateur || !this.utilisateur.estConnecte) this.$router.push('/');
        await this.getAllPrestataires();
        await this.getAllUsers();
        const id = this.$route.params.id;
        this.prestataire = this.prestataires.find(p => p.id === id); // récupère le prestataire d'après l'id renseignée depuis la Page  principale    
    },
};
</script>

<style scoped></style>