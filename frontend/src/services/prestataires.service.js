import LocalSource from "@/datasource/controller";
import {getRequest, postRequest} from "@/services/axios.service";


async function getAllPrestataires() {
    let response;
    try {
        response = await getAllPrestatairesFromAPI()
    } catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des prestataires'  }
    }
    return response
}

async function getAvisOfPrestataire(id_prestataire){
    let response;
    try{
        response = await getAvisOfPrestataireFromAPI(id_prestataire);
    }catch(err){
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des commentaires'  }
    }
    return response;
}

async function sendAvisOfUser(data){
    let response;
    try {
        response = await sendAvisOfUserFromAPI(data);
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
async function declineDemandePrest(id, id_utilisateur) {
    try {
        const response = await declineDemandePrestFromAPI(id);
        if (response.error === 0) {
            await sendNotification(id_utilisateur, "Votre demande de prestataire a été refusée.");
        }
        return response;
    } catch (error) {
        return { error: 1, status: 500, data: "Erreur réseau lors du refus du prestataire." };
    }
}




async function acceptDemandePrest(prestataire) {
    try {
        const response = await acceptDemandePrestFromAPI(prestataire);
        if (response.error === 0) {
            await sendNotification(prestataire.id_utilisateur, "Votre demande de prestataire a été acceptée !");
        }
        return response;
    } catch (error) {
        return { error: 1, status: 500, data: "Erreur réseau lors de l'acceptation du prestataire." };
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

async function sendNotification(id_user, message) {
    return sendNotificationFromAPI(id_user, message);
}

async function getAllRatings(){
    let response;
    try{
        response = await getAllRatingFromAPI();
        //response = await getAllRatingFromAPI();
    }
    catch(error){
        response = {error: 1, status: 404, data:  'erreur réseau, impossible de récupérer les avis'}
    }
    return response;
}

async function getAllDisponibiliteResto(id){
    let response;
    try{
        response = await getAllDisponibiliteRestoFromAPI(id);

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
    }
    catch(error){
        response = {error: 1, status: 404, data:  'erreur réseau, impossible de récupérer les disponibilités restos'}
    }
    return response;
}

async function makeReservation(user_id, date, hour, type, data){
    console.log(user_id, date, hour, type, data)
    let response;
    try{
        response = await LocalSource.makeReservation(user_id,date,hour,type,data);
    }catch(error){
        response = {error: 1, status: 404, data:  'erreur réseau, impossible de créer la réservation'}
    }
    return response;
}

async function getAllReservationsFromLocalSource(){
    return LocalSource.getAllReservations();
}

async function getAllReservations(){
    let response;
    try{
        response = null;
    }catch(error){
        response = {error: 1, status: 500, data: 'erreur réseau, impossible de récupérer les réservations'};
    }
    return response;
}

async function getReservationsfromUid(user_id) {
    try {
        let response = await getAllReservationsFromLocalSource();

        // Vérifiez si l'objet retourné a une clé 'data' et si elle contient un tableau
        if (response.error !== 0 || !Array.isArray(response.data)) {
            throw new Error("Les données récupérées ne sont pas valides");
        }

        // Filtrer les balades à partir de la clé 'data'
        let reservationsUtilisateur = response.data.filter(
            reservation => reservation.reserved_user_id === user_id
        );

        return { error: 0, status: 200, data: reservationsUtilisateur };
    } catch (error) {
        console.error("Erreur lors de la récupération des réservations :", error.message);
        return { error: 1, status: 404, data: error.message };
    }
}

async function cancelReservation(id, user_role){
    let response;
    try{
        response = await LocalSource.cancelReservation(id,user_role);
    }catch(error){
        response = {error: 1, status: 500, data: "impossible d'annuler la réservation, erreur réseau"};
    }
    return response;
}

async function getAllClassementConcoursFromLocalSource(){
    return LocalSource.getAllClassementConcours();
}

async function getAllClassementConcours(){
    let response;
    try{
        response = await getAllClassementConcoursFromLocalSource();
    }catch(error){
        response = {error: 1, status: 500, data: "erreur lors de la récupération du classement"};
    }
    return response;
}

async function changeDataPrestService(data){
    let response;
    try{
        console.log(data);
        response = await LocalSource.changeDataPrest(data);
    }catch(error){
        response = {error: 1, status: 500, data: "erreur lors de la récupération du classement"};
    }
    return response;
}


async function getAllPrestatairesFromAPI(){
    return getRequest('/api/prestataires/', 'getAllPrestataires');
}

async function getAvisOfPrestataireFromAPI(id_prestataire){
    return getRequest('/api/prestataires/getAvis/' + id_prestataire, 'getAvisOfPrestataire');
}

async function sendNotificationFromAPI(id_user, message) {
    return postRequest("/api/notif/send", { id_user, message }, "sendNotification");
}


async function sendAvisOfUserFromAPI(data){
    return postRequest('/api/users/sendAvis', data, 'sendAvisOfUser');
}

async function declineDemandePrestFromAPI(id) {
    return postRequest("/api/prestataires/decline", { id }, "declineDemandePrest");
}

async function acceptDemandePrestFromAPI(prestataire) {
    return postRequest("/api/prestataires/accept", { id: prestataire.id }, "acceptDemandePrest");
}

/*
async function sendFormPrestataireFromAPI(data){
    return postRequest('/api/prestataires/sendForm', data, 'sendFormPrestataire');
}
*/

async function getAllRatingFromAPI(){
    return getRequest('/api/prestataires/getAllAvis', 'getAllRatings');
}

async function getPrestGastroService(){
    let response
    response = await getPrestGastroFromAPI()
    return response
}


async function getPrestGastroFromAPI(){
    return await getRequest('/api/prestataires/getPrestGastro', 'getPrestGastro');
}

async function getAllDisponibiliteRestoFromAPI(id){
    return getRequest(`/api/prestataires/getAllDisponibiliteResto/` + id, 'getAllDisponibiliteResto');
}

export default {
    getAllRatings,
    getAllPrestataires,
    getAvisOfPrestataire,
    sendAvisOfUser,
    modifyEmplacementPrestataire,
    sendFormPrestataire,
    getAllDemandePrestataire,
    declineDemandePrest,
    acceptDemandePrest,
    deletePretataire,
    getAllDisponibiliteResto,
    getAllReservations,
    makeReservation,
    getReservationsfromUid,
    cancelReservation,
    getAllClassementConcours,
    sendNotification,
    changeDataPrestService,
    getPrestGastroService
}
