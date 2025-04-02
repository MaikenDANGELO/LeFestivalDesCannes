const categorieService = require('../services/categorieProduit.service');

exports.getAllCategories = async (req, res) => {
    await categorieService.getAllCategories((error, data) => {
        if (error) return res.status(500).send(error);
        return res.status(200).json({ data });
    });
};
