const pool = require("../database/db.js");
const bcrypt = require('bcrypt')


exports.validateLogin = (req, res, next) =>{
    let { login,mdp } = req.body
    if (!login)  return res.status(400).send('Login pas valide !');
    if (!mdp) return res.status(400).send('Mot de passe pas valide !');
    next();
}

exports.validatePassword = async (req, res, next) => {
    let password = req.body.mdp;
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
    const id = req.session.id_user
    const actualPassword = req.body.actualPassword

    const client = await pool.connect();
    try{

        const SQL = `SELECT * FROM utilisateurs WHERE id = $1`
        const user = await client.query(SQL, [id]);

        console.log(user.rows[0].mot_de_passe)
        const correspond = await bcrypt.compare(actualPassword,  user.rows[0].mot_de_passe);
        if (!correspond){
            return res.status(400).send("Le mot de passe courant donné n'est pas le bon")
        }
        next()

    }catch (e) {
        return res.status(500).send(e.message)
    }finally {
        client.release()
    }
}

exports.passwordAlreadyUsed = async (req, res, next) => {
    const id = req.session.id_user
    const newPassword = req.body.newPassword
    const client = await pool.connect();

    try{
        const user = await client.query(`SELECT *
                                         FROM MOTS_DE_PASSE_UTILISATEURS
                                         WHERE user_Id = $1 `, [id]);
        for (const userElement of user.rows) {
            const correspond = await bcrypt.compare(newPassword,  userElement.mot_de_passe);

            if (correspond){
                return res.status(400).send("Le nouveau mot de passe à déjà été utilisé")
            }
        }
        next()

    }catch (e) {

    }finally {
        client.release()
    }
}