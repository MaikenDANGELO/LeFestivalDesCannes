import LocalSource from "@/datasource/controller";

async function getTotalDons(){
    return LocalSource.totalDons();
}

async function getTotalDonsOf(prestId) {
    return LocalSource.getTotalDonsOf(prestId);
}

async function makeDonation(userId, prestaId, amount, message){
    return LocalSource.makeDonation(userId, prestaId, amount, message);
}

export default {
    getTotalDons,
    getTotalDonsOf,
    makeDonation,
}