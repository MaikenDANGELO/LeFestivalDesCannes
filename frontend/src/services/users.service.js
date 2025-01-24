import LocalSource from '@/datasource/controller';
//import {getRequest, deleteRequest, putRequest} from "@/services/axios.service";

async function getAllUsersFromLocalSource() {
    return LocalSource.getAllUsers();
}

async function getAllUsers() {
    let response;
    try{
        response = await getAllUsersFromLocalSource();
        //response = await getAllUsersFromAPI();
    }catch(err){
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des utilisateurs'  }
    }
    return response;
}

async function deleteAvis(id){
    let response;
    try{
        response = await LocalSource.deleteAvis(id);
        //response = await deleteAvisFromAPI(id);
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
        //response = await getNotificationByUserIDFromAPI()
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
        //response = await changePersonnalDataFromAPI(data);
    }catch(error){
        response = {error: 1, status: 404, data:  'erreur réseau'}
    }
    return response;
}

async function changePassword(id,actualPassword,newPassword){
    let response;
    try{
        response = await LocalSource.changePassword(id,actualPassword,newPassword);
        //response = await changePasswordFromAPI({actualPassword,newPassword});
    }catch(error){
        response = {error: 1, status: 404, data:  'erreur réseau'}
    }
    return response;
}

/*
async function getAllUsersFromAPI(){
    return await getRequest('/api/users/getAllUser', 'getAllUser');
}

async function deleteAvisFromAPI(id){
    return await deleteRequest('/api/users/deleteAvis', id, 'deleteAvis');
}

async function modifyAvisFromAPI(data, id){
    return await putRequest('/api/users/modifyAvis', {data, id},'modifyAvis');
}

async function getNotificationByUserIDFromAPI(){
    return await getRequest('/api/users/getNotificationByUserID', 'getNotificationByUserID');
}

async function changePersonnalDataFromAPI(data){
    return await putRequest('/api/users/changePersonnalData', data,'changePersonnalData');
}

async function changePasswordFromAPI(data){
    return await putRequest('/api/users/changePassword', data,'changePassword');
}
 */

export default{
    getAllUsers,
    deleteAvis,
    modifyAvis,
    getNotificationByUserID,
    markAllAsRead,
    changePersonnalData,
    changePassword
}