import LocalSource from "@/datasource/controller";
import { postRequest } from "@/services/axios.service";

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

async function declineDemandePrestFromAPI(id) {
    return postRequest("/api/prestataires/decline", { id }, "declineDemandePrest");
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
async function acceptDemandePrestFromAPI(prestataire) {
    return postRequest("/api/prestataires/accept", { id: prestataire.id }, "acceptDemandePrest");
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
async function sendNotificationFromAPI(id_user, message) {
    return postRequest("/api/notif/send", { id_user, message }, "sendNotification");
}




async function getAllRatings(){
    let response;
    try{
        response = await LocalSource.getAllRatings();
        //response = await getAllRatingFromAPI();
    }
    catch(error){
        response = {error: 1, status: 404, data:  'erreur réseau, impossible de récupérer les avis'}
    }
    return response;
}

async function getAllDisponibiliteResto(){
    let response;
    try{
        response = await LocalSource.getAllDisponibiliteResto();
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
        response = await getAllPrestatairesFromLocalSource();
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
/*

async function getAllPrestatairesFromAPI(){
    return getRequest('/api/prestataires/', 'getAllPrestataires');
}

async function getAvisOfPrestataireFromAPI(id_prestataire){
    return getRequest('/api/prestataires/getAvis/' + id_prestataire, 'getAvisOfPrestataire');
}

async function sendAvisOfUserFromAPI(data){
    return postRequest('/api/prestataires/sendAvis', data, 'sendAvisOfUser');
}

async function sendFormPrestataireFromAPI(data){
    return postRequest('/api/prestataires/sendForm', data, 'sendFormPrestataire');
}

async function getAllRatingFromAPI(){
    return getRequest('/api/prestataires/getAllAvis', 'getAllRatings');
}

async function getAllDisponibiliteRestoFromAPI(){
    return getRequest('/api/prestataires/getAllDispo', 'getAllDisponibiliteResto');
}

 */

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
    changeDataPrestService
}
