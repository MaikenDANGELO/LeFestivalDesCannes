/*
import Vue from "vue";
import Vuex from "vuex";
import PrestatairesService from "../services/prestataires.service";
import MoneyService from "../services/money.service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: () => ({
    prestataires: [],
    utilisateur: {
      role: '',
      nom: '',
      id: 0,
      estConnecte:false,
    },
    avis_prestataire: [],
    totalDons:0

  }),
  getters: {},
  mutations: {
    updatePrestataires: (state, prestataires) => {
      state.prestataires = prestataires;
    },
    SET_USER(state, user) {
      state.utilisateur.nom = user.nom_utilisateur;
      state.utilisateur.role = user.role;
      state.utilisateur.id = user.id_utilisateur
      state.utilisateur.estConnecte = true
    },
    LOGOUT(state) {
      state.utilisateur = {
        role: '',
        nom: '',
        id:0,
        estConnecte: false,
      };

    },
    updateAvisPrestataire: (state, avis_prestataire) => {
      state.avis_prestataire = avis_prestataire;
    },
    updateTotalDons:(state, total) => {
      state.totalDons = total;
    },
  },
  actions: {
    async getAllPrestataires({ commit }) {
      console.log("récupération des prestataires");
      let response = await PrestatairesService.getAllPrestataires();
      if (response.error === 0) {
        commit("updatePrestataires", response.data);
      } else {
        console.log(response.data);
      }
    },
    async getPrestataireAvis({commit}, id_prestataire) {
      console.log("récupération des avis du prestataire "+id_prestataire);
      let response = await PrestatairesService.getAvisOfPrestataire(id_prestataire);
      if (response.error === 0){
        commit("updateAvisPrestataire", response.data);
      }else{
        console.log(response.data);
      }
    },
    logout({ commit }) {
      commit('LOGOUT');
    },
    async logIn({ commit }, data){
      commit('SET_USER', data)
    },
    async getTotalDons({ commit }){
      let response = await MoneyService.getTotalDons();
      if (response.error === 0){
        commit("updateTotalDons", response.data);
      }else{
        console.log(response.data);
      }
    },
  },
  modules: {},
});
*/

import Vue from "vue";
import Vuex from "vuex";
import don from "./modules/don";
import utilisateurs from "./modules/utilisateurs";
import prestataire from "./modules/prestataire";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    don,
    utilisateurs,
    prestataire,
  },
});
