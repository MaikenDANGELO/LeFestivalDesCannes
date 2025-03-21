import usersService from '@/services/users.service';

export default {
    namespaced : true,
    state: () =>({
        utilisateur: {
            role: '',
            nom: '',
            id: 0,
            email:'',
            adresse:'',
            numero:'',
            estConnecte:false,
        },
        utilisateurs: [],
    }),
    mutations:{
        SET_USER(state, user) {
            state.utilisateur.nom = user.nom_utilisateur;
            state.utilisateur.role = user.role;
            state.utilisateur.id = user.id;
            state.utilisateur.email = user.email_utilisateur
            state.utilisateur.adresse = user.adresse_utilisateur
            state.utilisateur.numero = user.telephone
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
            usersService.logOutService();
            commit('LOGOUT');
        },
        async logIn({ commit }, data){
            let response = await usersService.logInService(data);
            if (response.error === 0) {
                commit('SET_USER', response.data);
                return 0
            } else {
                alert(response.data);
                return 1
            }
        },
        async signUpStore({ commit }, data){
            let response = await usersService.signUpService(data);
            if (response.error === 0) {
                commit('SET_USER', response.data);
                return 0
            } else {
                alert(response.data);
                return 1
            }
        },
        async getAllUsers({ commit }){
            let response = await usersService.getAllUsers();
            if (response.error === 0) {
                commit('UPDATE_USERS', response.data);
            } else {
                console.log(response.data);
            }
        },

        async checkSession({commit}){
            let response = await usersService.checkSessionService()
            if (response.error === 0) {
                commit('SET_USER', response.data)
                return 0
            }
        },

        async changeData({commit}, data){
            commit('SET_USER', data);

        }
    }
}