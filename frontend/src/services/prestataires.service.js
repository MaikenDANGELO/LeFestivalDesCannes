import LocalSource from "@/datasource/controller";

async function getAllPrestatairesFromLocalSource() {
    return LocalSource.getAllPrestataires();
}

async function getAllPrestataires() {
    let response;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getAllPrestatairesFromLocalSource()
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des prestataires'  }
    }
    return response
}

async function getAvisOfPrestataire(id_prestataire){
    let response;
    try{
        response = await LocalSource.getAvisOfPrestataire(id_prestataire);
    }catch(err){
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des commentaires'  }
    }
    return response;
}

async function sendAvisOfUser(data){
    let response;
    try {
        response = await LocalSource.sendAvisOfUser(data);
    }catch (error){
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de de publier le commmentaire'  }
    }
    return response
}

async function sendFormPrestataire(data, id_utilisateur){
    let response;
    try{
        response = await LocalSource.sendFormPrestataire(data, id_utilisateur);
    }catch(error){
        response = {error: 1, status: 404, data:  'erreur réseau, impossible d\'envoyer le formulaire'}
    }
    return response;
}

async function modifyEmplacementPrestataire(prestId, emplacementId) {
    let response;
    try{
        response = await LocalSource.modifyEmplacementPrestataire(prestId,emplacementId);
    }
    catch(error){
        response = {error: 1, status: 404, data:  'erreur réseau, impossible de modifier l\'empalcement'}
    }
    return response;
}

async function getAllDemandePrestataire() {
    let response;
    try {
        response = await LocalSource.getAllDemandePrestataire();
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
        response = await LocalSource.declineDemandePrest(id);
        if (response && response.data) {
            return { error: 0, status: 200, data: response.data };
        } else {
            throw new Error("Données invalides");
        }
    } catch (error) {
        return { error: 1, status: 404, data: 'Erreur réseau, impossible de récupérer les données.' };
    }
}

async function acceptDemandePrest(prest){
    let response;
    try {
        response = await LocalSource.acceptDemandePrest(prest);
        if (response && response.data) {
            return { error: 0, status: 200, data: response.data };
        } else {
            throw new Error("Données invalides");
        }
    } catch (error) {
        return { error: 1, status: 404, data: 'Erreur réseau, impossible de récupérer les données.' };
    }
}

async function deletePretataire(id){
    let response;
    try{
        response = await LocalSource.deletePretataire(id);
    }
    catch(error){
        response = {error: 1, status: 404, data:  'erreur réseau, impossible de modifier l\'empalcement'}
    }
    return response
}

export default {
    getAllPrestataires,
    getAvisOfPrestataire,
    sendAvisOfUser,
    modifyEmplacementPrestataire,
    sendFormPrestataire,
    getAllDemandePrestataire,
    declineDemandePrest,
    acceptDemandePrest,
    deletePretataire
}
