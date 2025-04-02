const boutiqueStatusService = require('../services/boutiqueStatus.service');

exports.getStatus = async (req, res) => {
    const { id_prestataire } = req.params;
    await boutiqueStatusService.getStatus(id_prestataire, (error, data) => {
        if (error === "Prestataire non trouvé") return res.status(404).send(error);
        if (error) return res.status(500).send(error);
        return res.status(200).json({ data });
    });
};

exports.toggleStatus = async (req, res) => {
    const { id_prestataire } = req.params;
    await boutiqueStatusService.toggleStatus(id_prestataire, (error, data) => {
        if (error === "Prestataire non trouvé") return res.status(404).send(error);
        if (error) return res.status(500).send(error);
        return res.status(200).json({ data });
    });
};
