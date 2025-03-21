import {getRequest, patchRequest} from "@/services/axios.service";


async function getbaladesfromUid(user_id) {
    try {
        let response = await getAllBalades();

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
        response = await getAllBaladesFromAPI();

        for (const responseElement of response.data) {
            responseElement.date = responseElement.date.split('T')[0];
            responseElement.heure = responseElement.heure.split(':')[0] + 'h' + responseElement.heure.split(':')[1];
        }
        response.data.sort(
            (a, b) => {
                const timeA = a.heure.replace('h', ':');
                const timeB = b.heure.replace('h', ':');
                return new Date(`${a.date}T${timeA}:00`) - new Date(`${b.date}T${timeB}:00`)
        })


    } catch (error) {
        console.log('error', error);
        return {error: 1, status: 404, data: 'Erreur de récupération des balades'}
    }
    return response;
}


async function reservebalade(balade_id, user_id){
    let response;
    try {
        response = await reservebaladeFromAPI(balade_id, user_id);
    }
    catch (error){
        return {error:1,status:404,data : error.message}
    }
    return response;
}

async function cancelbalade(balade_id){
    let response;
    try {
        response = await cancelbaladeFromAPI(balade_id);

    }
    catch (error){
        return {error:1,status:404,data : error.message}
    }
    return response;
}

async function getAllBaladesFromAPI() {
    return getRequest('/api/prestataires/getAllBalades', 'getAllBalades')
}


async function reservebaladeFromAPI(balade_id, user_id) {
    return patchRequest('/api/prestataires/reservebalade/' + balade_id, {user_id}, 'reservebalade')
}

async function cancelbaladeFromAPI(balade_id) {
    return patchRequest('/api/prestataires/cancelbalade/' + balade_id, {},'cancelbalade')
}



export default {
    getbaladesfromUid,
    getAllBalades,
    reservebalade,
    cancelbalade
}