import { goodies } from "@/datasource/data";

export default {
  namespaced: true,
  state: () => ({
    goodies: [],
    panier: [],
  }),
  mutations: {
    // Met à jour la liste des goodies
    setGoodies: (state, goodies) => {
      state.goodies = goodies;
    },

    // Ajoute un article au panier
    ajouterAuPanier: (state, goodie) => {
      const itemExistant = state.panier.find((item) => item.id === goodie.id);
      if (itemExistant) {
        itemExistant.quantite++;
      } else {
        state.panier.push({ ...goodie, quantite: 1 });
      }
    },

    // Retire un article du panier
    retirerDuPanier: (state, goodie) => {
      const index = state.panier.findIndex((item) => item.id === goodie.id);
      if (index > -1) {
        if (state.panier[index].quantite > 1) {
          state.panier[index].quantite--;
        } else {
          state.panier.splice(index, 1);
        }
      }
    },

    // Vide complètement le panier
    viderPanier: (state) => {
      state.panier = [];
    },
  },

  actions: {
    // Charge tous les goodies depuis `data.js`
    getAllGoodies({ commit }) {
      commit("setGoodies", goodies);
    },

    // Ajoute un article au panier
    ajouterAuPanier({ commit }, goodie) {
      if (goodie.stock > 0) {
        commit("ajouterAuPanier", goodie);
      } else {
        alert("Cet article est en rupture de stock !");
      }
    },

    // Retire un article du panier
    retirerDuPanier({ commit }, goodie) {
      commit("retirerDuPanier", goodie);
    },

    // Valide la commande et vide le panier
    validerCommande({ commit, state }) {
      if (state.panier.length === 0) {
        alert("Votre panier est vide.");
        return;
      }
      alert(`Commande validée ! Total : ${state.panier.reduce((total, item) => total + item.prix * item.quantite, 0)} €.`);
      commit("viderPanier");
    },
  },

  getters: {
    // Récupère tous les goodies
    goodies: (state) => state.goodies,

    // Récupère un article par son ID
    getArticleById: (state) => (id) => {
      return state.goodies.find((item) => item.id == id) || null;
    },

    // Récupère le panier
    panier: (state) => state.panier,

    // Calcule le total du panier
    totalPanier: (state) =>
      state.panier.reduce((total, item) => total + item.prix * item.quantite, 0),
  },
};
