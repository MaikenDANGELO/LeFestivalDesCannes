import PrestatairesService from "@/services/prestataires.service";

export default {
    namespaced : true,
    state: () => ({
        prestataires: [],
        avis_prestataire: [],
        avis_prestataire_global : []
    }),
    mutations: {
        updatePrestataires: (state, prestataires) => {
            state.prestataires = prestataires;
        },
        updateAvisPrestataire: (state, avis_prestataire) => {
            state.avis_prestataire = avis_prestataire;

        },
        updateTousAvis: (state, tous_avis) => {
            state.avis_prestataire_global = tous_avis;
        },
        modifyEmplacement: () => {},
    },
    actions: {
        async getAllPrestataires({ commit }) {
            //console.log("récupération des prestataires");
            let response = await PrestatairesService.getAllPrestataires();
            if (response.error === 0) {
                await commit("updatePrestataires", response.data);
            } else {
                console.log(response.data);
            }
        },
        async getPrestataireAvis({commit}, id_prestataire) {
            let response = await PrestatairesService.getAvisOfPrestataire(id_prestataire);
            if (response.error === 0){
                commit("updateAvisPrestataire", response.data);
            }else{
                commit("updateAvisPrestataire", []);
            }
        },
        async getAllAvis({commit}) {
            let response = await PrestatairesService.getAllRatings();
            if (response.error === 0){
                commit("updateTousAvis", response.data);
            }else{
                console.log(response.data);
            }
        },
        async modifyEmplacementPrestataire({commit},array){
            let idPrest = array[0];
            let emplacementId = array[1];
            let response = await PrestatairesService.modifyEmplacementPrestataire(idPrest,emplacementId)
            if(response.error === 0){
                commit("modifyEmplacement");
            }else{
                console.log(response.data);
            }
        },
    }
}