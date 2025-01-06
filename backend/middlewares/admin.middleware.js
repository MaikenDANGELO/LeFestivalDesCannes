const Utilisateur = require('../database/models/Utilisateur')

exports.logInAdmin = async (req, res, next) => {
    const id = req.session.id_user
    const user = await Utilisateur.findOne({ where: { id } })
    if (user.role === 'admin') {
        next()
    }
    else return res.status(401).send('Unauthorized')
}