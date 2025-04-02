import {
    balades,
    prestataires,
    billetterie,
    utilisateurs,
    avis,
    dons,
    sponsors,
    map_data,
    associations,
    demandePrestataires,
    notifications,
    MOTS_DE_PASSE_UTILISATEURS,
    emplacements,
    disponibilitesResto,
    reservations,
    classement_concours,
    shopInfo, canard_defile, commandes
} from "./data";
import bcrypt from 'bcryptjs';

function getAllRatings(){
    return {error : 0, data : avis}
}

function getAllEmplacements() {
    return {error: 0, data: emplacements};
}

function getAllbalades() {
    return{error : 0,data : balades}
}

function getAllPrestataires() {
    return { error: 0, data: prestataires };
}

function getAllSponsors() {
    return { error: 0, data: sponsors };
}

function getAllAssociation() {
    return {error: 0, data: associations};
}

function getAllMapData() {
    return { error: 0, data: map_data };
}

function getAllDisponibiliteResto(){
    return { error: 0, data: disponibilitesResto };
}


function updateSingleEmplacement(emplacement_id,new_coordonnees) {
    try {
        let emplacement = emplacements.find(e => String(e.id) === String(emplacement_id));
        if (!emplacement) return {error: 1, status: 404, data: "emplacement introuvable"};
        emplacement.coordinates = new_coordonnees;
        return {error: 0, status: 200, data: emplacement}

    } catch (error) {
        return {error: 1, status: 404, data: "Erreur lors de la mise à jour de l'emplacement"};
    }
}

function getShopStatusFromId(shop_id){
    try{
        if(!shop_id) return {error: 1, status:404, data:"id shop invalide"}
        let shop = shopInfo.find(s => s.id = shop_id);
        if(!shop)  return {error: 1, status:404, data:"shop introuvable, id invalide"}

        return {error: 0, status:200, data: shop.shopActive};
    }catch(err){
        return {error: 1, status:404, data:"Erreur lors de la récupération du status du shop"}
    }
}

function changeShopStatusFromId(shop_id){
    try{
        if(!shop_id) return {error: 1, status:404, data:"id shop invalide"}
        let shop = shopInfo.find(s => s.id = shop_id);
        if(!shop) return shop;

        shopInfo.splice(shopInfo.indexOf(shop),1);
        shop.shopActive = !shop.shopActive;
        shopInfo.push(shop);
        console.log(shop)
        console.log(shopInfo)
        return {error: 0, status: 200, data:"status du shop modifié avec succès"};
    }catch(err){
        return {error: 1, status: 404, data: "Erreur lors de la modification du status du shop"}
    }
}

function reservebalade(balade_id, user_id){
    try {
        let balade = balades.find(b => b.id_balade === balade_id);
        if (!balade) return { error: 1, status: 404, data: "balade introuvable" };
        if (balade.reserved_user_id !== null) return { error: 1, status: 404, data: "balade déjà réservée" };
        balade.reserved_user_id = user_id;
        //console.log("reserve la balade" + balade)

        let reservationData = {
            id_balade: balade_id
        }
        makeReservation(user_id, balade.date_balade, balade.heure_balade, "Balade", reservationData)

        return { error: 0, status: 200, data: balade }
    }catch{
        return { error: 1, status: 404, data: "Erreur lors de la réservation" };
    }
}


function cancelBaladeReservation(balade_id){
    try {
        let balade = balades.find(b => b.id_balade === balade_id);
        if (!balade) return { error: 1, status: 404, data: "balade introuvable" };
        if (!balade.reserved_user_id) return { error: 1, status: 404, data: "balade non réservée" };

        balade.reserved_user_id = null;

        return { error: 0, status: 200, data: balade }
    }catch{
        return { error: 1, status: 404, data: "Erreur lors de l'annulation de la réservation" };
    }
}

function insertCommandeBillet(vue, total) {
    try {
        const lastBilletterie = billetterie.length > 0 ? billetterie[billetterie.length - 1] : null;

        let newId = lastBilletterie ? lastBilletterie.id_billetterie + 1 : 1;
        let ticketQuantity = 0;
        for (let i = 0; i < vue.form.tickets.length; i++) {
            ticketQuantity += vue.form.tickets[i].quantity;
        }

        let insert = {
            "id_billetterie": newId,
            "nombre_billets": ticketQuantity,
            "prix_total": total,
            "date_achat": new Date().toISOString().split('T')[0],
            "email": vue.form.email,
        };

        // Ajouter l'objet à billetterie
        billetterie.push(insert);
        console.log(billetterie)
        return { error: 0, status: 200 }

    } catch (error) {
        console.error("Erreur lors de l'ajout de la billetterie :", error.message);
        return { error: 1, status: 404, data: "Erreur lors de l'ajout de la billetterie :" + error.message }
    }
}

async function connexion(login, mdp) {
    if (!login) return { error: 1, status: 404, data: "Le login donné n'est pas valide" };
    if (!mdp) return { error: 1, status: 404, data: "Le mot de passe donné n'est pas valide" };

    let Account = utilisateurs.find(u => u.email_utilisateur === login);
    if (!Account) return { error: 1, status: 404, data: "Aucun utilisateur n'est lié à ce login" };


    try {
        const correspond = await bcrypt.compare(mdp, Account.mot_de_passe);
        if (correspond) {
            return { error: 0, status: 200, data: Account };
        } else {
            return { error: 1, status: 404, data: "Le mot de passe ne correspond pas" };
        }
    } catch (error) {
        console.error('Erreur lors de la vérification du mot de passe :', error);
    }
}

async function getAvisOfPrestataire(prestataire_id) {
    if (!prestataire_id) return { error: 1, status: 404, data: "L'identifiant donné n'est pas valide" };
    let prest_commentaires = [];
    avis.forEach((a) => {
        if (parseInt(a['id_prestataire']) === parseInt(prestataire_id)) {
            prest_commentaires.push(a);
        }
    })
    return { error: 0, status: 200, data: prest_commentaires };
}

async function sendAvisOfUser(data) {
    try {
        let newId = avis[avis.length-1].id + 1;
        let insert = {
            id_commentaire: newId,
            id_prestataire: parseInt(data[0]),
            id_utilisateur: data[3],
            texte: data[2],
            note: data[1],
        };
        avis.push(insert);
        return { error: 0, status: 200 }
    } catch (error) {
        return { error: 1, status: 404, data: "Erreur lors de l'ajout de l'avis :" + error.message }
    }
}

async function totalDons() {
    try {
        let total = 0;
        for (let i = 0; i < dons.length; i++) {
            total += dons[i].montant;
        }
        return { error: 0, status: 200, data: total }
    } catch (error) {
        return { error: 1, status: 404, data: error.message }
    }

}


async function getTotalDonsOf(prestId) {
    try {
        let total = 0;
        for (let i = 0; i < dons.length; i++) {
            if (dons[i].id_prestataire == prestId) total += dons[i].montant;
        }
        return { error: 0, status: 200, data: total }
    } catch (error) {
        return { error: 1, status: 404, data: error.message }
    }
}

async function getAllReservations(){
    return {error: 0, status: 200, data: reservations};
}

async function makeReservation(user_id, date, hour, type, data){
    let user = utilisateurs.find(e => e.id_utilisateur === user_id);
    console.log(user_id, date, hour, type, data);
    if(!user) return {error: 1, status: 404, data: "utilisateur introuvable"};
    if(!date || !hour) return  {error: 1, status: 404, data: "date invalide"};
    
    let newId;
    if(reservations.length > 0) newId = (parseInt(reservations[reservations.length-1].id_reservation)+1).toString()
    else newId = 1;
    let reservation = {
        id_reservation: newId,
        type_reservation: type,
        reserved_user_id: user_id,
        date_reservation: date,
        heure_reservation: hour,
        data: data,
    }
    reservations.push(reservation);
    return {error: 0, status: 200, data: "réservation enregistrée"};
}

async function getAllClassementConcours(){
    return {error: 0, status: 200, data: classement_concours};
}

async function cancelReservation(reservation_id, user_role){
    let reservation = reservations.find(e => e.id_reservation === reservation_id)
    if(!reservation) return {error: 1, status: 404, data: "reservation introuvable"}

    if(reservation.type_reservation === "Balade"){
        cancelBaladeReservation(reservation.data.id_balade)
    }

    let message;
    if (user_role === 'admin')  message = 'Réservation du ' + reservation.date_reservation + ' à '+ reservation.heure_reservation +'annulée par l\'organisateur'
    else  message = 'Réservation du ' + reservation.date_reservation + ' à '+ reservation.heure_reservation +'annulée'
    let notif = {
        id:notifications.length,
        id_user:reservation.reserved_user_id,
        message:message
    }
    notifications.push(notif);

    let index = reservations.indexOf(reservation);
    reservations.splice(index, 1);
    return {error: 0, status: 200, data: "reservation annulée"};
}

async function makeDonation(userId, prestaId, amount, message) {
    try {
        // if (amount <= 0) return { error: 1, status: 404, data: "Montant de don invalide" };
        // let prestataire = prestataires.find(p => p.id === prestaId);
        // if(!prestataire) return { error: 1, status: 404, data: "Prestataire invalide" };
        // let user = utilisateurs.find(u => u.id === userId);
        // if(!user) return { error: 1, status: 404, data: "Utilisateur invalide" };

        let newId = dons.length + 1;
        let insert = {
            id: newId,
            id_utilisateur: userId,
            id_prestataire: prestaId,
            message: message,
            montant: amount,
            date: getFormattedDate(),
        };
        dons.push(insert);
        return {error: 0, status: 200, data: insert};
    }catch(error){
        return { error: 1, status: 500, data: error.message }
    }
}

async function signUp(login, mdp, numero, username, adresse){
    try {
        let Account = utilisateurs.find(u => u.email_utilisateur === login);
        if (Account) return { error: 1, status: 404, data: "Cette email a déjà été utilisé " }

        let newId = utilisateurs.length + 1;
        let insert;
        insert = {
            id_utilisateur: newId,
            nom_utilisateur: username,
            email_utilisateur: login,
            mot_de_passe: await bcrypt.hash(mdp, 10),
            adresse_utilisateur: adresse,
            telephone: numero,
            date_inscription: getFormattedDate(),
            role: "utilisateur"
        };
        console.log(insert.mot_de_passe)
        utilisateurs.push(insert);
        return { error: 0, status: 200, data: insert }
    } catch (error) {
        return { error: 1, status: 500, data: error.message }
    }
}

function getFormattedDate() {
    const date = new Date();

    const day = String(date.getDate()).padStart(2, '0');         // Jour (2 chiffres)
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Mois (2 chiffres, +1 car janvier est 0)
    const year = date.getFullYear();                             // Année (4 chiffres)

    const hours = String(date.getHours()).padStart(2, '0');      // Heures (2 chiffres)
    const minutes = String(date.getMinutes()).padStart(2, '0');  // Minutes (2 chiffres)
    const seconds = String(date.getSeconds()).padStart(2, '0');  // Secondes (2 chiffres)

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

function getAllUsers() {
    return { error: 0, data: utilisateurs };
}

function sendFormPrestataire(form, id_utilisateur) {
    if (!form) return {error: 1, status: 500, data: "Le formulaire n'est pas valide"};

    let insert = {
        id: null,
        nom: form.nom,
        description:  form.description,
        description_accueil: form.description_accueil,
        categorie: form.categorie,
        id_emplacement: form.id_emplacement,
        id_evenement: "1",
        page_route: null,
        image: form.image,
        id_utilisateur: id_utilisateur,
        services: form.services
    }
    if(insert.image === null) insert.image = "logo.png"
    try {
        demandePrestataires.push(insert)
        return { error: 0, status:200, data: utilisateurs };
    }catch (error){
        return { error: 1, status:404, data: utilisateurs };
    }
}

function deleteAvis(id) {
    avis.splice(id-1, 1);
    return { error: 0, status:200};
}

function modifyAvis(data, id){
    let insert = {
        id_commentaire: id,
        id_prestataire: parseInt(data[0]),
        id_utilisateur: data[3],
        texte: data[2],
        note: data[1],
    };
    try {
        avis[id-1] = insert;
        return { error: 0, status:200, data:"Avis mis à jour correctement"};
    }catch (error) {
        return { error: 1, status: 500, data: error.message }
    }
}

async function modifyEmplacementPrestataire(prestId, emplacementId) {
    let old = prestataires.find((a) => a.id_emplacement == emplacementId);
    let current = prestataires.find((a) => a.id == prestId);
    if(old){
        let currentOldEmplacement = current.id_emplacement;
        old.id_emplacement = currentOldEmplacement;
        current.id_emplacement = emplacementId; // échange des emplacements
    }else{
        current.id_emplacement = emplacementId;
    }
    return {error: 0, status: 200, data:`Mise à jour de l'emplacement du prestataire ${prestId} à l'id:${emplacementId}`}
}

function getAllDemandePrestataire(){
    return {error:0, status: 200, data: demandePrestataires};
}

function declineDemandePrest(id){
    demandePrestataires.splice(id, 1);
    return { error: 0, status:200};
}

function acceptDemandePrest(prest){
    let newId = prestataires.length + 1;
    console.log("id " + newId)

    prest.id = newId;
    prest.page_route = '/prestataire/'+newId;

    prestataires.push(prest);
    userBecomesPrestataire(prest.id_utilisateur)
}

function userBecomesPrestataire(id){
    utilisateurs[id].role = 'prestataire';
}

function getNotificationByUserID(id){
    return { error: 0, status:200 , data: notifications.filter(n => n.id_user === id)};
}

function changePersonnalData(data, id){
    try {
        id = id - 1
        utilisateurs[id].nom_utilisateur = data.nom;
        utilisateurs[id].email_utilisateur = data.email;
        utilisateurs[id].telephone = data.numero;
        utilisateurs[id].adresse_utilisateur = data.adresse;
        return  {error: 0, status:200 , data: utilisateurs[id]};
    }catch (error){
        return { error: 1, status: 500, data: error.message }
    }
}

async function changePassword(id,actualPassword,newPassword){
    try {
        let Account = utilisateurs.find(u => u.id_utilisateur === id);
        const correspond = await bcrypt.compare(actualPassword, Account.mot_de_passe);
        for (const mdp of MOTS_DE_PASSE_UTILISATEURS) {
            if (await bcrypt.compare(newPassword, mdp.password))return { error: 1, status: 404, data: "Le mot de passe à déjà été utilisé" };
        }
        if (correspond ) {
            const lastpassword = {
                id: MOTS_DE_PASSE_UTILISATEURS.length,
                user_Id: id,
                date_Created: getFormattedDate(),
                password: Account.mot_de_passe
            }
            MOTS_DE_PASSE_UTILISATEURS.push(lastpassword)
            utilisateurs[id - 1].mot_de_passe = await bcrypt.hash(newPassword, 10)
            return {error: 0, status: 200, data: 'Mot de passe modifé avec succès'};
        }
        else {
            return { error: 1, status: 404, data: "Le mot de passe ne correspond pas" };
        }
    }catch (error) {
        return { error: 1, status: 500, data: error.message }
    }
}

function markAllAsRead(id){
    for (const notif of notifications) {
        if (notif.id_user === id){
            notifications.splice(notif.id, 1)
        }
    }
}

function deletePretataire(id){
    const utilisateur = prestataires[id - 1].id_utilisateur;
    try {
        prestataires.splice(id-1, 1);
        utilisateurs.splice(utilisateur, 1);
        return {error: 0, status: 200, data: 'Prestataire supprimé avec succès'};
    }catch (e) {
        return { error: 1, status: 404, data: "Le prestataire n'a pas été supprimé correctement" };
    }

}

function changeDataPrest(data){
    try {

        let prest = prestataires.find(p => p.id === data.id);
        prest.nom = data.nom;
        prest.description = data.description;
        prest.description_accueil = data.description_accueil;
        prest.categorie = data.categorie;
        prest.image = data.image
        prest.services = data.services;
        return {error: 0, status: 200, data: 'Prestataire modifié avec succès'};
    }catch (error){
        console.log(error)
        return { error: 1, status: 404, data: "Le prestataire n'a pas été modifié correctement" };
    }
}

function createEmplacement(coord, icon){
    let newId;
    if(emplacements.length>0) newId = parseInt(emplacements[emplacements.length-1].id)+1;
    else newId = 1;
    console.log(newId)
    if(!icon) icon = "evenement"
    console.log(icon)

    let newEmplacement = {
        id: newId,
        coordinates: coord,
        icon: icon
    }

    console.log(newEmplacement)
    emplacements.push(newEmplacement);
    console.log(emplacements)
}

function getNextCanardDefileID(){
    let maxID = 1;
    if(canard_defile.length == 0) return {error: 0, status: 200, data: maxID}
    for(let canard of canard_defile){
        if(canard.id > maxID) maxID = canard.id
    }
    return {error: 0, status: 200, data: maxID+1}
}

function insertCanardDefile(data){
    if(!data) return {error: 1, status: 404, data: "aucune donnée à insérer"}
    let canard = {
        id: getNextCanardDefileID().data,
        nom: data.nom,
        nom_propriétaire: data.proprietaire,
        espece: data.espece,
        region: data.region,
        heure_defile: data.heure
    }
    canard_defile.push(canard)
    return {error: 0, status: 200, data: "insertion avec succès"}
}

function getAllCommandes(){
    return {error: 0, status: 200, data: commandes}
}

function getBoutiqueChiffreDaffaire(){
    let sum = 0;
    for(let el of commandes){
        sum += el.total
    }
    return {error: 0, status: 200, data: sum}
}

export default {
    getAllRatings,
    getAllPrestataires,
    getAllSponsors,
    insertCommandeBillet,
    connexion,
    getAvisOfPrestataire,
    sendAvisOfUser,
    totalDons,
    signUp,
    getAllUsers,
    getAllMapData,
    getTotalDonsOf,
    makeDonation,
    sendFormPrestataire,
    deleteAvis,
    modifyAvis,
    modifyEmplacementPrestataire,
    getAllAssociation,
    getAllDemandePrestataire,
    getAllbalades,
    declineDemandePrest,
    acceptDemandePrest,
    reservebalade,
    cancelBaladeReservation,
    getNotificationByUserID,
    changePersonnalData,
    changePassword,
    markAllAsRead,
    getAllEmplacements,
    deletePretataire,
    getAllDisponibiliteResto,
    makeReservation,
    getAllReservations,
    cancelReservation,
    getAllClassementConcours,
    changeDataPrest,
    updateSingleEmplacement,
    createEmplacement,
    getShopStatusFromId,
    changeShopStatusFromId,
    getNextCanardDefileID,
    insertCanardDefile,
    getAllCommandes,
    getBoutiqueChiffreDaffaire
}