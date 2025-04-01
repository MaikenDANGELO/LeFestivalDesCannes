import {getRequest, putRequest} from "@/services/axios.service";

async function getAllDemandePrestataire() {
    let response;
    try {
        response = await getAllDemandePrestataireFromAPI()
        if (response && response.data) {
            return { error: 0, status: 200, data: response.data };
        } else {
            throw new Error("Données invalides");
        }
    } catch (error) {
        return { error: 1, status: 404, data: 'Erreur réseau, impossible de récupérer les données.' };
    }
}

async function declineDemandePrest(id){
    let response;
    try {
        response = await declineDemandePrestFromAPI(id);
        if (response && response.data) {
            return { error: 0, status: 200, data: response.data };
        } else {
            throw new Error("Données invalides");
        }
    } catch (error) {
        return { error: 1, status: 404, data: 'Erreur réseau, impossible de récupérer les données.' };
    }
}

async function acceptDemandePrest(id){
    let response;
    try {
        response = await acceptDemandePrestFromAPI(id)
        if (response && response.data) {
            return { error: 0, status: 200, data: response.data };
        } else {
            throw new Error("Données invalides");
        }
    } catch (error) {
        return { error: 1, status: 404, data: 'Erreur réseau, impossible de récupérer les données.' };
    }
}
async function getAllDemandePrestataireFromAPI(){
    return getRequest('/api/administrateur/demandes', 'getAllDemandePrestataire');
}

async function declineDemandePrestFromAPI(id){
    return putRequest(`/api/administrateur/decline/${id}`, {},'declineDemandePrest');
}

async function acceptDemandePrestFromAPI(id){
    return putRequest(`/api/administrateur/accept/${id}`, {}, 'acceptDemandePrest');
}

export {
    getAllDemandePrestataire,
    declineDemandePrest,
    acceptDemandePrest
}