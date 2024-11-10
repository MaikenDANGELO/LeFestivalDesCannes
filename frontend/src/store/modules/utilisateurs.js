import usersService from '@/services/users.service';

export default {
    namespaced : true,
    state: () =>({
        utilisateur: {
            role: '',
            nom: '',
            id: 0,
            estConnecte:false,
        },
        utilisateurs: [],
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
        UPDATE_USERS(state, users){
            state.utilisateurs = users;
        }
    },
    actions:{
        logout({ commit }) {
            commit('LOGOUT');
        },
        logIn({ commit }, data){
            commit('SET_USER', data)
        },
        async getAllUsers({ commit }){
            console.log("récupération des utilisateurs");
            let response = await usersService.getAllUsers();
            if (response.error === 0) {
                commit('UPDATE_USERS', response.data);
            } else {
                console.log(response.data);
            }
        }
    }
}