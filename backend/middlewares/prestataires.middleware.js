const Prestataire = require("../database/models/Prestataire");

exports.alreadyExists = async (req, res, next) => {
    const { nom } = req.body;
    const prestataire = await Prestataire.findOne({ where: { nom } });
    if (prestataire) {
        return res.status(400).send("Un prestataire avec le même nom existe déjà.");
    }
    next();
}