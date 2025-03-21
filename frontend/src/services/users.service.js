import {getRequest, deleteRequest, postRequest, putRequest} from "@/services/axios.service";

async function signUpService(data){
    let response;
    try{
        response = await signUpFromAPI(data);
    }catch(error){
        response = {error: 1, status: 404, data:  'erreur réseau, impossible de s\'inscrire'}
    }
    return response;
}

async function logInService(data){
    let response;
    try{
        response = await logInFromAPI(data);
    }catch(error){
        response = {error: 1, status: 404, data:  'erreur réseau, impossible de se connecter'}
    }
    return response;
}

async function logOutService(){
    let response;
    try{
        response = await logOutFromAPI();
    }catch(error){
        response = {error: 1, status: 404, data:  'erreur réseau, impossible de se déconnecter'}
    }
    return response;
}

async function checkSessionService(){
    let response;
    try{
        response = await checkSessionFromAPI();
    }catch(error){
        response = {error: 1, status: 404, data:  'erreur réseau, impossible de vérifier la session'}
    }
    return response;
}

async function getAllUsers() {
    let response;
    try{
        response = await getAllUsersFromAPI();
    }catch(err){
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des utilisateurs'  }
    }
    return response;
}

async function deleteAvis(id){
    let response;
    try{
        response = await deleteAvisFromAPI(id);
    }catch(err){
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des utilisateurs'  }
    }
    return response;
}

async function modifyAvis(data, id){
    let response;
    try{
        response = await modifyAvisFromAPI(data, id);
    }catch(error){
        response = {error: 1, status: 404, data:  'erreur réseau, impossible d\'envoyer le formulaire'}
    }
    return response;
}

async function getNotificationByUserID(id){
    let response;
    try{
        response = await getNotificationByUserIDFromAPI(id)
    }catch(error){
        response = {error: 1, status: 404, data:  'erreur réseau'}
    }
    return response;
}


async function changePersonnalData(data){
    let response;
    try{
        response = await changePersonnalDataFromAPI(data);
    }catch(error){
        response = {error: 1, status: 404, data:  'erreur réseau'}
    }
    return response;
}

async function changePassword(id,actualPassword,newPassword){
    let response;
    try{
       response = await changePasswordFromAPI({id:id, actualPassword: actualPassword, newPassword:newPassword});
    }catch(error){
        response = {error: 1, status: 404, data:  'erreur réseau'}
    }
    return response;
}

async function logInFromAPI(data){
    return await postRequest('/api/users/connexion', data, 'login');
}

async function logOutFromAPI(){
    return await getRequest('/api/users/logout', 'logout');
}

async function getAllUsersFromAPI(){
    return await getRequest('/api/users/getAllUser', 'getAllUser');
}


async function deleteAvisFromAPI(id){
    return await deleteRequest('/api/users/deleteAvis', 'deleteAvis', {id:id});
}

async function checkSessionFromAPI(){
    return await getRequest('/api/users/', 'checkSession');
}

async function signUpFromAPI(data){
    return await postRequest('/api/users/signup', data, 'signup');
}


async function modifyAvisFromAPI(data, id){
    return await putRequest('/api/users/modifyAvis', {texte:data[2],note:data[1], id:id},'modifyAvis');
}


async function getNotificationByUserIDFromAPI(id){
    return await getRequest(`/api/users/getNotificationByUserID/${id}`, 'getNotificationByUserID');
}

async function changePersonnalDataFromAPI(data){
    return await putRequest('/api/users/changePersonnalData', data,'changePersonnalData');
}

async function changePasswordFromAPI(data){
    return await putRequest('/api/users/changePassword', data,'changePassword');
}


export default{
    getAllUsers,
    deleteAvis,
    modifyAvis,
    getNotificationByUserID,
    changePersonnalData,
    changePassword,
    logInService,
    logOutService,
    checkSessionService,
    signUpService
}