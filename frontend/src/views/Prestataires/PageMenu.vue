<template>
    <div class="menu-container">
      <h1 class="menu-title">{{ $t('pagePrestaTexts.menuRestau') }}</h1>

      <!-- Section Plats -->
      <section class="menu-section">
        <h2 class="menu-section-title">{{ $t('pagePrestaTexts.plats') }}</h2>
        <div class="menu-items">
          <div v-for="plat in menuData.plats" :key="plat.id" class="menu-item">
            <img :src="require(`@/assets/menu/${plat.image}`)" :alt="plat.nom" class="menu-item-image" />
            <div class="menu-item-details">
              <h3 class="menu-item-title">{{ plat.nom }}</h3>
              <p class="menu-item-description">{{ plat.description }}</p>
              <p class="menu-item-price">{{ plat.prix }} €</p>
              <button class="menu-item-button" @click="ajouterAuPanier(plat)">{{ $t('pagePrestaTexts.ajouterPanier') }}</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Section Boissons -->
      <section class="menu-section">
        <h2 class="menu-section-title">{{ $t('pagePrestaTexts.boissons') }}</h2>
        <div class="menu-items">
          <div v-for="boisson in menuData.boissons" :key="boisson.id" class="menu-item">
            <img :src="require(`@/assets/menu/${boisson.image}`)" :alt="boisson.nom" class="menu-item-image" />
            <div class="menu-item-details">
              <h3 class="menu-item-title">{{ boisson.nom }}</h3>
              <p class="menu-item-description">{{ boisson.description }}</p>
              <p class="menu-item-price">{{ boisson.prix }} €</p>
              <button class="menu-item-button" @click="ajouterAuPanier(boisson)">{{ $t('pagePrestaTexts.ajouterPanier') }}</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Section Desserts -->
      <section class="menu-section">
        <h2 class="menu-section-title">{{ $t('pagePrestaTexts.desserts') }}</h2>
        <div class="menu-items">
          <div v-for="dessert in menuData.desserts" :key="dessert.id" class="menu-item">
            <img :src="require(`@/assets/menu/${dessert.image}`)" :alt="dessert.nom" class="menu-item-image" />
            <div class="menu-item-details">
              <h3 class="menu-item-title">{{ dessert.nom }}</h3>
              <p class="menu-item-description">{{ dessert.description }}</p>
              <p class="menu-item-price">{{ dessert.prix }} €</p>
              <button class="menu-item-button" @click="ajouterAuPanier(dessert)">{{ $t('pagePrestaTexts.ajouterPanier') }}</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Section Menus Enfants -->
      <section class="menu-section">
        <h2 class="menu-section-title">{{ $t('pagePrestaTexts.menuEnfants') }}</h2>
        <div class="menu-items">
          <div v-for="menuEnfant in menuData.menusEnfants" :key="menuEnfant.id" class="menu-item">
            <img :src="require(`@/assets/menu/${menuEnfant.image}`)" :alt="menuEnfant.nom" class="menu-item-image" />
            <div class="menu-item-details">
              <h3 class="menu-item-title">{{ menuEnfant.nom }}</h3>
              <p class="menu-item-description">{{ menuEnfant.description }}</p>
              <p class="menu-item-price">{{ menuEnfant.prix }} €</p>
              <button class="menu-item-button" @click="ajouterAuPanier(menuEnfant)">{{ $t('pagePrestaTexts.ajouterPanier') }}</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Panier -->
      <aside class="panier-container">
        <h2 class="panier-title">{{ $t('pagePrestaTexts.votrePanier') }}</h2>
        <ul class="panier-list">
          <li v-for="item in panier" :key="item.id">
            <span>{{ item.nom }} x{{ item.quantite }}</span>
            <button class="panier-remove" @click="retirerDuPanier(item)">{{ $t('pagePrestaTexts.supprimer') }}</button>
          </li>
        </ul>
        <p class="panier-total">Total : {{ totalPanier }} €</p>

        <div class="recuperation-section">
          <label for="heureRecuperation">{{ $t('pagePrestaTexts.heureRecup') }}</label>
          <input id="heureRecuperation" v-model="heureRecuperation" type="time" class="recuperation-input" />
        </div>
        <button class="valider-button" @click="validerCommande">{{ $t('pagePrestaTexts.validComm') }}</button>
      </aside>
    </div>
  </template>

<script>
import { menu } from "@/datasource/data";

export default {
  name: "PageMenu",
  data() {
    return {
      menuData: menu,
      panier: [],
      heureRecuperation: "",
    };
  },
  computed: {
    totalPanier() {
      return this.panier.reduce((total, item) => total + item.prix * item.quantite, 0);
    },
  },
  methods: {
    ajouterAuPanier(item) {
      const itemExistant = this.panier.find((panierItem) => panierItem.id === item.id);
      if (itemExistant) {
        itemExistant.quantite++;
      } else {
        this.panier.push({ ...item, quantite: 1 });
      }
    },
    retirerDuPanier(item) {
      const index = this.panier.findIndex((panierItem) => panierItem.id === item.id);
      if (index > -1) {
        if (this.panier[index].quantite > 1) {
          this.panier[index].quantite--;
        } else {
          this.panier.splice(index, 1);
        }
      }
    },
    validerCommande() {
      if (!this.heureRecuperation) {
        alert("Veuillez choisir une heure de récupération.");
        return;
      }

      if (this.panier.length === 0) {
        alert("Votre panier est vide.");
        return;
      }

      alert(`Commande validée ! Total : ${this.totalPanier} €, à récupérer à ${this.heureRecuperation}.`);
      this.panier = [];
      this.heureRecuperation = "";
    },
  },
};
</script>

<style scoped>
/* Conteneur principal */
.menu-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

/* Titre principal */
.menu-title {
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 30px;
}

/* Section menu */
.menu-section {
  margin-bottom: 50px;
}

/* Titres des sections */
.menu-section-title {
  font-size: 2rem;
  font-weight: bold;
  color: #27ae60;
  margin-bottom: 20px;
  text-align: left;
  border-bottom: 2px solid #27ae60;
  padding-bottom: 10px;
}

/* Grille des items */
.menu-items {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: space-between;
}

/* Chaque item */
.menu-item {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(33% - 20px); /* 3 items par ligne */
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.menu-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

/* Image des items */
.menu-item-image {
  width: auto; /* Supprime la contrainte de largeur fixe */
  height: auto; /* Supprime la contrainte de hauteur fixe */
  max-width: 100%; /* Adapte à la taille du conteneur */
  max-height: 150px; /* Définit une limite maximale pour éviter des images trop grandes */
  object-fit: contain; /* Maintient les proportions de l'image */
  border-radius: 10px;
  margin-bottom: 15px;
}

/* Détails des items */
.menu-item-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

/* Nom de l'item */
.menu-item-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #34495e;
  margin-bottom: 10px;
}

/* Description de l'item */
.menu-item-description {
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 15px;
}

/* Prix de l'item */
.menu-item-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #27ae60;
  margin-bottom: 15px;
}

/* Bouton d'ajout au panier */
.menu-item-button {
  background-color: #27ae60; /* Vert pour le bouton */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px 18px; /* Bouton légèrement plus grand */
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.menu-item-button:hover {
  background-color: #219150; /* Couleur légèrement plus foncée au survol */
  transform: translateY(-2px); /* Effet de soulèvement */
}

/* Panier */
.panier-container {
  position: sticky;
  top: 20px;
  background-color: #ffffff;
  border: 2px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
}

/* Titre du panier */
.panier-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #e74c3c;
  margin-bottom: 15px;
  text-align: center;
}

/* Liste des articles dans le panier */
.panier-list {
  list-style: none;
  padding: 0;
  margin: 0 0 15px;
}

.panier-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

/* Bouton de suppression */
.panier-remove {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 0.9rem;
  cursor: pointer;
}

.panier-remove:hover {
  background-color: #c0392b;
}

/* Total du panier */
.panier-total {
  font-size: 1.2rem;
  font-weight: bold;
  color: #34495e;
  text-align: center;
  margin-bottom: 15px;
}

/* Entrée de l'heure de récupération */
.recuperation-section {
  margin-bottom: 15px;
}

.recuperation-input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  margin-top: 10px;
}

/* Bouton de validation */
.valider-button {
  display: block;
  width: 100%;
  background-color: #27ae60;
  color: white;
  padding: 10px 15px;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s ease;
}

.valider-button:hover {
  background-color: #219150;
}
</style>