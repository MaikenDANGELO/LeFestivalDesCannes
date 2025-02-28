import LocalSource from "@/datasource/controller";
//import {getRequest, patchRequest} from "@/services/axios.service";

async function getAllbaladesFromLocalSource() {
    return LocalSource.getAllbalades();
}

async function getbaladesfromUid(user_id) {
    try {
        let response = await getAllbaladesFromLocalSource();
        //response = await getbaladesfromUidFromAPI();

        // Vérifiez si l'objet retourné a une clé 'data' et si elle contient un tableau
        if (response.error !== 0 || !Array.isArray(response.data)) {
            throw new Error("Les données récupérées ne sont pas valides");
        }

        // Filtrer les balades à partir de la clé 'data'
        let baladesUtilisateur = response.data.filter(
            balade => balade.reserved_user_id === user_id
        );

        return { error: 0, status: 200, data: baladesUtilisateur };
    } catch (error) {
        console.error("Erreur lors de la récupération des balades :", error.message);
        return { error: 1, status: 404, data: error.message };
    }
}


async function getAllBalades() {
    let response;
    try {
        response = await getAllbaladesFromLocalSource();
        //response = await getAllBaladesFromAPI();
        //console.log('Balades' + response.data);
    } catch (error) {
        return {error: 1, status: 404, data: 'Erreur de récupération des balades'}
    }
    return response;
}


async function reservebalade(balade_id, user_id){
    let response;
    try {
        response = await LocalSource.reservebalade(balade_id, user_id);
        //response = await reservebaladeFromAPI(balade_id);
        console.log('reservation pour la balade ' + balade_id + ' par l\'utilisateur ' + user_id + response.data);
    }
    catch (error){
        return {error:1,status:404,data : error.message}
    }
    return response;
}

async function cancelbalade(balade_id, user_role){
    let response;
    try {
        response = await LocalSource.cancelBaladeReservation(balade_id, user_role);
        //response = await cancelbaladeFromAPI(balade_id);

    }
    catch (error){
        return {error:1,status:404,data : error.message}
    }
    console.log('Annulation : ' + response)
    return response;
}

/*
async function getbaladesfromUidFromAPI() {
    getRequest('/api/prestataires/getbaladesfromUid', 'getbaladesfromUid')
}

async function getAllBaladesFromAPI() {
    getRequest('/api/prestataires/getAllBalades', 'getAllBalades')
}

async function reservebaladeFromAPI(balade_id) {
    patchRequest('/api/prestataires/reservebalade' + balade_id,null, 'reservebalade')
}

async function cancelbaladeFromAPI(balade_id) {
    patchRequest('/api/prestataires/cancelbalade' + balade_id, null,'cancelbalade')getRequest
}

 */

export default {
    getbaladesfromUid,
    getAllBalades,
    reservebalade,
    cancelbalade
}