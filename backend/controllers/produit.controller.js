const produitService = require('../services/produit.service');

exports.getAllProduits = async (req, res) => {
    await produitService.getAllProduits((error, data) => {
        if (error) return res.status(500).send(error);
        return res.status(200).json({ data });
    });
};
