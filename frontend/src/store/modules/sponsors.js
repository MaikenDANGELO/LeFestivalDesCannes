import SponsorsService from "@/services/sponsors.service";


export default {
    namespaced : true,
    state: () => ({
        sponsors: [],
    }),
    mutations: {
        updateSponsors: (state, sponsors) => {
            state.sponsors = sponsors;
        },
    },
    actions: {
        async getAllSponsors({ commit }) {
            console.log("récupération des sponsors");
            let response = await SponsorsService.getAllSponsors();
            if (response.error === 0) {
                commit("updateSponsors", response.data);
            } else {
                console.log(response.data);
            }
        },
    }
}