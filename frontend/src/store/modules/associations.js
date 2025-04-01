import AssociationsService from "@/services/associations.service";


export default {
    namespaced : true,
    state: () => ({
        associations: [],
    }),
    mutations: {
        updateAssociations: (state, associations) => {
            state.associations = associations;
        },
    },
    actions: {
        async getAllAssociations({ commit }) {
            let response = await AssociationsService.getAllAssociations();
            if (response.error === 0) {
                commit("updateAssociations", response.data);
            } else {
                console.log(response.data);
            }
        },
    }
}