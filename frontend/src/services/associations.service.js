import {getRequest} from "@/services/axios.service";


async function getAllAssociations() {
    let response;
    try{
        response = await getAllAssociationFromAPI();
    }catch(error){
        response = {error: 1, status: 404, data: "erreur de récupération des associations"};
    }
    return response;
}



async function getAllAssociationFromAPI() {
    return await getRequest('/api/associations/', 'getAllAssociation');
}

export default {
    getAllAssociations,
}