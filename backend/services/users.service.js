const pool = require("../database/db.js");
const bcrypt = require('bcrypt')

exports.getUsers = async (callback) => {
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

exports.connexion = async (login, mdp, callback) =>{
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

exports.signup = async (login, mdp, numero, username, adresse, signUp, callback) =>{
    const client = await pool.connect();
    try{
        const user = await client.query('SELECT * FROM utilisateurs WHERE email_utilisateur = $1', [login]);
        if (user.rows.length !== 0) return callback('Le login donné est déjà utilisé', null);


        const SQL = `
            INSERT INTO utilisateurs (nom_utilisateur, email_utilisateur, mot_de_passe, adresse_utilisateur, telephone, date_inscription, role) VALUES 
            ($1,$2,$3,$4,$5,NOW(),$6)`
        await client.query(SQL, [username, login, await bcrypt.hash(mdp, 10), adresse, numero, signUp])

        const res = await client.query('SELECT * FROM utilisateurs WHERE email_utilisateur = $1', [login]);

        return callback(null, res.rows[0])
    }catch (error){
        callback(error, null);
    }
    finally {
        client.release();
    }
}

exports.getUser = async (id, callback) =>{
    const client = await pool.connect();
    try {
        const SQL = `
            SELECT *
            FROM utilisateurs
            WHERE id = $1`
        const res = await client.query(SQL, [id])
        return callback(null, res.rows)
    }catch (e) {
        callback(e, null);
    }
    finally {
        client.release();
    }
}

exports.deleteAvis = async (id, callback) =>{
    const client = await pool.connect();
    try {
        const SQL = `
            DELETE FROM avis
            WHERE id = $1`
        await client.query(SQL, [id])
        callback(null, 'L\'avis a été supprimé avec succès')

    }catch (error){
        callback(error, null)
    }finally {
        client.release();
    }
}

exports.sendAvis = async (id_prestataire, id_utilisateur, texte, note, callback)=>{
    const client = await pool.connect();
    try {
        const SQL = `
            INSERT INTO avis (id_prestataire, id_utilisateur, texte, note) VALUES
            ($1, $2, $3, $4)`
        await client.query(SQL, [id_prestataire, id_utilisateur, texte, note])

        callback(null, 'L\'avis a été publié avec succès')

    }catch (error){
        callback(error, null)
    }finally {
        client.release();
    }
}

exports.modifyAvis = async (texte, note, id, callback)=>{
    const client = await pool.connect();
    try {
        const SQL = `
            UPDATE avis
            SET texte = $1, note = $2
            WHERE id = $3`
        await client.query(SQL, [texte, note, id])

        callback(null, 'L\'avis a été modifié avec succès')

    }catch (error){
        callback(error, null)
    }finally {
        client.release();
    }
}

exports.getNotificationByUserID = async (id, callback)=> {
    const client = await pool.connect();
    try {
        const SQL = `
            SELECT * FROM notif
            WHERE id_user = $1`
        const res = await client.query(SQL, [id])

        callback(null, res.rows)

    } catch (error) {
        callback(error, null)
    } finally {
        client.release();
    }
}

exports.changePersonnalData = async (id, nom, email, numero, adresse, callback)=> {
    const client = await pool.connect();
    try {
        const SQL = `
            UPDATE utilisateurs
            SET nom_utilisateur = $1, email_utilisateur = $2, telephone = $3, adresse_utilisateur = $4
            WHERE id = $5`
        await client.query(SQL, [nom, email, numero, adresse, id])

        callback(null, 'Données mise à jour')

    } catch (error) {
        callback(error, null)
    } finally {
        client.release();
    }
}

exports.changePassword = async (id, newPassword, callback)=> {
    const client = await pool.connect();
    try {
        const SQL = `
            UPDATE utilisateurs
            SET mot_de_passe = $1
            WHERE id = $2`
        await client.query(SQL, [await bcrypt.hash(newPassword, 10), id])

        callback(null, 'Mot de passe changée')

    } catch (error) {
        callback(error, null)
    } finally {
        client.release();
    }
}
