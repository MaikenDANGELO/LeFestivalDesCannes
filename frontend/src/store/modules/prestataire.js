import PrestatairesService from "@/services/prestataires.service";

export default {
    namespaced : true,
    state: () => ({
        prestataires: [],
        avis_prestataire: [],
    }),
    mutations: {
        updatePrestataires: (state, prestataires) => {
            state.prestataires = prestataires;
        },
        updateAvisPrestataire: (state, avis_prestataire) => {
            state.avis_prestataire = avis_prestataire;
        },
        modifyEmplacement: () => {}
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
        async getPrestataireAvis({commit}, id_prestataire) {
            console.log("récupération des avis du prestataire "+id_prestataire);
            let response = await PrestatairesService.getAvisOfPrestataire(id_prestataire);
            if (response.error === 0){
                commit("updateAvisPrestataire", response.data);
            }else{
                console.log(response.data);
            }
        },
        async modifyEmplacementPrestataire({commit},array){
            let idPrest = array[0];
            let emplacementId = array[1];
            console.log("modification de l'emplacement du prestataire "+idPrest+" à "+emplacementId);
            let response = await PrestatairesService.modifyEmplacementPrestataire(idPrest,emplacementId)
            if(response.error === 0){
                console.log(response.data);
                commit("modifyEmplacement");
            }else{
                console.log(response.data);
            }
        }
    }
}