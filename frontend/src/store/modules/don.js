import MoneyService from "@/services/money.service";

export default {
    namespaced : true,
    state: () => ({

        totalDons:0

    }),
    mutations: {
        updateTotalDons:(state, total) => {
            state.totalDons = total;
        },
    },
    actions: {
        async getTotalDons({ commit }){
            let response = await MoneyService.getTotalDons();
            if (response.error === 0){
                commit("updateTotalDons", response.data);
            }else{
                console.log(response.data);
            }
        },
    },
}