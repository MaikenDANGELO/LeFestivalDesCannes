import LocalSource from "@/datasource/controller";

async function getAllPrestatairesFromLocalSource() {
    return LocalSource.getAllPrestataires();
}

async function getAllPrestataires() {
    let response = null;
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


export default {
    getAllPrestataires,
    getAvisOfPrestataire,
    sendAvisOfUser,
}
