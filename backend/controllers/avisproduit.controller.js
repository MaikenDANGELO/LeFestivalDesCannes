const avisProduitService = require('../services/avisproduit.service');

exports.createAvisProduit = async (req, res) => {
    await avisProduitService.createAvis(req.body, (error, data) => {
        if (error === "Produit ou utilisateur introuvable") return res.status(400).send(error);
        if (error) return res.status(500).send(error);
        return res.status(201).json({ data });
    });
};

exports.getAvisByProduit = async (req, res) => {
    const { id } = req.params;
    await avisProduitService.getAvisByProduitId(id, (error, data) => {
        if (error) return res.status(500).send(error);
        return res.status(200).json({ data });
    });
};
