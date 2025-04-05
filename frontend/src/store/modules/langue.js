export default {
    namespaced: true,
    state: () => ({
        currentLanguage: 'fr' // Langue par défaut
    }),
    mutations: {
        SET_LANGUAGE(state, newLang) {
            state.currentLanguage = newLang;
        }
    },
    actions: {
        toggleLanguage({ commit, state }) {
            const newLang = state.currentLanguage === 'fr' ? 'en' : 'fr';
            //console.log('Changement de langue:', newLang); // Vérifie si ça change bien
            commit('SET_LANGUAGE', newLang);
        }
    }

};
