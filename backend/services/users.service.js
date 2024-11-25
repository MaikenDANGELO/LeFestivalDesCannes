const pool = require("../database/db.js");
const bcrypt = require('bcrypt')

const getUsers = async (callback) => {
    const client = await pool.connect();
    try {
        const clients = await client.query('SELECT * FROM utilisateurs');
        callback(null, clients.rows);
    } catch (error) {
        callback(error, null);
    }finally {
        client.release();
    }
}

const connexion = async (login, mdp, callback) =>{
    const client = await pool.connect();
    try {
        const user = await client.query('SELECT * FROM utilisateurs WHERE email_utilisateur = $1', [login]);
        if (user.rows.length === 0) return callback("Aucun utilisateur ne correspond à ce login", null)
        const correspond = await bcrypt.compare(mdp, user.rows[0].mot_de_passe);
        if (correspond) return callback(null, user.rows[0]);

        return callback("Le mot de passe est incorrect", null)
    } catch (error) {
        callback(error, null);
    }finally {
        client.release();
    }
}

const signup = async (login, mdp, numero, username, adresse, codePrest, signUp, callback) =>{
    const client = await pool.connect();
    try{
        const SQL = 'INSERT INTO utilisateurs (nom_utilisateur, email_utilisateur, mot_de_passe, adresse_utilisateur, telephone, date_inscription, role) VALUES ($1,$2,$3,$4,$5,NOW(),$6)'
        client.query(SQL, [username, login, bcrypt.hash(mdp, 10), adresse, numero, signUp])
        return callback(null, codeValide)
    }catch (error){
        callback(error, null);
    }
    finally {
        client.release();
    }

}

module.exports = {
    getUsers,
    connexion,
    signup
}
