import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import PrestatairesService from "../services/prestataires.service";

export default new Vuex.Store({
  state: () => ({
    prestataires: [],
    utilisateur: {
      role: '',
      nom: '',
    },
    avis_prestataire: [],
  }),
  getters: {},
  mutations: {
    updatePrestataires: (state, prestataires) => {
      state.prestataires = prestataires;
    },
    SET_USER(state, user) {
      state.utilisateur.nom = user.nom_utilisateur;
      state.utilisateur.role = user.role;
    },
    LOGOUT(state) {
      state.utilisateur = {
        role: '',
        nom: ''
      };
    },
    updateAvisPrestataire: (state, avis_prestataire) => {
      state.avis_prestataire = avis_prestataire;
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
    }
  },
  modules: {},
});

