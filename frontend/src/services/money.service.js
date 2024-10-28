import LocalSource from "@/datasource/controller";

async function getTotalDons(){
    return LocalSource.totalDons();
}

export default {
    getTotalDons,
}