const BoutiqueStatus = require('../database/models/BoutiqueStatus');
const Prestataire = require('../database/models/Prestataire');

exports.getStatus = async (id_prestataire, callback) => {
    try {
        const prestataire = await Prestataire.findByPk(id_prestataire);
        if (!prestataire) return callback("Prestataire non trouvé", null);

        let statut = await BoutiqueStatus.findOne({ where: { id_prestataire } });
        if (!statut) {
            statut = await BoutiqueStatus.create({ id_prestataire, actif: true });
        }

        callback(null, statut.actif);
    } catch (error) {
        callback(error, null);
    }
};

exports.toggleStatus = async (id_prestataire, callback) => {
    try {
        const prestataire = await Prestataire.findByPk(id_prestataire);
        if (!prestataire) return callback("Prestataire non trouvé", null);

        let statut = await BoutiqueStatus.findOne({ where: { id_prestataire } });
        if (!statut) {
            statut = await BoutiqueStatus.create({ id_prestataire, actif: true });
        }

        statut.actif = !statut.actif;
        await statut.save();

        callback(null, statut.actif);
    } catch (error) {
        callback(error, null);
    }
};
