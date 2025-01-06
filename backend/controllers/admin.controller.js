const adminService = require('../services/admin.service');

exports.acceptDemandePrest = async (req, res) => {
    const {id} = req.params;
    await adminService.acceptDemandePrest(id, (error, data) => {
        if (error === "Prestataire non trouvé") return res.status(400).send(error);
        else if (error === "Prestataire déjà accepté") return res.status(400).send(error);
        else if(error) return res.status(500).send(error);
        return res.status(200).json({data: data});
    });
}

exports.declineDemandePrest = async (req, res) => {
    const {id} = req.params;
    await adminService.declineDemandePrest(id, (error, data) => {
        if (error === "Prestataire non trouvé") return res.status(400).send(error);
        else if (error === "Prestataire déjà accepté") return res.status(400).send(error);
        else if(error) return res.status(500).send(error);

        return res.status(200).json({data: data});
    });
}

exports.getDemandesPrest = async (req, res) => {
    await adminService.getAllDemandePrestataire((error, data) => {
        if (error) {
            console.log(error)
            return res.status(500).send(error);
        }
        return res.status(200).json({data: data});
    });
}

exports.deletePrestataire = async (req, res) => {
    const {id} = req.params;
    await adminService.deletePretataire(id, (error, data) => {
        if (error === "Prestataire non trouvé") return res.status(404).send(error);
        if (error) {
            return res.status(500).send(error);
        }
        return res.status(200).json({data: data});
    });
}