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
    }
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
    logout({ commit }) {
      commit('LOGOUT');
    },
     async logIn({ commit }, data){
      commit('SET_USER', data)
    }
  },
  modules: {},
});

