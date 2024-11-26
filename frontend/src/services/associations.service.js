import LocalSource from "@/datasource/controller";

async function getAllAssociationFromLocalSource() {
    return LocalSource.getAllAssociation();
}

async function getAllAssociations() {
    let response;
    try{
        response = await getAllAssociationFromLocalSource();
    }catch(error){
        response = {error: 1, status: 404, data: "erreur de récupération des associations"};
    }
    return response;
}

export default {
    getAllAssociations,
}