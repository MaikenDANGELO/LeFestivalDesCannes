const Produit = require('../database/models/Produit');
const CategorieProduit = require('../database/models/CategorieProduit');

exports.getAllProduits = async (callback) => {
    try {
        const produits = await Produit.findAll({
            include: { model: CategorieProduit, as: 'categorie' }
        });
        callback(null, produits);
    } catch (error) {
        callback(error, null);
    }
};
