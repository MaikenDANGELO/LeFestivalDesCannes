const AvisProduit = require('../database/models/AvisProduit');
const Produit = require('../database/models/Produit');
const Utilisateur = require('../database/models/Utilisateur');

exports.createAvis = async (data, callback) => {
    try {
        const { id_utilisateur, id_produit, note, commentaire } = data;
        const produit = await Produit.findByPk(id_produit);
        const user = await Utilisateur.findByPk(id_utilisateur);
        if (!produit || !user) return callback("Produit ou utilisateur introuvable", null);

        const avis = await AvisProduit.create({
            id_utilisateur,
            id_produit,
            note,
            commentaire
        });

        callback(null, avis);
    } catch (error) {
        callback(error, null);
    }
};

exports.getAvisByProduitId = async (id, callback) => {
    try {
        const avis = await AvisProduit.findAll({
            where: { id_produit: id },
            include: { model: Utilisateur, as: 'utilisateur' }
        });
        callback(null, avis);
    } catch (error) {
        callback(error, null);
    }
};
