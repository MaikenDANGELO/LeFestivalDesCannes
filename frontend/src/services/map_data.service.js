import LocalSource from "@/datasource/controller";

async function getAllMapDataFromLocalSource() {
    return LocalSource.getAllMapData();
}

async function getAllEmplacementsFromLocalSource() {
    return LocalSource.getAllEmplacements();
}

async function getAllMapData() {
    let response;
    try{
        response = await getAllMapDataFromLocalSource();
    }catch(err){
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des données cartographique'  }
    }
    return response;
}

async function getAllEmplacements() {
    let response;
    try{
        response = await getAllEmplacementsFromLocalSource();
    }catch(err){
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des emplacements prestataires'  }
    }
    return response;
}

async function updateEmplacement(emplacement_id,coords){
    let response;
    try{
        response = await LocalSource.updateSingleEmplacement(emplacement_id,coords);
    }catch(err){
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de mettre Ã  jour l\'emplacement'  }
    }
    return response;

}

export default{
    getAllMapData,
    getAllEmplacements,
    updateEmplacement
}
