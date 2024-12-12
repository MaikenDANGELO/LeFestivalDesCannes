import LocalSource from '@/datasource/controller';

async function getAllUsersFromLocalSource() {
    return LocalSource.getAllUsers();
}

async function getAllUsers() {
    let response;
    try{
        response = await getAllUsersFromLocalSource();
    }catch(err){
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des utilisateurs'  }
    }
    return response;
}

async function deleteAvis(id){
    let response;
    try{
        response = await LocalSource.deleteAvis(id);
    }catch(err){
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des utilisateurs'  }
    }
    return response;
}

async function modifyAvis(data, id){
    let response;
    try{
        response = await LocalSource.modifyAvis(data, id);
    }catch(error){
        response = {error: 1, status: 404, data:  'erreur réseau, impossible d\'envoyer le formulaire'}
    }
    return response;
}

async function getNotificationByUserID(id){
    let response;
    try{
        response = await LocalSource.getNotificationByUserID(id);
    }catch(error){
        response = {error: 1, status: 404, data:  'erreur réseau'}
    }
    return response;
}
async function markAllAsRead(id){
    let response;
    try{
        await LocalSource.markAllAsRead(id);
    }catch(error){
        response = {error: 1, status: 404, data:  'erreur réseau'}
    }
    return response;
}

async function changePersonnalData(data, id){
    let response;
    try{
        response = await LocalSource.changePersonnalData(data, id);
    }catch(error){
        response = {error: 1, status: 404, data:  'erreur réseau'}
    }
    return response;
}

async function changePassword(id,actualPassword,newPassword){
    let response;
    try{
        response = await LocalSource.changePassword(id,actualPassword,newPassword);
    }catch(error){
        response = {error: 1, status: 404, data:  'erreur réseau'}
    }
    return response;
}


export default{
    getAllUsers,
    deleteAvis,
    modifyAvis,
    getNotificationByUserID,
    markAllAsRead,
    changePersonnalData,
    changePassword
}