const commandeService = require('../services/commande.service');

exports.createCommande = async (req, res) => {
    await commandeService.createCommande(req.body, (error, data) => {
        if (error === "Données invalides") return res.status(400).send(error);
        if (error) return res.status(500).send(error);
        return res.status(201).json({ data });
    });
};

exports.getCommandesUtilisateur = async (req, res) => {
    const { id } = req.params;
    await commandeService.getCommandesByUserId(id, (error, data) => {
        if (error) return res.status(500).send(error);
        return res.status(200).json({ data });
    });
};
