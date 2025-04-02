const SuiviCommande = require('../database/models/SuiviCommande');
// const Commande = require('../database/models/Commande');

exports.getSuiviCommande = async (id_commande, callback) => {
    try {
        const suivi = await SuiviCommande.findAll({
            where: { id_commande },
            order: [['date', 'ASC']]
        });
        if (!suivi.length) return callback("Commande non trouvée", null);
        callback(null, suivi);
    } catch (error) {
        callback(error, null);
    }
};
