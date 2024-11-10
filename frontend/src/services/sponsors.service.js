import LocalSource from "@/datasource/controller";

async function getAllSponsorsFromLocalSource(){
    return LocalSource.getAllSponsors();
}

async function getAllSponsors() {
    let response;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getAllSponsorsFromLocalSource();
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de récupérer la liste des sponsors'  }
    }
    return response
}

export default {
    getAllSponsors,
}