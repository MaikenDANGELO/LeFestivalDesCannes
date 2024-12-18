const bcrypt = require('bcrypt')
const Utilisateur= require('../database/models/Utilisateur');
const Notification = require('../database/models/Notif');
const Avis = require('../database/models/Avis');

exports.getUsers = async (callback) => {
    try {
        const clients = await Utilisateur.findAll();
        callback(null, clients);
    } catch (error) {
        callback(error, null);
    }
};

exports.connexion = async (login, mdp, callback) => {
    try {
        const user = await Utilisateur.findOne({ where: { email_utilisateur: login } });
        if (!user) return callback("Aucun utilisateur ne correspond à ce login", null);

        const correspond = await bcrypt.compare(mdp, user.mot_de_passe);
        if (correspond) return callback(null, user);
        return callback("Le mot de passe est incorrect", null);
    } catch (error) {
        callback(error, null);
    }
};

exports.signup = async (login, mdp, numero, username, adresse, signUp, callback) => {
    try {
        const user = await Utilisateur.findOne({ where: { email_utilisateur: login } });
        if (user) return callback('Le login donné est déjà utilisé', null);

        const newUser = await Utilisateur.create({
            nom_utilisateur: username,
            email_utilisateur: login,
            mot_de_passe: await bcrypt.hash(mdp, 10),
            adresse_utilisateur: adresse,
            telephone: numero,
            date_inscription: new Date(),
            role: signUp
        });

        callback(null, newUser);
    } catch (error) {
        callback(error, null);
    }
};

exports.getUser = async (id, callback) => {
    try {
        const user = await Utilisateur.findByPk(id);
        callback(null, user);
    } catch (error) {
        callback(error, null);
    }
};

exports.deleteAvis = async (id, callback) => {
    try {
        await Avis.destroy({ where: { id } });
        callback(null, "L'avis a été supprimé avec succès");
    } catch (error) {
        callback(error, null);
    }
};

exports.sendAvis = async (id_prestataire, id_utilisateur, texte, note, callback) => {
    try {
        await Avis.create({
            id_prestataire,
            id_utilisateur,
            texte,
            note
        });
        callback(null, "L'avis a été publié avec succès");
    } catch (error) {
        callback(error, null);
    }
};

exports.modifyAvis = async (texte, note, id, callback) => {
    try {
        await Avis.update(
            { texte, note },
            { where: { id } }
        );
        callback(null, "L'avis a été modifié avec succès");
    } catch (error) {
        callback(error, null);
    }
};

exports.getNotificationByUserID = async (id, callback) => {
    try {
        const notifications = await Notification.findAll({ where: { id_user: id } });
        callback(null, notifications);
    } catch (error) {
        console.log(error)
        callback(error, null);
    }
};

exports.changePersonnalData = async (id, nom, email, numero, adresse, callback) => {
    try {
        await Utilisateur.update(
            { nom_utilisateur: nom, email_utilisateur: email, telephone: numero, adresse_utilisateur: adresse },
            { where: { id } }
        );
        callback(null, 'Données mise à jour');
    } catch (error) {
        callback(error, null);
    }
};

exports.changePassword = async (id, newPassword, callback) => {
    try {
        await Utilisateur.update(
            { mot_de_passe: await bcrypt.hash(newPassword, 10) },
            { where: { id } }
        );
        callback(null, 'Mot de passe changée');
    } catch (error) {
        callback(error, null);
    }
};
