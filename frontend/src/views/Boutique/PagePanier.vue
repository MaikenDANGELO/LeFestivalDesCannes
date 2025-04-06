<template>
  <div class="panier-container">
    <h1 v-if="!commandeValidee" class="panier-title">🛍️ {{ $t('boutiqueTexts.votrePanier') }}</h1>

    <div v-if="!commandeValidee">
      <div v-if="panier.length > 0">
        <div class="panier-items">
          <div v-for="article in panier" :key="article.id" class="panier-item">
            <img class="panier-image" :src="require(`@/assets/Boutique/${article.categorie}/${article.image}`)" :alt="article.nom" />
            <div class="panier-details">
              <h2 v-if="currentLanguage==='fr'"  class="panier-name">{{ article.nom }}</h2>
              <h2 v-else-if="currentLanguage==='en'" class="panier-name">{{ article.nom_en }}</h2>
              <p class="panier-price">{{ article.prix }}€</p>
              <p v-if="article.tailleSelectionnee" class="panier-taille">
                <strong>Taille :</strong> {{ article.tailleSelectionnee }}
               </p>
              <p v-if="currentLanguage==='fr'" class="panier-details">{{ article.description }}</p>
              <p v-else-if="currentLanguage==='en'" class="panier-details">{{ article.description_en }}</p>
              <div class="panier-quantity">
                <button @click="modifierQuantite(article, -1)">➖</button>
                <span>{{ article.quantite }}</span>
                <button @click="modifierQuantite(article, 1)">➕</button>
              </div>
              <button class="panier-remove" @click="retirerDuPanier(article)">🗑️ {{ $t('boutiqueTexts.supprimer') }}</button>
            </div>
          </div>
        </div>

        <!-- Total -->
        <div class="panier-total">
          <h2>{{ $t('boutiqueTexts.total') }} : {{ totalPanier }}€</h2>
        </div>

        <!-- Choix entre livraison et retrait -->
        <div class="choix-retrait">
          <h2>📍 {{ $t('boutiqueTexts.choisissezModeRecuperation') }}</h2>
          <button class="choix-button" @click="choisirRetrait">🚶‍♂️ {{ $t('boutiqueTexts.retraitFestival') }}</button>
          <button class="choix-button" @click="choisirLivraison">🚚 {{ $t('boutiqueTexts.livraisonDomicile') }}</button>
        </div>

        <!-- Adresse si livraison -->
        <div v-if="livraison">
          <h3>📦 {{ $t('boutiqueTexts.entrezAdresseLivraison') }}</h3>
          <input v-model="adresse" type="text" placeholder="Rue, Ville, Code Postal" required />
        </div>

        <!-- Redirection vers PageAcces si retrait -->
        <div v-if="retrait">
          <p>ℹ️ {{ $t('boutiqueTexts.retraitInfo') }}</p>
          <router-link to="/Acces" class="lien-acces">{{ $t('boutiqueTexts.voirAccesFestival') }}</router-link>
        </div>

        <!-- Paiement -->
        <div v-if="utilisateur.estConnecte && modeRecuperation">
          <h2 class="paiement-title">💳 {{ $t('boutiqueTexts.selectionnezMoyenPaiement') }}</h2>
          <div class="paiement-options">
            <button v-for="methode in moyensPaiement" :key="methode.nom" class="paiement-button" @click="selectionnerPaiement(methode.nom)">
              <img :src="require(`@/assets/Boutique/icones_paiement/${methode.image}`)" :alt="methode.nom" />
            </button>
          </div>

          <div v-if="paiementSelectionne">
            <h3>🔐 {{ $t('boutiqueTexts.infosPaiement') }} pour {{ paiementSelectionne }}</h3>
            <input v-model="infosPaiement.nom" type="text" :placeholder=" $t('boutiqueTexts.nomCarte') " />
            <input v-model="infosPaiement.numero" type="text" :placeholder=" $t('boutiqueTexts.numeroCarte') " />
            <input v-model="infosPaiement.expiration" type="text" placeholder="MM/AA" />
            <input v-model="infosPaiement.cvv" type="text" :placeholder="$t('boutiqueTexts.cvv')" />
            <p v-if="messageErreur" class="message-erreur">{{ messageErreur }}</p>
            <button class="panier-valider" @click="validerCommande">✅ {{$t('boutiqueTexts.validerCommande') }}</button>
          </div>
        </div>

        <p v-else class="panier-message">
          🔒 {{ $t('boutiqueTexts.deconnecte') }} <router-link to="/Signup">{{ $t('boutiqueTexts.seConnecter') }}</router-link>
        </p>
      </div>
      <p v-else class="panier-vide">{{ $t('boutiqueTexts.panierVide') }}</p>
    </div>

    <!-- Message après validation -->
    <div v-if="commandeValidee" class="confirmation-container">
      <h1 class="confirmation-message">🎉 {{ $t('boutiqueTexts.merciAchat') }}</h1>
      <button class="suivi-commande-btn" @click="suivreCommande">📦 {{ $t('boutiqueTexts.suivreCommande') }}</button>
    </div>
  </div>
</template>


<script>
  import { mapState, mapActions } from "vuex";
  
  export default {
    name: "PagePanier",
    data() {
      return {
        commandeValidee: false,
        paiementSelectionne: null,
        messageErreur: "",
        livraison: false,
        retrait: false,
        modeRecuperation: false,
        adresse: "",
        infosPaiement: {
          nom: "",
          numero: "",
          expiration: "",
          cvv: "",
        },
        moyensPaiement: [
          { nom: "Visa", image: "visa.jpg" },
          { nom: "Mastercard", image: "mastercard.jpg" },
          { nom: "PayPal", image: "paypal.jpg" },
          { nom: "Apple Pay", image: "applepay.jpg" },
        ],
      };
    },
    computed: {
      ...mapState("boutique", ["panier"]),
      ...mapState("langue", ["currentLanguage"]),
      ...mapState("utilisateurs", ["utilisateur"]),
  
      totalPanier() {
        return this.panier.reduce((total, item) => total + item.prix * item.quantite, 0);
      },
    },
    methods: {
      ...mapActions("boutique", ["modifierQuantite", "retirerDuPanier", "validerCommande"]),
  
      choisirRetrait() {
        this.retrait = true;
        this.livraison = false;
        this.modeRecuperation = true;
      },
  
      choisirLivraison() {
        this.livraison = true;
        this.retrait = false;
        this.modeRecuperation = true;
      },
  
      selectionnerPaiement(methode) {
        this.paiementSelectionne = methode;
        this.messageErreur = "";
      },
  
      validerCommande() {
        if (!this.modeRecuperation) {
          alert("⚠️ Choisissez un mode de récupération !");
          return;
        }
  
        if (this.livraison && !this.adresse) {
          alert("⚠️ Veuillez entrer une adresse de livraison !");
          return;
        }
  
        if (!this.paiementSelectionne) {
          alert("❌ Sélectionnez un moyen de paiement.");
          return;
        }
  
        if (!this.verifierInfosPaiement()) {
          this.messageErreur = "❌ Les informations de paiement ne sont pas valides.";
          return;
        }
  
        alert(`✅ Paiement validé avec ${this.paiementSelectionne} ! Un reçu a été envoyé à votre email.`);
        this.envoyerEmailRecu();
        this.commandeValidee = true;
      },
  
      verifierInfosPaiement() {
        const { nom, numero, expiration, cvv } = this.infosPaiement;
  
        const regexCarte = /^\d{16}$/;
        const regexExpiration = /^(0[1-9]|1[0-2])\/\d{2}$/;
        const regexCVV = /^\d{3}$/;
  
        return nom && regexCarte.test(numero) && regexExpiration.test(expiration) && regexCVV.test(cvv);
      },
  
      envoyerEmailRecu() {
        console.log(`📧 Envoi d'un email de confirmation à ${this.utilisateur.email}`);
      },
  
      suivreCommande() {
        this.$router.push({ name: "PageSuiviCommande" });
      }
    }
  };
  </script>


<style scoped>
/* Conteneur principal */
.panier-container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 30px;
  background: white;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
}

/* Titre du panier */
.panier-title {
  text-align: center;
  font-size: 3rem;
  color: #1e8449;
  margin-bottom: 20px;
}

/* Liste des articles */
.panier-items {
  margin-top: 30px;
}

/* Article du panier */
.panier-item {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  padding: 15px;
  border-bottom: 2px solid #ddd;
  transition: transform 0.2s ease-in-out;
}

.panier-item:hover {
  transform: scale(1.02);
}

/* Image de l'article */
.panier-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid #ddd;
}

/* Détails de l'article */
.panier-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Nom de l'article */
.panier-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

/* Prix de l'article */
.panier-price {
  font-size: 1.3rem;
  color: #e67e22;
  font-weight: bold;
}

/* Gestion de la quantité */
.panier-quantity {
  display: flex;
  align-items: center;
  gap: 15px;
}

.panier-quantity button {
  background: #1e8449;
  color: white;
  border: none;
  padding: 8px 12px;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.panier-quantity button:hover {
  background: #145a32;
}

/* Supprimer un article */
.panier-remove {
  background: #c0392b;
  color: white;
  border: none;
  padding: 8px 12px;
  font-size: 1.1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.panier-remove:hover {
  background: #922b21;
}

/* Total du panier */
.panier-total {
  text-align: center;
  font-size: 2rem;
  margin-top: 30px;
  font-weight: bold;
  color: #1e8449;
}

/* Paiement */
.paiement-title {
  text-align: center;
  font-size: 1.8rem;
  margin-top: 30px;
}

/* Options de paiement */
.paiement-options {
  display: flex;
  justify-content: center;
  gap: 25px;
  margin: 20px 0;
}

/* Bouton de paiement */
.paiement-button {
  background: none;
  border: none;
  cursor: pointer;
}

.paiement-button img {
  width: 80px;
  transition: transform 0.3s ease-in-out;
}

.paiement-button img:hover {
  transform: scale(1.2);
}

/* Champs de saisie */
input {
  width: 100%;
  padding: 12px;
  margin: 12px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1.1rem;
}

/* Bouton Valider la commande */
.panier-valider {
  background: #1e8449;
  color: white;
  border: none;
  padding: 15px;
  width: 100%;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 8px;
  margin-top: 20px;
  transition: background 0.3s ease-in-out;
}

.panier-valider:hover {
  background: #145a32;
}

/* Message d'erreur */
.panier-message {
  text-align: center;
  font-size: 1.3rem;
  color: red;
}

/* Message panier vide */
.panier-vide {
  text-align: center;
  font-size: 1.8rem;
  color: #888;
  font-weight: bold;
  margin-top: 50px;
}
/* Conteneur de confirmation */
.confirmation-container {
  text-align: center;
  margin-top: 50px;
  padding: 30px;
  background: #f0fdf4; /* Vert clair */
  border: 2px solid #1e8449; /* Bordure verte */
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

/* Message de confirmation */
.confirmation-message {
  font-size: 2.5rem;
  font-weight: bold;
  color: #1e8449;
  margin-bottom: 20px;
}

/* Bouton Suivi de Commande */
.suivi-commande-btn {
  background-color: #1e8449;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* Effet au survol */
.suivi-commande-btn:hover {
  background-color: #145a32;
  transform: scale(1.05);
}

/* Effet au clic */
.suivi-commande-btn:active {
  transform: scale(0.95);
}

/* Section choix du mode de récupération */
.choix-retrait {
  text-align: center;
  margin-top: 30px;
}

.choix-retrait h2 {
  font-size: 1.8rem;
  color: #1e8449;
  margin-bottom: 15px;
}

/* Boutons de sélection */
.choix-button {
  background-color: #1e8449;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.3rem;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  display: inline-block;
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.choix-button:hover {
  background-color: #145a32;
  transform: scale(1.05);
}

.choix-button:active {
  transform: scale(0.95);
}

/* Champ d'adresse pour la livraison */
.livraison-section {
  text-align: center;
  margin-top: 20px;
}

.livraison-section h3 {
  font-size: 1.5rem;
  color: #1e8449;
  margin-bottom: 10px;
}

.livraison-section input {
  width: 80%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1.1rem;
}

/* Lien pour voir l'accès au festival */
.lien-acces {
  display: inline-block;
  margin-top: 10px;
  font-size: 1.2rem;
  color: #1e8449;
  font-weight: bold;
  text-decoration: none;
  border-bottom: 2px solid #1e8449;
  transition: color 0.3s ease, border-bottom 0.3s ease;
}

.lien-acces:hover {
  color: #145a32;
  border-bottom: 2px solid #145a32;
}
</style>