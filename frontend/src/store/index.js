import Vue from "vue";
import Vuex from "vuex";
import don from "./modules/don";
import utilisateurs from "./modules/utilisateurs";
import prestataire from "./modules/prestataire";
import sponsors from "./modules/sponsors";
import associations from "./modules/associations";
import boutique from "./modules/boutique";
import langue from "@/store/modules/langue";


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    don,
    utilisateurs,
    prestataire,
    sponsors,
    associations,
    boutique,
    langue,
  },
});
