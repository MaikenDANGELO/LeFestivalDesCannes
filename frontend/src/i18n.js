import Vue from "vue";
import VueI18n from "vue-i18n";
import messages from "./texts";
import store from "./store"; // Assure-toi que ton store est bien importé

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: store.state.langue.currentLanguage, // On récupère la langue depuis Vuex
    fallbackLocale: "en",
    messages
});

// Surveiller les changements de langue dans Vuex et mettre à jour VueI18n
store.watch(
    (state) => state.langue.currentLanguage,
    (newLang) => {
        console.log("🔄 Mise à jour de la langue dans i18n :", newLang);
        i18n.locale = newLang;
    }
);

export default i18n;
