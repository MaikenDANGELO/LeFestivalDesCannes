const Avis = require('../database/models/Avis');
const Prestataire = require("../database/models/Prestataire");
const Service = require("../database/models/Service");
const Dons = require("../database/models/Don");
const Reservation = require("../database/models/Reservation");
const Categorie = require("../database/models/Categorie");
const fs = require('fs');
const {DataTypes} = require("sequelize");


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

exports.getAllAvis = async (callback) => {
    try {
        const avis = await Avis.findAll();
        callback(null, avis);
    } catch (error) {
        callback(error, null);
    }
}


exports.getAllPrestataire = async (callback)=>{
    try {
        const prestataires = await Prestataire.findAll({
            include: [
                {
                    model: Service,
                    as: 'services',
                    required: false
                },
                {
                    model: Categorie,
                    as: 'relationCategorie',
                }
            ],
        });
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
            id_categorie: form.categorie,
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


        await Service.bulkCreate(services);


        callback(null, prestataire);
    } catch (error) {
        console.log(error)
        callback(error, null);
    }
}

exports.getTotalDonsOf = async (id, callback) => {
    try {
        let total = await Dons.sum('montant', { where: { id_prestataire: id } });
        if (total === null) total = 0
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


exports.makeReservation = async (userId, date, hour, pertId, option ,callback) => {
    try {
         const reservation = await Reservation.findOne({
            where: {
                id_prestataire: pertId,
                date: date,
                heure: hour
            }
        });

        if (reservation) {
            reservation.reserved_user_id = userId;
            reservation.options = option;
            await reservation.save();
            callback(null, "Réservation effectuée avec succès");
        } else {
            callback("Réservation introuvable", null);
        }
    } catch (error) {
        callback(error, null);
    }
}

exports.getReservationsfromUid = async () => {}

exports.getPrestgastro = async (callback) => {
    try {
        const prest = await Prestataire.findAll({
            where: {
                id_categorie: 2
            }
        });
        callback(null, prest);
    } catch (error) {
        callback(error,null);
    }
}

exports.getTotalDons = async (callback) => {
    try{
        let somme = await Dons.sum('montant')
        callback(null, somme)
    }catch (error) {
        callback(error, null)
    }
}

exports.getAllDisponibiliteResto = async (id, callback) => {
    try {
        const reservations = await Reservation.findAll({
            where: {
                type_service: 'restaurant',
                reserved_user_id: null,
                id_prestataire : id
            }
        });
        callback(null, reservations);
    } catch (error) {
        callback(error, null);
    }
}

exports.getAllCategories = async (callback) => {
    try {
        const categories = await Categorie.findAll();
        callback(null, categories);
    } catch (error) {
        callback(error, null);
    }
}

exports.changeDataPrest = async (data, callback) => {
    try {
        const prestataire = await Prestataire.findByPk(data.id);
        if (prestataire) {
            prestataire.nom = data.nom;
            prestataire.description = data.description;
            prestataire.description_accueil = data.description_accueil;
            prestataire.id_categorie = data.id_categorie;
            prestataire.id_emplacement = data.id_emplacement;
            prestataire.image = data.image;

            await prestataire.save()

            console.log('pres', prestataire);

            for (const serviceData of data.services) {
                console.log('serviceData', serviceData);
                let existingService = await Service.findOne({ id: serviceData.id });


                if (existingService) {
                    existingService.nom_service = serviceData.nom_service;
                    existingService.description_service = serviceData.description_service;
                    existingService.lien_service = serviceData.lien_service;
                    existingService.statut_service = serviceData.statut_service;
                    await existingService.save();
                } else {
                   const non = await Service.create({
                        nom_service: serviceData.nom_service,
                        description_service: serviceData.description_service,
                        lien_service: serviceData.lien_service,
                        statut_service: serviceData.statut_service,
                        id_prestataire: prestataire.id
                    });

                }
            }
            await prestataire.save();

            const oui = await Prestataire.findByPk(data.id, {
                include: [
                    {
                        model: Service,
                        as: 'services',
                        required: false
                    },
                    {
                        model: Categorie,
                        as: 'relationCategorie',
                    }
                ],
                raw:true,
                nest: true
            });
            //console.log(oui)
            callback(null, prestataire);
        } else {
            callback("Prestataire introuvable", null);
        }
    } catch (error) {
        console.log(error)
        callback(error, null);
    }
}