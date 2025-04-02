const CategorieProduit = require('../database/models/CategorieProduit');

exports.getAllCategories = async (callback) => {
    try {
        const categories = await CategorieProduit.findAll();
        callback(null, categories);
    } catch (error) {
        callback(error, null);
    }
};
