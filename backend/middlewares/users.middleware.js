const validator = require("validator");
const pool = require("../database/db.js");


exports.validateLogin = (req, res, next) =>{
    let {login,mdp} = req.body
    if (!login)  return res.status(400).send('Login pas valide !');
    if (!mdp) return res.status(400).send('Mot de passe pas valide !');
    next();
}

exports.validateSignUp = async (req, res, next) => {
    const password = req.body.mdp;
    const signUp = req.body.signUp;
    const codePrest = req.body.codePrest;

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

    const client = await pool.connect();
    let codeValide = await client.query('SELECT code FROM code_prestataire')
    codeValide = codeValide.rows[0].code;
    if (signUp === 'Prestataire') {
        if (codePrest !== codeValide) {
            return res.status(400).send("Le code prestataire n'est correct.");
        }
    }
    next();
}