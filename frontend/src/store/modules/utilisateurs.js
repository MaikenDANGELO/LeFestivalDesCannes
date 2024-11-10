
export default {
    namespaced : true,
    state: () =>({
        utilisateur: {
            role: '',
            nom: '',
            id: 0,
            estConnecte:false,
        },
    }),
    mutations:{
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
    },
    actions:{
        logout({ commit }) {
            commit('LOGOUT');
        },
        logIn({ commit }, data){
            commit('SET_USER', data)
        },
    }
}