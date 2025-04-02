const bcrypt = require('bcrypt')
const MotDePasseUtilisateur = require('../database/models/MotDePasseUtilisateur');
const Utilisateur = require('../database/models/Utilisateur');


exports.validateLogin = (req, res, next) =>{
    let { email,password } = req.body
    if (!email)  return res.status(400).send('Login pas valide !');
    if (!password) return res.status(400).send('Mot de passe pas valide !');
    next();
}

exports.validatePassword = async (req, res, next) => {
    let password = req.body.password;
    if (password === undefined) password = req.body.newPassword

    if (password.length < 8) {
        return res.status(400).send("Le mot de passe doit contenir au moins 8 caractères.");
    }
    // Vérifier la présence d'au moins une majuscule
    if (!/[A-Z]/.test(password)) {
        return res.status(400).send("Le mot de passe doit contenir au moins une lettre majuscule.");
    }

    // Vérifier la présence d'au moins un chiffre
    if (!/[0-9]/.test(password)) {
        return res.status(400).send("Le mot de passe doit contenir au moins un chiffre.");
    }

    // Vérifier la présence d'au moins un caractère spécial
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return res.status(400).send("Le mot de passe doit contenir au moins un caractère spécial.");
    }
    next();
}

exports.validateActualPassword = async (req, res, next) => {
    const id = req.body.id;
    const actualPassword = req.body.actualPassword;

    try {
        const user = await Utilisateur.findByPk(id);

        if (!user) {
            return res.status(400).send("Utilisateur non trouvé");
        }

        const correspond = await bcrypt.compare(actualPassword, user.mot_de_passe);
        if (!correspond) {
            return res.status(400).send("Le mot de passe courant donné n'est pas le bon");
        }
        next();
    } catch (e) {
        return res.status(500).send(e.message);
    }
};

exports.passwordAlreadyUsed = async (req, res, next) => {
    const id = req.body.id
    const newPassword = req.body.newPassword;

    try {
        const passwords = await MotDePasseUtilisateur.findAll({ where: { user_Id: id } });

        for (const password of passwords) {
            const correspond = await bcrypt.compare(newPassword, password.mot_de_passe);

            if (correspond) {
                return res.status(400).send("Le nouveau mot de passe à déjà été utilisé");
            }
        }
        next();
    } catch (e) {
        return res.status(500).send(e.message);
    }
};

exports.isLoggedIn = async (req, res, next) =>{
    if (req.isAuthenticated()) return next();
    else return res.status(401).json({ message: "Non authentifié" });
}