const adminService = require('../services/admin.service');

exports.acceptDemandePrest = async (req, res) => {
    const {id} = req.params;
    await adminService.acceptDemandePrest(id, (error, data) => {
        if (error) {
            return res.status(500).send(error);
        }
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