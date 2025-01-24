import LocalSource from "@/datasource/controller";
//import {getRequest} from "@/services/axios.service";

async function getAllAssociationFromLocalSource() {
    return LocalSource.getAllAssociation();
}

async function getAllAssociations() {
    let response;
    try{
        response = await getAllAssociationFromLocalSource();
        //response = await getAllAssociationFromAPI();
    }catch(error){
        response = {error: 1, status: 404, data: "erreur de récupération des associations"};
    }
    return response;
}


/*
async function getAllAssociationFromAPI() {
    return await getRequest('/associations', 'getAllAssociation');
}


 */

export default {
    getAllAssociations,
}