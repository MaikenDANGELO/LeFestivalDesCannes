import Vue from "vue";
import Vuex from "vuex";
import don from "./modules/don";
import utilisateurs from "./modules/utilisateurs";
import prestataire from "./modules/prestataire";
import sponsors from "./modules/sponsors";
import associations from "./modules/associations";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    don,
    utilisateurs,
    prestataire,
    sponsors,
    associations,
  },
});
