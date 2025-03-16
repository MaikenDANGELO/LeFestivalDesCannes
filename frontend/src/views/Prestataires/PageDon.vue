<template>
    <div class="prestataire-detail" v-if="prestataire">
        <h1>{{$t('pagePrestaTexts.donnera')}}{{ prestataire.nom }}</h1>
        <div>
            <input @change="checkIsMontantValide()" id="montant5" type="radio" value="5" v-model="montantDon">
            <label for="montant5">5€ </label>
            <input @change="checkIsMontantValide()" id="montant10" type="radio" value="10" v-model="montantDon">
            <label for="montant10">10€ </label>
            <input @change="checkIsMontantValide()" id="montant20" type="radio" value="20" v-model="montantDon">
            <label for="montant20">20€ </label>
            <input @change="checkIsMontantValide()" id="montant0" type="radio" value="0" v-model="montantDon">
            <label for="montant0">{{$t('pagePrestaTexts.montantPerso')}}</label><br>
            <div v-if="!premadeAmount.includes(montantDon)">
                <label for="personnalise">{{$t('pagePrestaTexts.montantPerso')}}</label>
                <input id="personnalise" type="text" @change="updateMontantDon()" v-model="userInput">
            </div>
            <div v-if="isDonValide">
                <p>{{$t('pagePrestaTexts.montantChoisi')}}{{ montantDon }} €</p><br>
                <label for="message">{{$t('pagePrestaTexts.messagePerso')}}</label>
                <input id="message" type="text" style="overflow-y: scroll;" placeholder="Message optionnel"
                    v-model="message"><br><br>
                <div>
                    <form @submit.prevent="makeDonation">
                        <h2>{{$t('pagePrestaTexts.paiement')}}</h2>

                        <div class="form-group">
                            <label for="cardNumber">{{$t('billeterieTexts.numCarte')}}</label>
                            <input v-model="payment.cardNumber" type="text" id="cardNumber" pattern="\d{16,}"
                                placeholder="Numéro de carte" required>
                        </div>

                        <div class="form-group">
                            <label for="expirationDate">{{$t('billeterieTexts.dateExpiration')}}</label>
                            <input v-model="payment.expirationDate" type="text" id="expirationDate"
                                pattern="^(0[1-9]|1[0-2])\/\d{2}$" placeholder="MM/AA" required>
                        </div>

                        <div class="form-group">
                            <label for="cvv">CVV :</label>
                            <input v-model="payment.cvv" type="text" id="cvv" placeholder="CVV" required>
                        </div>

                        <div class="form-group">
                            <p><strong>Total : {{ montantDon }} €</strong></p>
                        </div>
                        <input type="submit" :value="$t('pagePrestaTexts.faireDonDe')+montantDon+'€'">
                    </form>
                </div>
            </div>
            <div v-else>
                <p style="color: red;">{{ $t('pagePrestaTexts.entrerMontantValide') }}</p>
            </div>
        </div>
    </div>
    <div v-else>
        <p>{{$t('pagePrestaTexts.chargementDonnees')}}</p>
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