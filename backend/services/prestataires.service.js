const Avis = require('../database/models/Avis');
const Prestataire = require("../database/models/Prestataire");
const Service = require("../database/models/Service");
const Dons = require("../database/models/Don");
const Reservation = require("../database/models/Reservation");

exports.getAvis = async (id, callback) => {
    try {
        const avis = await Avis.findAll({
            where: {
                id_prestataire: id
            }
        });
        callback(null, avis);
    } catch (error) {
        callback(error, null);
    }
};

exports.getAllPrestataire = async (callback)=>{
    try {
        const prestataires = await Prestataire.findAll();
        callback(null, prestataires);
    } catch (error) {
        callback(error, null);
    }
}

exports.sendFormPrestataire = async (form, id_utilisateur, callback)=>{
    try {
        const prestataire = await Prestataire.create({
            nom: form.nom,
            description: form.description,
            description_accueil: form.description_accueil,
            categorie: form.categorie,
            id_emplacement: form.id_emplacement,
            image: form.image,
            accepted: false,
            id_utilisateur: id_utilisateur,
            page_route: '',
            id_evenement: 1
        });

        const services = form.services.map(service => ({
            id_service: service.id_service,
            nom_service: service.nom_service,
            description_service: service.description_service,
            lien_service: service.lien_service,
            statut_service: service.statut_service,
            id_prestataire: prestataire.id
        }));

        console.log("Prestataire: ", prestataire);
        console.log("Services: ", services);
        await Service.bulkCreate(services);

        console.log("Services créés");

        callback(null, prestataire);
    } catch (error) {
        console.log(error)
        callback(error, null);
    }
}

exports.getTotalDonsOf = async (id, callback) => {
    try {
        const total = await Dons.sum('montant', { where: { id_prestataire: id } });
        callback(null, total);
    } catch (error) {
        callback(error, null);
    }
}

exports.makeDonation = async (userId, prestaId, amount, message, callback) => {
    try {
        await Dons.create({
            id_utilisateur: userId,
            id_prestataire: prestaId,
            montant: amount,
            message: message,
            date: new Date()
        });
        callback(null, "Donation enregistrer avec succès");
    } catch (error) {
        callback(error, null);
    }
}

exports.getAllBalades = async (callback) => {
    try {
        const balades = await Reservation.findAll({
            where: {
                type_service: 'balade'
            }
        });
        callback(null, balades);
    } catch (error) {
        callback(error, null);
    }
}

exports.getbaladesfromUid = async (user_id, callback) => {
    try {
        const balades = await Reservation.findAll({
            where: {
                type_service: 'balade',
                reserved_user_id: user_id
            }
        });
        callback(null, balades);
    } catch (error) {
        callback(error, null);
    }
}

exports.reservebalade = async (balade_id, user_id, callback) => {
    try {
        const balade = await Reservation.findByPk(balade_id);
        if (balade) {
            balade.reserved_user_id = user_id;
            await balade.save();
            callback(null, "Balade réservée avec succès");
        } else {
            callback("Balade introuvable", null);
        }
    } catch (error) {
        callback(error, null);
    }
}

exports.cancelbalade = async (balade_id, user_id, callback) => {
    try {
        const balade = await Reservation.findByPk(balade_id);
        if (balade) {balade.reserved_user_id = null;
            await balade.save();
            balade.reserved_user_id = null;
            await balade.save();
            callback(null, "Réservation annulée avec succès");
        } else {
            callback("Balade introuvable", null);
        }
    } catch (error) {
        callback(error, null);
    }
}