import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import PrestatairesService from "../services/prestataires.service";

export default new Vuex.Store({
  state: () => ({
    prestataires: [],
  }),
  getters: {},
  mutations: {
    updatePrestataires: (state, prestataires) => {
      state.prestataires = prestataires;
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
  },
  modules: {},
});

