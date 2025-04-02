const suiviCommandeService = require('../services/suivicommande.service');

exports.getSuiviCommande = async (req, res) => {
    const { id_commande } = req.params;
    await suiviCommandeService.getSuiviCommande(id_commande, (error, data) => {
        if (error === "Commande non trouvée") return res.status(404).send(error);
        if (error) return res.status(500).send(error);
        return res.status(200).json({ data });
    });
};
