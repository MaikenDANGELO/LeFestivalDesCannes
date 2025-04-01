const Prestataire = require("../database/models/Prestataire");
const Utilisateur = require("../database/models/Utilisateur");
const Notification = require("../database/models/Notif");
const Services = require("../database/models/Service");

exports.acceptDemandePrest =  async (prestataireID, callback)=>{
    try {
        const prestataire = await Prestataire.findByPk(prestataireID);
        if (!prestataire) {
            return callback("Prestataire non trouvé", null);
        }
        if (prestataire.accepted) {
            return callback("Prestataire déjà accepté", null);
        }


        prestataire.accepted = true
        prestataire.page_route = `/prestataire/${prestataire.id}`;
        await prestataire.save();
        await Utilisateur.update(
            {role: "prestataire"},
            {where: {id: prestataire.id_utilisateur}}
        );

        await Notification.create({
            id_user: prestataire.id_utilisateur,
            message: "Votre demande de prestataire a été acceptée"
        });

        callback(null, "Prestataire accepté");
    }
    catch (error) {
        callback(error, null);
    }
}

exports.declineDemandePrest = async (prestataireID, callback)=>{
    try {
        const prestataire = await Prestataire.findByPk(prestataireID);
        if (!prestataire) {
           return callback("Prestataire non trouvé", null);
        }
        if (prestataire.accepted) return callback("Prestataire déjà accepté", null);

        await prestataire.destroy();

        Notification.create({
            id_user: prestataire.id_utilisateur,
            message: "Votre demande de prestataire a été refusée"
        });

        callback(null, "Prestataire refusé");
    }
    catch (error) {
        callback(error, null);
    }
}

exports.getAllDemandePrestataire = async (callback)=>{
    try {
        const demandes = await Prestataire.findAll({
            where: {accepted: false},
            include: [
                { model: Utilisateur, as: 'utilisateur' } ,
                { model: Services, as: 'services' }
            ]
        });
        callback(null, demandes);
    } catch (error) {
        callback(error, null);
    }
}

exports.deletePretataire = async (prestataireID, callback)=>{
    try {
        const prestataire = await Prestataire.findByPk(prestataireID);
        if (!prestataire) {
            return callback("Prestataire non trouvé", null);
        }
        await prestataire.destroy();
        callback(null, "Prestataire supprimé");
    } catch (error) {
        callback(error, null);
    }
}