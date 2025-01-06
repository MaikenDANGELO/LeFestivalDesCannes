const Prestataire = require("../database/models/Prestataire");
const Utilisateur = require("../database/models/Utilisateur");
const Notification = require("../database/models/Notif");

exports.acceptDemandePrest =  async (prestataireID, callback)=>{
    try {
        const prestataire = await Prestataire.findByPk(prestataireID);
        if (!prestataire) {
            throw new Error("Prestataire non trouvé");
        }
        if (!prestataire.accepted) throw new Error("Prestataire déjà accepté");

        prestataire.accepted = true
        prestataire.page_route = `/prestataire/${prestataire.id}`;
        await prestataire.save();
        Utilisateur.update({role: "prestataire"}, {where: {id: prestataire.id_utilisateur}});

        Notification.create({
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
            throw new Error("Prestataire non trouvé");
        }
        if (!prestataire.accepted) throw new Error("Prestataire déjà accepté");

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