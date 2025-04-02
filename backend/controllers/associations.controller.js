const associationService = require('../services/associations.service');

exports.getAllAssociations = async (req, res) => {
    await associationService.getAllAssociations((error, data) => {
        if (error) {
            return res.send(error);
        }
        return res.status(200).json({error: 0, data: data});
    });
}